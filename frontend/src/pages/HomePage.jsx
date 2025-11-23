import { Link } from 'react-router-dom';
import { RESTAURANT_INFO, ABOUT_INFO } from '../utils/constants';
import '../styles/Home.css';

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{RESTAURANT_INFO.name}</h1>
            <p className="hero-subtitle">An Unforgettable Dining Experience</p>
            <p className="hero-description">
              Traditional Italian flavors meet modern culinary innovation
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-primary">
                View Menu
              </Link>
              <Link to="/reservations" className="btn btn-secondary">
                Make Reservation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section section">
        <div className="container">
          <h2 className="section-title">Welcome to {RESTAURANT_INFO.name}</h2>
          <div className="welcome-content">
            <div className="welcome-text">
              <p className="welcome-intro">{ABOUT_INFO.history}</p>
              <p className="welcome-commitment">{ABOUT_INFO.commitment}</p>
              <Link to="/about" className="btn btn-secondary">
                Learn More About Us
              </Link>
            </div>
            <div className="welcome-image">
              <div className="image-placeholder">
                <span>🍽️</span>
                <p>Fine Dining</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="info-section section">
        <div className="container">
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>{RESTAURANT_INFO.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  RESTAURANT_INFO.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                Get Directions
              </a>
            </div>

            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h3>Hours</h3>
              <p>{RESTAURANT_INFO.hours.weekday}</p>
              <p>{RESTAURANT_INFO.hours.sunday}</p>
              <Link to="/reservations" className="info-link">
                Book a Table
              </Link>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Contact</h3>
              <p>
                <a href={`tel:${RESTAURANT_INFO.phone}`}>
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${RESTAURANT_INFO.email}`}>
                  {RESTAURANT_INFO.email}
                </a>
              </p>
              <Link to="/about" className="info-link">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Specialties */}
      <section className="specialties-section section">
        <div className="container">
          <h2 className="section-title">Our Specialties</h2>
          <p className="section-subtitle">
            Discover our most beloved dishes, crafted with passion and expertise
          </p>

          <div className="specialties-grid">
            <div className="specialty-card">
              <div className="specialty-icon">🥗</div>
              <h3>Fresh Starters</h3>
              <p>
                Begin your culinary journey with our handcrafted bruschetta and
                signature Caesar salad
              </p>
            </div>

            <div className="specialty-card">
              <div className="specialty-icon">🥩</div>
              <h3>Premium Mains</h3>
              <p>
                Savor our perfectly grilled salmon, prime ribeye steak, and
                creamy vegetable risotto
              </p>
            </div>

            <div className="specialty-card">
              <div className="specialty-icon">🍰</div>
              <h3>Decadent Desserts</h3>
              <p>
                Indulge in classic Italian tiramisu and our homemade cheesecake
                with berry compote
              </p>
            </div>

            <div className="specialty-card">
              <div className="specialty-icon">🍷</div>
              <h3>Fine Beverages</h3>
              <p>
                Complement your meal with our curated selection of Italian wines
                and craft beers
              </p>
            </div>
          </div>

          <div className="cta-center">
            <Link to="/menu" className="btn btn-primary">
              Explore Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section section">
        <div className="container">
          <h2 className="section-title">Why Dine With Us</h2>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <h3>Authentic Flavors</h3>
              <p>
                Traditional Italian recipes passed down through generations,
                perfected by Chef Antonio Rossi
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">02</div>
              <h3>Locally Sourced</h3>
              <p>
                We partner with local farms to bring you the freshest, highest
                quality ingredients
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">03</div>
              <h3>Elegant Ambiance</h3>
              <p>
                Enjoy fine dining in a sophisticated yet warm and welcoming
                atmosphere
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">04</div>
              <h3>Award Winning</h3>
              <p>
                Recognized for culinary excellence and named Restaurant of the
                Year 2023
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for an Unforgettable Experience?</h2>
            <p>
              Reserve your table today and let us create a memorable evening for
              you
            </p>
            <div className="cta-buttons">
              <Link to="/reservations" className="btn btn-primary btn-large">
                Reserve Now
              </Link>
              <Link to="/gallery" className="btn btn-secondary btn-large">
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
