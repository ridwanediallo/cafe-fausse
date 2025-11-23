import { useState } from 'react';
import customerService from '../services/customerService';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setMessage({ type: 'error', text: 'Email is required' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = { email };
      if (name) {
        data.name = name;
      }

      await customerService.newsletterSignup(data);
      
      setMessage({ 
        type: 'success', 
        text: 'Successfully subscribed to newsletter!' 
      });
      
      // Clear form
      setEmail('');
      setName('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-signup">
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="newsletter-input"
          disabled={loading}
        />
        
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="newsletter-input"
          required
          disabled={loading}
        />
        
        <button 
          type="submit" 
          className="newsletter-button"
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message.text && (
        <p className={`newsletter-message ${message.type}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}

export default NewsletterSignup;
