-- Café Fausse Database Schema
-- PostgreSQL Implementation

-- Drop tables if they exist (for clean reinstallation)
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS tables CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;

-- Tables Table: Defines restaurant seating capacity
CREATE TABLE tables (
    table_id SERIAL PRIMARY KEY,
    capacity INTEGER NOT NULL CHECK (capacity IN (2, 4, 6, 8)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Categories Table: Organizes menu into sections
CREATE TABLE menu_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items Table: Stores individual menu items
CREATE TABLE menu_items (
    item_id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    is_available BOOLEAN DEFAULT TRUE,
    display_order INTEGER NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign key constraint
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES menu_categories(category_id) ON DELETE CASCADE
);

-- Customers Table: Stores customer information
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    newsletter_signup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservations Table: Manages table bookings
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    table_id INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count >= 1 AND guest_count <= 8),
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign key constraints
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    CONSTRAINT fk_table FOREIGN KEY (table_id) REFERENCES tables(table_id) ON DELETE CASCADE,

    -- Ensure end time is after start time
    CONSTRAINT check_time_order CHECK (end_time > start_time),

    -- Prevent double booking: same table cannot be booked at the same start time
    CONSTRAINT unique_table_time UNIQUE (table_id, start_time)
);

-- Indexes for performance optimization
CREATE INDEX idx_reservations_start_time ON reservations(start_time);
CREATE INDEX idx_reservations_table_time ON reservations(table_id, start_time);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_categories_active ON menu_categories(is_active);

-- Initialize tables with 30 tables (distribution based on capacity)
INSERT INTO tables (capacity) VALUES
    -- 10 tables for 2 guests
    (2), (2), (2), (2), (2), (2), (2), (2), (2), (2),
    -- 10 tables for 4 guests
    (4), (4), (4), (4), (4), (4), (4), (4), (4), (4),
    -- 6 tables for 6 guests
    (6), (6), (6), (6), (6), (6),
    -- 4 tables for 8 guests
    (8), (8), (8), (8);

-- Initialize menu categories
INSERT INTO menu_categories (category_name, display_order) VALUES
    ('Starters', 1),
    ('Main Courses', 2),
    ('Desserts', 3),
    ('Beverages', 4);

-- Initialize menu items based on SRS requirements
-- Starters
INSERT INTO menu_items (category_id, item_name, description, price, display_order) VALUES
    (1, 'Bruschetta', 'Fresh tomatoes, basil, olive oil, and toasted baguette slices', 8.50, 1),
    (1, 'Caesar Salad', 'Crisp romaine with homemade Caesar dressing', 9.00, 2);

-- Main Courses
INSERT INTO menu_items (category_id, item_name, description, price, display_order) VALUES
    (2, 'Grilled Salmon', 'Served with lemon butter sauce and seasonal vegetables', 22.00, 1),
    (2, 'Ribeye Steak', '12 oz prime cut with garlic mashed potatoes', 28.00, 2),
    (2, 'Vegetable Risotto', 'Creamy Arborio rice with wild mushrooms', 18.00, 3);

-- Desserts
INSERT INTO menu_items (category_id, item_name, description, price, display_order) VALUES
    (3, 'Tiramisu', 'Classic Italian dessert with mascarpone', 7.50, 1),
    (3, 'Cheesecake', 'Creamy cheesecake with berry compote', 7.00, 2);

-- Beverages
INSERT INTO menu_items (category_id, item_name, description, price, display_order) VALUES
    (4, 'Red Wine (Glass)', 'A selection of Italian reds', 10.00, 1),
    (4, 'White Wine (Glass)', 'Crisp and refreshing', 9.00, 2),
    (4, 'Craft Beer', 'Local artisan brews', 6.00, 3),
    (4, 'Espresso', 'Strong and aromatic', 3.00, 4);

-- Sample data for testing (optional - remove in production)
-- Insert a test customer
INSERT INTO customers (name, email, phone, newsletter_signup) VALUES
    ('John Doe', 'john.doe@example.com', '(202) 555-1234', TRUE);

-- Insert a test reservation
INSERT INTO reservations (customer_id, table_id, start_time, end_time, guest_count) VALUES
    (1, 15, '2025-11-10 18:00:00', '2025-11-10 20:00:00', 4);

-- Verification queries
-- View all tables
SELECT * FROM tables ORDER BY capacity, table_id;

-- View all menu categories
SELECT * FROM menu_categories ORDER BY display_order;

-- View all menu items with category names
SELECT
    c.category_name,
    i.item_name,
    i.description,
    i.price,
    i.is_available,
    i.display_order
FROM menu_items i
JOIN menu_categories c ON i.category_id = c.category_id
WHERE c.is_active = TRUE
ORDER BY c.display_order, i.display_order;

-- View all customers
SELECT * FROM customers;

-- View all reservations with customer and table details
SELECT
    r.reservation_id,
    c.name AS customer_name,
    c.email,
    t.table_id,
    t.capacity AS table_capacity,
    r.start_time,
    r.end_time,
    r.guest_count,
    r.status
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
JOIN tables t ON r.table_id = t.table_id
ORDER BY r.start_time;
