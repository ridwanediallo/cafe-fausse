/**
 * Gallery Page Component
 * Restaurant images, awards, and customer reviews
 */
import { useState } from 'react';
import { AWARDS, REVIEWS, RESTAURANT_INFO } from '../utils/constants';
import '../styles/Gallery.css';

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample gallery images (placeholders with emojis)
  const galleryImages = [
    {
      id: 1,
      category: 'interior',
      emoji: '🏛️',
      title: 'Elegant Dining Room',
      description: 'Our beautifully decorated main dining area',
    },
    {
      id: 2,
      category: 'interior',
      emoji: '🕯️',
      title: 'Intimate Setting',
      description: 'Perfect for romantic dinners',
    },
    {
      id: 3,
      category: 'food',
      emoji: '🥩',
      title: 'Prime Ribeye Steak',
      description: '12 oz prime cut with garlic mashed potatoes',
    },
    {
      id: 4,
      category: 'food',
      emoji: '🐟',
      title: 'Grilled Salmon',
      description: 'Fresh salmon with lemon butter sauce',
    },
    {
      id: 5,
      category: 'food',
      emoji: '🍝',
      title: 'Vegetable Risotto',
      description: 'Creamy Arborio rice with wild mushrooms',
    },
    {
      id: 6,
      category: 'food',
      emoji: '🍰',
      title: 'Classic Tiramisu',
      description: 'Italian dessert with mascarpone',
    },
    {
      id: 7,
      category: 'bar',
      emoji: '🍷',
      title: 'Wine Selection',
      description: 'Curated collection of Italian wines',
    },
    {
      id: 8,
      category: 'bar',
      emoji: '🍸',
      title: 'Craft Cocktails',
      description: 'Handcrafted cocktails by expert mixologists',
    },
    {
      id: 9,
      category: 'events',
      emoji: '🎉',
      title: 'Special Events',
      description: 'Private dining and celebrations',
    },
    {
      id: 10,
      category: 'kitchen',
      emoji: '👨‍🍳',
      title: 'Behind the Scenes',
      description: 'Chef Antonio in action',
    },
    {
      id: 11,
      category: 'exterior',
      emoji: '🌃',
      title: 'Evening Ambiance',
      description: 'Our welcoming entrance at night',
    },
    {
      id: 12,
      category: 'food',
      emoji: '🥗',
      title: 'Fresh Bruschetta',
      description: 'Tomatoes, basil, and olive oil on toasted baguette',
    },
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <h1 className="gallery-title">Gallery</h1>
          <p className="gallery-subtitle">
            Experience the ambiance, artistry, and excellence of{' '}
            {RESTAURANT_INFO.name}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section section">
        <div className="container">
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">
            Browse through our collection of memorable moments
          </p>

          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <div className="gallery-image">
                  <span className="gallery-emoji">{image.emoji}</span>
                </div>
                <div className="gallery-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                  <span className="view-icon">🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section section">
        <div className="container">
          <h2 className="section-title">Our Awards</h2>
          <p className="section-subtitle">
            Recognized for excellence in fine dining
          </p>

          <div className="awards-grid">
            {AWARDS.map((award, index) => (
              <div key={index} className="award-card">
                <div className="award-icon">🏆</div>
                <h3>{award.title}</h3>
                {award.source && <p className="award-source">{award.source}</p>}
                <p className="award-year">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <div className="container">
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">Reviews from our valued customers</p>

          <div className="testimonials-grid">
            {REVIEWS.map((review, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">{review.text}</p>
                <div className="testimonial-footer">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p className="testimonial-source">— {review.source}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-cta">
            <p>Have you dined with us? We'd love to hear your feedback!</p>
            <a
              href={`mailto:${RESTAURANT_INFO.email}?subject=Restaurant Review`}
              className="btn btn-secondary"
            >
              Share Your Experience
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox-backdrop" onClick={handleBackdropClick}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            <div className="lightbox-image">
              <span className="lightbox-emoji">{selectedImage.emoji}</span>
            </div>
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
