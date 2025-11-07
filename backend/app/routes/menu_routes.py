"""
Menu Routes - API endpoints for menu management
"""
from flask import Blueprint, request, jsonify
from app.controllers.menu_controller import MenuController

menu_bp = Blueprint('menu', __name__)


@menu_bp.route('/', methods=['GET'])
def get_menu():
    """
    Get the complete menu organized by categories
    
    GET /api/menu/?include_unavailable=false
    """
    include_unavailable = request.args.get('include_unavailable', 'false').lower() == 'true'
    
    result, status_code, message = MenuController.get_full_menu(include_unavailable)
    
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


@menu_bp.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    """
    Get a specific category with its items
    
    GET /api/menu/categories/{category_id}
    """
    result, status_code, message = MenuController.get_category(category_id)
    
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


@menu_bp.route('/items/<int:item_id>', methods=['GET'])
def get_menu_item(item_id):
    """
    Get a specific menu item
    
    GET /api/menu/items/{item_id}
    """
    result, status_code, message = MenuController.get_menu_item(item_id)
    
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


@menu_bp.route('/items', methods=['POST'])
def create_menu_item():
    """
    Create a new menu item (Admin only - add authentication later)
    
    POST /api/menu/items
    Body: {
        "category_id": 1,
        "item_name": "New Dish",
        "description": "Description",
        "price": 15.99,
        "display_order": 1,
        "is_available": true
    }
    """
    data = request.get_json()
    
    result, status_code, message = MenuController.create_menu_item(data)
    
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


@menu_bp.route('/items/<int:item_id>', methods=['PUT'])
def update_menu_item(item_id):
    """
    Update a menu item (Admin only - add authentication later)
    
    PUT /api/menu/items/{item_id}
    Body: {
        "price": 16.99,
        "is_available": false
    }
    """
    data = request.get_json()
    
    result, status_code, message = MenuController.update_menu_item(item_id, data)
    
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


@menu_bp.route('/items/<int:item_id>', methods=['DELETE'])
def delete_menu_item(item_id):
    """
    Delete a menu item (Admin only - add authentication later)
    
    DELETE /api/menu/items/{item_id}
    """
    result, status_code, message = MenuController.delete_menu_item(item_id)
    
    return jsonify({
        'success': status_code == 200,
        'message': message
    }), status_code


@menu_bp.route('/items/<int:item_id>/toggle-availability', methods=['PATCH'])
def toggle_item_availability(item_id):
    """
    Toggle item availability (Admin only - add authentication later)
    
    PATCH /api/menu/items/{item_id}/toggle-availability
    """
    result, status_code, message = MenuController.toggle_item_availability(item_id)
    
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
