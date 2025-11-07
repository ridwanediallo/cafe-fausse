"""
Reservation Controller - Business logic for table reservations
"""
from datetime import datetime, timedelta
from sqlalchemy import and_, or_
from app.models import db, Reservation, Customer, Table
from app.config import Config
import random


class ReservationController:
    """Handles reservation business logic"""
    
    @staticmethod
    def create_reservation(data):
        """
        Create a new reservation
        
        Args:
            data: Dictionary with reservation details
                - name: Customer name
                - email: Customer email
                - phone: Customer phone (optional)
                - start_time: Reservation start time (ISO format string)
                - guest_count: Number of guests
                - newsletter_signup: Boolean (optional)
        
        Returns:
            tuple: (reservation_dict, status_code, message)
        """
        try:
            # Validate input data
            required_fields = ['name', 'email', 'start_time', 'guest_count']
            for field in required_fields:
                if field not in data:
                    return None, 400, f'Missing required field: {field}'
            
            # Parse and validate start time
            try:
                start_time = datetime.fromisoformat(data['start_time'].replace('Z', '+00:00'))
            except (ValueError, AttributeError):
                return None, 400, 'Invalid start_time format. Use ISO format (YYYY-MM-DDTHH:MM:SS)'
            
            # Calculate end time (2 hours later)
            end_time = start_time + timedelta(hours=Config.RESERVATION_DURATION_HOURS)
            
            # Validate guest count
            guest_count = int(data['guest_count'])
            if guest_count < 1 or guest_count > Config.MAX_GUESTS_PER_RESERVATION:
                return None, 400, f'Guest count must be between 1 and {Config.MAX_GUESTS_PER_RESERVATION}'
            
            # Check if reservation is in the future
            if start_time < datetime.now() + timedelta(hours=Config.MIN_ADVANCE_BOOKING_HOURS):
                return None, 400, f'Reservations must be made at least {Config.MIN_ADVANCE_BOOKING_HOURS} hour(s) in advance'
            
            # Check restaurant hours
            day_name = start_time.strftime('%A').lower()
            restaurant_hours = Config.RESTAURANT_HOURS.get(day_name)
            
            if not restaurant_hours:
                return None, 400, 'Restaurant is closed on this day'
            
            # Find or create customer
            customer = Customer.query.filter_by(email=data['email']).first()
            
            if not customer:
                customer = Customer(
                    name=data['name'],
                    email=data['email'],
                    phone=data.get('phone'),
                    newsletter_signup=data.get('newsletter_signup', False)
                )
                db.session.add(customer)
                db.session.flush()  # Get customer_id without committing
            
            # Find available table
            available_table = ReservationController._find_available_table(
                start_time, end_time, guest_count
            )
            
            if not available_table:
                return None, 409, 'No tables available for the selected time slot'
            
            # Create reservation
            reservation = Reservation(
                customer_id=customer.customer_id,
                table_id=available_table.table_id,
                start_time=start_time,
                end_time=end_time,
                guest_count=guest_count,
                status='confirmed'
            )
            
            db.session.add(reservation)
            db.session.commit()
            
            # Return reservation with customer and table details
            result = reservation.to_dict(include_customer=True, include_table=True)
            
            return result, 201, 'Reservation created successfully'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error creating reservation: {str(e)}'
    
    @staticmethod
    def _find_available_table(start_time, end_time, guest_count):
        """
        Find an available table for the given time slot and guest count
        
        Args:
            start_time: Reservation start time
            end_time: Reservation end time
            guest_count: Number of guests
        
        Returns:
            Table object or None
        """
        # Get all tables that can accommodate the guest count
        suitable_tables = Table.query.filter(Table.capacity >= guest_count).all()
        
        if not suitable_tables:
            return None
        
        # Check each table for availability
        available_tables = []
        
        for table in suitable_tables:
            # Check for overlapping reservations
            overlapping = Reservation.query.filter(
                and_(
                    Reservation.table_id == table.table_id,
                    Reservation.status == 'confirmed',
                    or_(
                        # New reservation starts during existing reservation
                        and_(
                            Reservation.start_time <= start_time,
                            Reservation.end_time > start_time
                        ),
                        # New reservation ends during existing reservation
                        and_(
                            Reservation.start_time < end_time,
                            Reservation.end_time >= end_time
                        ),
                        # New reservation completely contains existing reservation
                        and_(
                            Reservation.start_time >= start_time,
                            Reservation.end_time <= end_time
                        )
                    )
                )
            ).first()
            
            if not overlapping:
                available_tables.append(table)
        
        if not available_tables:
            return None
        
        # Prioritize tables closest to guest count (most efficient)
        available_tables.sort(key=lambda t: t.capacity)
        
        # Return the best fitting table (or random if multiple same capacity)
        best_capacity = available_tables[0].capacity
        best_tables = [t for t in available_tables if t.capacity == best_capacity]
        
        return random.choice(best_tables)
    
    @staticmethod
    def get_reservation(reservation_id):
        """Get reservation by ID"""
        reservation = Reservation.query.get(reservation_id)
        
        if not reservation:
            return None, 404, 'Reservation not found'
        
        return reservation.to_dict(include_customer=True, include_table=True), 200, 'Success'
    
    @staticmethod
    def get_all_reservations(status=None):
        """Get all reservations, optionally filtered by status"""
        query = Reservation.query
        
        if status:
            query = query.filter_by(status=status)
        
        reservations = query.order_by(Reservation.start_time.desc()).all()
        
        return [r.to_dict(include_customer=True, include_table=True) for r in reservations], 200, 'Success'
    
    @staticmethod
    def cancel_reservation(reservation_id):
        """Cancel a reservation"""
        reservation = Reservation.query.get(reservation_id)
        
        if not reservation:
            return None, 404, 'Reservation not found'
        
        if reservation.status == 'cancelled':
            return None, 400, 'Reservation is already cancelled'
        
        reservation.status = 'cancelled'
        db.session.commit()
        
        return reservation.to_dict(), 200, 'Reservation cancelled successfully'
    
    @staticmethod
    def check_availability(start_time_str, guest_count):
        """
        Check if tables are available for a given time and guest count
        
        Args:
            start_time_str: ISO format string
            guest_count: Number of guests
        
        Returns:
            tuple: (available: bool, status_code, message)
        """
        try:
            start_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
            end_time = start_time + timedelta(hours=Config.RESERVATION_DURATION_HOURS)
            guest_count = int(guest_count)
            
            available_table = ReservationController._find_available_table(
                start_time, end_time, guest_count
            )
            
            if available_table:
                return {
                    'available': True,
                    'table_capacity': available_table.capacity
                }, 200, 'Table available'
            else:
                return {'available': False}, 200, 'No tables available'
                
        except Exception as e:
            return None, 400, f'Error checking availability: {str(e)}'
