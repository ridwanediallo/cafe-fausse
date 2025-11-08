import { Link } from 'react-router-dom';
import { RESTAURANT_INFO, NAV_LINKS } from '../utils/constants';
import NewsletterSignup from './NewsletterSignup';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>{RESTAURANT_INFO.name}</h3>
          <p className="footer-tagline">An unforgettable dining experience</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>{RESTAURANT_INFO.address}</p>
          <p>
            <a href={`tel:${RESTAURANT_INFO.phone}`}>{RESTAURANT_INFO.phone}</a>
          </p>
          <p>
            <a href={`mailto:${RESTAURANT_INFO.email}`}>{RESTAURANT_INFO.email}</a>
          </p>
        </div>

        <div className="footer-section">
          <h4>Hours</h4>
          <p>{RESTAURANT_INFO.hours.weekday}</p>
          <p>{RESTAURANT_INFO.hours.sunday}</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h4>Newsletter</h4>
          <p>Subscribe to receive updates and special offers</p>
          <NewsletterSignup />
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} {RESTAURANT_INFO.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
