"""
Customer Routes - API endpoints for customer management
"""
from flask import Blueprint, request, jsonify
from app.controllers.customer_controller import CustomerController

customer_bp = Blueprint('customers', __name__)


@customer_bp.route('/newsletter-signup', methods=['POST'])
def newsletter_signup():
    """
    Sign up for newsletter
    
    POST /api/customers/newsletter-signup
    Body: {
        "email": "customer@example.com",
        "name": "Customer Name" (optional)
    }
    """
    data = request.get_json()
    
    result, status_code, message = CustomerController.newsletter_signup(data)
    
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


@customer_bp.route('/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """
    Get customer by ID
    
    GET /api/customers/{customer_id}
    """
    result, status_code, message = CustomerController.get_customer(customer_id)
    
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


@customer_bp.route('/email/<email>', methods=['GET'])
def get_customer_by_email(email):
    """
    Get customer by email
    
    GET /api/customers/email/{email}
    """
    result, status_code, message = CustomerController.get_customer_by_email(email)
    
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


@customer_bp.route('/', methods=['GET'])
def get_all_customers():
    """
    Get all customers (Admin only - add authentication later)
    
    GET /api/customers/?newsletter_only=false
    """
    newsletter_only = request.args.get('newsletter_only', 'false').lower() == 'true'
    
    result, status_code, message = CustomerController.get_all_customers(newsletter_only)
    
    return jsonify({
        'success': True,
        'data': result,
        'count': len(result)
    }), status_code


@customer_bp.route('/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    """
    Update customer information
    
    PUT /api/customers/{customer_id}
    Body: {
        "name": "Updated Name",
        "phone": "(202) 555-9999"
    }
    """
    data = request.get_json()
    
    result, status_code, message = CustomerController.update_customer(customer_id, data)
    
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


@customer_bp.route('/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    """
    Delete a customer (Admin only - add authentication later)
    
    DELETE /api/customers/{customer_id}
    """
    result, status_code, message = CustomerController.delete_customer(customer_id)
    
    return jsonify({
        'success': status_code == 200,
        'message': message
    }), status_code
