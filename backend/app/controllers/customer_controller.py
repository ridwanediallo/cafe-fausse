"""
Customer Controller - Business logic for customer management
"""
from app.models import db, Customer
import re


class CustomerController:
    """Handles customer business logic"""
    
    @staticmethod
    def validate_email(email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def newsletter_signup(data):
        """
        Sign up a customer for the newsletter
        
        Args:
            data: Dictionary with email and optionally name
        
        Returns:
            tuple: (customer_dict, status_code, message)
        """
        try:
            # Validate required fields
            if 'email' not in data:
                return None, 400, 'Email is required'
            
            # Validate email format
            if not CustomerController.validate_email(data['email']):
                return None, 400, 'Invalid email format'
            
            # Check if customer already exists
            customer = Customer.query.filter_by(email=data['email']).first()
            
            if customer:
                # Update existing customer
                if customer.newsletter_signup:
                    return customer.to_dict(), 200, 'Already subscribed to newsletter'
                
                customer.newsletter_signup = True
                
                # Update name if provided and different
                if 'name' in data and data['name']:
                    customer.name = data['name']
                
                db.session.commit()
                return customer.to_dict(), 200, 'Successfully subscribed to newsletter'
            
            # Create new customer
            name = data.get('name', 'Newsletter Subscriber')
            
            customer = Customer(
                name=name,
                email=data['email'],
                phone=data.get('phone'),
                newsletter_signup=True
            )
            
            db.session.add(customer)
            db.session.commit()
            
            return customer.to_dict(), 201, 'Successfully subscribed to newsletter'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error signing up for newsletter: {str(e)}'
    
    @staticmethod
    def get_customer(customer_id):
        """Get customer by ID"""
        customer = Customer.query.get(customer_id)
        
        if not customer:
            return None, 404, 'Customer not found'
        
        return customer.to_dict(include_reservations=True), 200, 'Success'
    
    @staticmethod
    def get_customer_by_email(email):
        """Get customer by email"""
        customer = Customer.query.filter_by(email=email).first()
        
        if not customer:
            return None, 404, 'Customer not found'
        
        return customer.to_dict(include_reservations=True), 200, 'Success'
    
    @staticmethod
    def get_all_customers(newsletter_only=False):
        """Get all customers, optionally filtered by newsletter subscription"""
        query = Customer.query
        
        if newsletter_only:
            query = query.filter_by(newsletter_signup=True)
        
        customers = query.order_by(Customer.created_at.desc()).all()
        
        return [c.to_dict() for c in customers], 200, 'Success'
    
    @staticmethod
    def update_customer(customer_id, data):
        """Update customer information"""
        customer = Customer.query.get(customer_id)
        
        if not customer:
            return None, 404, 'Customer not found'
        
        try:
            # Update allowed fields
            updateable_fields = ['name', 'phone', 'newsletter_signup']
            
            for field in updateable_fields:
                if field in data:
                    setattr(customer, field, data[field])
            
            # Email update requires validation
            if 'email' in data:
                if not CustomerController.validate_email(data['email']):
                    return None, 400, 'Invalid email format'
                
                # Check if email is already taken by another customer
                existing = Customer.query.filter_by(email=data['email'])\
                    .filter(Customer.customer_id != customer_id).first()
                
                if existing:
                    return None, 409, 'Email already in use'
                
                customer.email = data['email']
            
            db.session.commit()
            
            return customer.to_dict(), 200, 'Customer updated successfully'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error updating customer: {str(e)}'
    
    @staticmethod
    def delete_customer(customer_id):
        """Delete a customer (and cascade delete their reservations)"""
        customer = Customer.query.get(customer_id)
        
        if not customer:
            return None, 404, 'Customer not found'
        
        try:
            db.session.delete(customer)
            db.session.commit()
            
            return None, 200, 'Customer deleted successfully'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error deleting customer: {str(e)}'
