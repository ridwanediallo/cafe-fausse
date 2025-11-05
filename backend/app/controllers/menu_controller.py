"""
Menu Controller - Business logic for menu management
"""
from app.models import db, MenuCategory, MenuItem


class MenuController:
    """Handles menu business logic"""
    
    @staticmethod
    def get_full_menu(include_unavailable=False):
        """
        Get the complete menu organized by categories
        
        Args:
            include_unavailable: If True, include unavailable items
        
        Returns:
            tuple: (menu_dict, status_code, message)
        """
        try:
            # Get all active categories ordered by display_order
            categories = MenuCategory.query.filter_by(is_active=True)\
                .order_by(MenuCategory.display_order).all()
            
            menu = []
            
            for category in categories:
                # Get items for this category
                items_query = MenuItem.query.filter_by(category_id=category.category_id)
                
                if not include_unavailable:
                    items_query = items_query.filter_by(is_available=True)
                
                items = items_query.order_by(MenuItem.display_order).all()
                
                category_data = {
                    'category_id': category.category_id,
                    'category_name': category.category_name,
                    'display_order': category.display_order,
                    'items': [item.to_dict() for item in items]
                }
                
                menu.append(category_data)
            
            return menu, 200, 'Success'
            
        except Exception as e:
            return None, 500, f'Error fetching menu: {str(e)}'
    
    @staticmethod
    def get_category(category_id):
        """Get a specific category with its items"""
        category = MenuCategory.query.get(category_id)
        
        if not category:
            return None, 404, 'Category not found'
        
        return category.to_dict(include_items=True), 200, 'Success'
    
    @staticmethod
    def get_menu_item(item_id):
        """Get a specific menu item"""
        item = MenuItem.query.get(item_id)
        
        if not item:
            return None, 404, 'Menu item not found'
        
        return item.to_dict(), 200, 'Success'
    
    @staticmethod
    def create_menu_item(data):
        """
        Create a new menu item
        
        Args:
            data: Dictionary with item details
        
        Returns:
            tuple: (item_dict, status_code, message)
        """
        try:
            required_fields = ['category_id', 'item_name', 'price', 'display_order']
            for field in required_fields:
                if field not in data:
                    return None, 400, f'Missing required field: {field}'
            
            # Verify category exists
            category = MenuCategory.query.get(data['category_id'])
            if not category:
                return None, 404, 'Category not found'
            
            # Create new item
            item = MenuItem(
                category_id=data['category_id'],
                item_name=data['item_name'],
                description=data.get('description'),
                price=data['price'],
                is_available=data.get('is_available', True),
                display_order=data['display_order'],
                image_url=data.get('image_url')
            )
            
            db.session.add(item)
            db.session.commit()
            
            return item.to_dict(), 201, 'Menu item created successfully'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error creating menu item: {str(e)}'
    
    @staticmethod
    def update_menu_item(item_id, data):
        """Update an existing menu item"""
        item = MenuItem.query.get(item_id)
        
        if not item:
            return None, 404, 'Menu item not found'
        
        try:
            # Update allowed fields
            updateable_fields = ['item_name', 'description', 'price', 'is_available', 
                               'display_order', 'image_url', 'category_id']
            
            for field in updateable_fields:
                if field in data:
                    setattr(item, field, data[field])
            
            db.session.commit()
            
            return item.to_dict(), 200, 'Menu item updated successfully'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error updating menu item: {str(e)}'
    
    @staticmethod
    def delete_menu_item(item_id):
        """Delete a menu item"""
        item = MenuItem.query.get(item_id)
        
        if not item:
            return None, 404, 'Menu item not found'
        
        try:
            db.session.delete(item)
            db.session.commit()
            
            return None, 200, 'Menu item deleted successfully'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error deleting menu item: {str(e)}'
    
    @staticmethod
    def toggle_item_availability(item_id):
        """Toggle the availability status of a menu item"""
        item = MenuItem.query.get(item_id)
        
        if not item:
            return None, 404, 'Menu item not found'
        
        try:
            item.is_available = not item.is_available
            db.session.commit()
            
            status = 'available' if item.is_available else 'unavailable'
            return item.to_dict(), 200, f'Menu item marked as {status}'
            
        except Exception as e:
            db.session.rollback()
            return None, 500, f'Error updating item availability: {str(e)}'
