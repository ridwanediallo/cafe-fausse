import { ABOUT_INFO, RESTAURANT_INFO } from '../utils/constants';
import '../styles/About.css';

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About {RESTAURANT_INFO.name}</h1>
          <p className="about-subtitle">Where Tradition Meets Innovation</p>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section section">
        <div className="container">
          <div className="history-content">
            <div className="history-image">
              <div className="image-placeholder">
                <span>🏛️</span>
                <p>Since 2010</p>
              </div>
            </div>
            <div className="history-text">
              <h2>Our Story</h2>
              <p className="history-description">{ABOUT_INFO.history}</p>
              <div className="history-highlights">
                <div className="highlight-item">
                  <span className="highlight-number">14+</span>
                  <span className="highlight-label">Years of Excellence</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">1000+</span>
                  <span className="highlight-label">Happy Customers</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">3</span>
                  <span className="highlight-label">Prestigious Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              To provide an unforgettable dining experience that reflects both
              quality and creativity, while honoring traditional Italian flavors
              and embracing modern culinary innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders-section section">
        <div className="container">
          <h2 className="section-title">Meet Our Founders</h2>
          <p className="section-subtitle">
            The visionaries behind {RESTAURANT_INFO.name}
          </p>

          <div className="founders-grid">
            {ABOUT_INFO.founders.map((founder, index) => (
              <div key={index} className="founder-card">
                <div className="founder-image">
                  <div className="founder-placeholder">
                    <span>{index === 0 ? '👨‍🍳' : '👩‍💼'}</span>
                  </div>
                </div>
                <div className="founder-info">
                  <h3>{founder.name}</h3>
                  <p className="founder-role">{founder.role}</p>
                  <p className="founder-bio">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Locally Sourced</h3>
              <p>
                We partner with local farms and suppliers to bring you the
                freshest, highest quality ingredients while supporting our
                community.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Excellence</h3>
              <p>
                Every dish is crafted with meticulous attention to detail,
                ensuring an exceptional dining experience every time you visit.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Hospitality</h3>
              <p>
                From the moment you walk through our doors, our team is
                dedicated to making you feel welcome and valued.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Innovation</h3>
              <p>
                While respecting culinary traditions, we're not afraid to
                experiment and create new, exciting flavor combinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="commitment-section section">
        <div className="container">
          <div className="commitment-content">
            <h2>Our Commitment to You</h2>
            <p className="commitment-text">
              {ABOUT_INFO.commitment} Every ingredient is carefully selected,
              every recipe is perfected, and every meal is prepared with love
              and dedication. We believe that great food brings people together,
              and we're honored to be part of your special moments.
            </p>
            <div className="commitment-features">
              <div className="commitment-item">
                <span className="commitment-check">✓</span>
                <span>Fresh, locally sourced ingredients daily</span>
              </div>
              <div className="commitment-item">
                <span className="commitment-check">✓</span>
                <span>Traditional recipes with modern techniques</span>
              </div>
              <div className="commitment-item">
                <span className="commitment-check">✓</span>
                <span>Exceptional service and warm hospitality</span>
              </div>
              <div className="commitment-item">
                <span className="commitment-check">✓</span>
                <span>Sustainable and ethical sourcing practices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Have Questions?</h2>
            <p>We'd love to hear from you. Contact us anytime!</p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href={`tel:${RESTAURANT_INFO.phone}`}>
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href={`mailto:${RESTAURANT_INFO.email}`}>
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>{RESTAURANT_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
