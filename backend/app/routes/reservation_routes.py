"""
Reservation Routes - API endpoints for reservations
"""
from flask import Blueprint, request, jsonify
from app.controllers.reservation_controller import ReservationController

reservation_bp = Blueprint('reservations', __name__)


@reservation_bp.route('/', methods=['POST'])
def create_reservation():
    """
    Create a new reservation
    
    POST /api/reservations/
    Body: {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "(202) 555-1234",
        "start_time": "2025-11-15T18:00:00",
        "guest_count": 4,
        "newsletter_signup": false
    }
    """
    data = request.get_json()
    
    result, status_code, message = ReservationController.create_reservation(data)
    
    if result:
        return jsonify({
            'success': True,
            'message': message,
            'data': result
        }), status_code
    else:
        return jsonify({
            'success': False,
            'message': message
        }), status_code


@reservation_bp.route('/<int:reservation_id>', methods=['GET'])
def get_reservation(reservation_id):
    """
    Get a specific reservation
    
    GET /api/reservations/{reservation_id}
    """
    result, status_code, message = ReservationController.get_reservation(reservation_id)
    
    if result:
        return jsonify({
            'success': True,
            'data': result
        }), status_code
    else:
        return jsonify({
            'success': False,
            'message': message
        }), status_code


@reservation_bp.route('/', methods=['GET'])
def get_all_reservations():
    """
    Get all reservations, optionally filtered by status
    
    GET /api/reservations/?status=confirmed
    """
    status = request.args.get('status')
    
    result, status_code, message = ReservationController.get_all_reservations(status)
    
    return jsonify({
        'success': True,
        'data': result,
        'count': len(result)
    }), status_code


@reservation_bp.route('/<int:reservation_id>/cancel', methods=['PUT'])
def cancel_reservation(reservation_id):
    """
    Cancel a reservation
    
    PUT /api/reservations/{reservation_id}/cancel
    """
    result, status_code, message = ReservationController.cancel_reservation(reservation_id)
    
    if result:
        return jsonify({
            'success': True,
            'message': message,
            'data': result
        }), status_code
    else:
        return jsonify({
            'success': False,
            'message': message
        }), status_code


@reservation_bp.route('/check-availability', methods=['GET'])
def check_availability():
    """
    Check if tables are available for a given time and guest count
    
    GET /api/reservations/check-availability?start_time=2025-11-15T18:00:00&guest_count=4
    """
    start_time = request.args.get('start_time')
    guest_count = request.args.get('guest_count')
    
    if not start_time or not guest_count:
        return jsonify({
            'success': False,
            'message': 'start_time and guest_count are required'
        }), 400
    
    result, status_code, message = ReservationController.check_availability(
        start_time, guest_count
    )
    
    if result is not None:
        return jsonify({
            'success': True,
            'data': result
        }), status_code
    else:
        return jsonify({
            'success': False,
            'message': message
        }), status_code
