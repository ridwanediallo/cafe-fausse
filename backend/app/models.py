from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Table(db.Model):
    """Restaurant tables with seating capacity"""
    __tablename__ = 'tables'
    
    table_id = db.Column(db.Integer, primary_key=True)
    capacity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    reservations = db.relationship('Reservation', backref='table', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'table_id': self.table_id,
            'capacity': self.capacity,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Table {self.table_id} - Capacity: {self.capacity}>'


class MenuCategory(db.Model):
    """Menu categories (Starters, Main Courses, Desserts, Beverages)"""
    __tablename__ = 'menu_categories'
    
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), unique=True, nullable=False)
    display_order = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    menu_items = db.relationship('MenuItem', backref='category', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self, include_items=False):
        """Convert model to dictionary"""
        result = {
            'category_id': self.category_id,
            'category_name': self.category_name,
            'display_order': self.display_order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
        
        if include_items:
            result['items'] = [item.to_dict() for item in sorted(self.menu_items, key=lambda x: x.display_order)]
        
        return result
    
    def __repr__(self):
        return f'<MenuCategory {self.category_name}>'



class MenuItem(db.Model):
    """Individual menu items"""
    __tablename__ = 'menu_items'

    item_id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('menu_categories.category_id'), nullable=False)
    item_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    display_order = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'item_id': self.item_id,
            'category_id': self.category_id,
            'item_name': self.item_name,
            'description': self.description,
            'price': float(self.price),
            'is_available': self.is_available,
            'display_order': self.display_order,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<MenuItem {self.item_name} - ${self.price}>'



