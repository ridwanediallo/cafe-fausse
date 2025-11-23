import { useState } from 'react';
import PropTypes from 'prop-types';
import reservationService from '../services/reservationService';
import { RESERVATION_CONFIG } from '../utils/constants';

function ReservationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guest_count: 2,
    newsletter_signup: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user types
    if (error) setError(null);
  };

  const checkAvailability = async () => {
    if (!formData.date || !formData.time) {
      setAvailabilityMessage({
        type: 'error',
        text: 'Please select date and time',
      });
      return;
    }

    setCheckingAvailability(true);
    setAvailabilityMessage(null);

    try {
      const dateTime = `${formData.date}T${formData.time}:00`;
      const result = await reservationService.checkAvailability(
        dateTime,
        formData.guest_count
      );

      if (result.available) {
        setAvailabilityMessage({
          type: 'success',
          text: `✓ Tables available for ${formData.guest_count} guests`,
        });
      } else {
        setAvailabilityMessage({
          type: 'error',
          text: 'No tables available for this time. Please try a different time.',
        });
      }
    } catch (err) {
      setAvailabilityMessage({
        type: 'error',
        text: err.message || 'Unable to check availability',
      });
    } finally {
      setCheckingAvailability(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.date) {
      setError('Date is required');
      return false;
    }

    if (!formData.time) {
      setError('Time is required');
      return false;
    }

    if (
      formData.guest_count < RESERVATION_CONFIG.minGuests ||
      formData.guest_count > RESERVATION_CONFIG.maxGuests
    ) {
      setError(
        `Party size must be between ${RESERVATION_CONFIG.minGuests} and ${RESERVATION_CONFIG.maxGuests} guests`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Combine date and time into ISO format
      const startTime = `${formData.date}T${formData.time}:00`;

      const reservationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        start_time: startTime,
        guest_count: parseInt(formData.guest_count),
        newsletter_signup: formData.newsletter_signup,
      };

      const result = await reservationService.createReservation(
        reservationData
      );

      // Call success callback
      if (onSuccess) {
        onSuccess(result);
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guest_count: 2,
        newsletter_signup: false,
      });
      setAvailabilityMessage(null);
    } catch (err) {
      setError(
        err.message || 'Failed to create reservation. Please try again.'
      );
      console.error('Reservation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate time slots (5:00 PM to 11:00 PM in 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 17; hour <= 23; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 23 && minute === 30) break; // Stop at 11:00 PM
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString(
          'en-US',
          {
            hour: 'numeric',
            minute: '2-digit',
          }
        );
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      {error && <div className="message error">{error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="(202) 555-1234"
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            className="form-input"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time" className="form-label">
            Time *
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="form-select"
            required
            disabled={loading}
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="guest_count" className="form-label">
            Guests *
          </label>
          <select
            id="guest_count"
            name="guest_count"
            value={formData.guest_count}
            onChange={handleChange}
            className="form-select"
            required
            disabled={loading}
          >
            {Array.from(
              {
                length:
                  RESERVATION_CONFIG.maxGuests -
                  RESERVATION_CONFIG.minGuests +
                  1,
              },
              (_, i) => i + RESERVATION_CONFIG.minGuests
            ).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="availability-check">
        <button
          type="button"
          onClick={checkAvailability}
          className="btn btn-secondary"
          disabled={
            checkingAvailability || loading || !formData.date || !formData.time
          }
        >
          {checkingAvailability ? 'Checking...' : 'Check Availability'}
        </button>

        {availabilityMessage && (
          <div className={`availability-message ${availabilityMessage.type}`}>
            {availabilityMessage.text}
          </div>
        )}
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="newsletter_signup"
            checked={formData.newsletter_signup}
            onChange={handleChange}
            disabled={loading}
          />
          <span>
            Sign up for newsletter to receive updates and special offers
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary submit-button"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Complete Reservation'}
      </button>
    </form>
  );
}

ReservationForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default ReservationForm;
