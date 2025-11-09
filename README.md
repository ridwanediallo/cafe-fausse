# Café Fausse - Full Stack Web Application

A responsive, full-stack web application for a fine-dining restaurant featuring menu display, table reservations, and newsletter signup.

## 🏗️ Project Structure

```
cafe-fausse/
├── backend/              # Flask REST API
│   ├── app/
│   │   ├── __init__.py          # Flask app factory
│   │   ├── models.py            # SQLAlchemy database models
│   │   ├── config.py            # Configuration settings
│   │   ├── controllers/         # Business logic layer
│   │   │   ├── reservation_controller.py
│   │   │   ├── menu_controller.py
│   │   │   └── customer_controller.py
│   │   └── routes/              # API endpoints
│   │       ├── reservation_routes.py
│   │       ├── menu_routes.py
│   │       └── customer_routes.py
│   ├── venv/                    # Python virtual environment
│   ├── requirements.txt         # Python dependencies
│   └── run.py                   # Application entry point
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   └── package.json
├── database/
│   └── schema.sql               # PostgreSQL database schema
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment variables template
├── .gitignore
└── README.md
```

## 🚀 Tech Stack

**Backend:**
- Flask (Python web framework)
- SQLAlchemy (ORM)
- PostgreSQL (Database)
- Flask-CORS (Cross-origin resource sharing)

**Frontend:**
- React with JSX
- CSS (Flexbox/Grid)
- Axios (HTTP client)

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+ and npm
- PostgreSQL 12+
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone git@github.com:ridwanediallo/cafe-fausse.git
cd cafe-fausse
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb cafe_fausse

# Load the schema
psql cafe_fausse < database/schema.sql
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Environment Configuration

```bash
# Create .env file from template
cp .env.example .env

# Edit .env with your database credentials
# Update DATABASE_URL with your PostgreSQL username and password
```

### 5. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python run.py
```

The API will be available at: `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

The React app will be available at: `http://localhost:3000`

## 📡 API Endpoints

### Menu Endpoints

- `GET /api/menu/` - Get complete menu
- `GET /api/menu/categories/{id}` - Get category with items
- `GET /api/menu/items/{id}` - Get specific menu item
- `POST /api/menu/items` - Create menu item (Admin)
- `PUT /api/menu/items/{id}` - Update menu item (Admin)
- `DELETE /api/menu/items/{id}` - Delete menu item (Admin)

### Reservation Endpoints

- `POST /api/reservations/` - Create reservation
- `GET /api/reservations/` - Get all reservations
- `GET /api/reservations/{id}` - Get specific reservation
- `PUT /api/reservations/{id}/cancel` - Cancel reservation
- `GET /api/reservations/check-availability` - Check table availability

### Customer Endpoints

- `POST /api/customers/newsletter-signup` - Newsletter signup
- `GET /api/customers/{id}` - Get customer details
- `GET /api/customers/email/{email}` - Get customer by email
- `GET /api/customers/` - Get all customers (Admin)
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer (Admin)

### Health Check

- `GET /api/health` - API health status

## 🗄️ Database Schema

### Tables

- **tables** - Restaurant seating (30 tables with varying capacities)
- **menu_categories** - Menu sections (Starters, Main Courses, Desserts, Beverages)
- **menu_items** - Individual menu items with prices and descriptions
- **customers** - Customer information and newsletter subscriptions
- **reservations** - Table bookings with time slots

## 🎯 Features

### Implemented Features

✅ Complete database schema with relationships
✅ MVC architecture for backend
✅ RESTful API with all CRUD operations
✅ Table availability checking with overlap detection
✅ Smart table assignment based on guest count
✅ Email validation for newsletter signup
✅ Cascade deletes for data integrity
✅ Error handling and validation

### Restaurant Business Rules

- Reservations are 2 hours long
- Must book at least 1 hour in advance
- 1-8 guests per reservation
- 30 tables (10x2-seat, 10x4-seat, 6x6-seat, 4x8-seat)
- Tables assigned based on optimal capacity matching

### Restaurant Hours

- Monday-Saturday: 5:00 PM - 11:00 PM
- Sunday: 5:00 PM - 9:00 PM

## 🧪 Testing the API

### Using curl

```bash
# Get menu
curl http://localhost:5000/api/menu/

# Create reservation
curl -X POST http://localhost:5000/api/reservations/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(202) 555-1234",
    "start_time": "2025-11-15T18:00:00",
    "guest_count": 4
  }'

# Newsletter signup
curl -X POST http://localhost:5000/api/customers/newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com", "name": "Jane Smith"}'
```

## 📦 Dependencies

### Backend (requirements.txt)

```
flask
flask-cors
flask-sqlalchemy
psycopg2-binary
python-dotenv
```

### Frontend (package.json)

```
react
react-dom
react-router-dom
axios
```

## 🔐 Security Notes

- Change `SECRET_KEY` in production
- Add authentication for admin endpoints (menu/customer management)
- Implement rate limiting for public endpoints
- Use HTTPS in production
- Sanitize all user inputs
- Never commit `.env` file to git

## 🚧 Future Enhancements

- [ ] Admin dashboard for managing reservations and menu
- [ ] Email confirmation for reservations
- [ ] Payment integration
- [ ] User authentication
- [ ] Reservation modification/rescheduling
- [ ] Newsletter management
- [ ] Customer management
- [ ] Payment Integration: Add online payment for deposits
- [ ] Table management interface
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Deployment: Deploy to production (Heroku, AWS, DigitalOcean, etc.)
- [ ] Testing: Add unit tests and integration tests

## 👥 Contact Information

**Restaurant:**
Café Fausse
1234 Culinary Ave, Suite 100
Washington, DC 20002
(202) 555-4567

**Development Team:**
GitHub: https://github.com/ridwanediallo/cafe-fausse

## 📄 License

This project is part of the MSEE Web Application and Interface Design course.
