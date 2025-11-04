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
