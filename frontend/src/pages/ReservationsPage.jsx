/**
 * Reservations Page Component
 * Allows customers to make table reservations
 */
import { useState } from 'react';
import ReservationForm from '../components/ReservationForm';
import { RESTAURANT_INFO } from '../utils/constants';
import '../styles/Reservations.css';

function ReservationsPage() {
  const [reservationSuccess, setReservationSuccess] = useState(null);

  const handleReservationSuccess = (reservation) => {
    setReservationSuccess(reservation);
    // Scroll to success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="reservations-page">
      <div className="reservations-hero">
        <div className="container">
          <h1 className="reservations-title">Make a Reservation</h1>
          <p className="reservations-subtitle">
            Reserve your table and experience unforgettable dining at{' '}
            {RESTAURANT_INFO.name}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="reservations-content">
          {reservationSuccess ? (
            <div className="reservation-success-container">
              <div className="reservation-success">
                <div className="success-icon">✓</div>
                <h2>Reservation Confirmed!</h2>
                <p className="success-message">
                  Thank you, {reservationSuccess.customer.name}! Your
                  reservation has been confirmed.
                </p>

                <div className="reservation-details">
                  <h3>Reservation Details:</h3>
                  <div className="detail-row">
                    <span className="detail-label">Date & Time:</span>
                    <span className="detail-value">
                      {new Date(reservationSuccess.start_time).toLocaleString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        }
                      )}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Party Size:</span>
                    <span className="detail-value">
                      {reservationSuccess.guest_count} guests
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Table:</span>
                    <span className="detail-value">
                      Table {reservationSuccess.table.table_id} (Capacity:{' '}
                      {reservationSuccess.table.capacity})
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Confirmation:</span>
                    <span className="detail-value">
                      #{reservationSuccess.reservation_id}
                    </span>
                  </div>
                </div>

                <p className="confirmation-note">
                  A confirmation email has been sent to{' '}
                  <strong>{reservationSuccess.customer.email}</strong>
                </p>

                <button
                  className="btn btn-secondary"
                  onClick={() => setReservationSuccess(null)}
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="reservation-info">
                <div className="info-card">
                  <h3>📍 Location</h3>
                  <p>{RESTAURANT_INFO.address}</p>
                </div>

                <div className="info-card">
                  <h3>📞 Contact</h3>
                  <p>{RESTAURANT_INFO.phone}</p>
                </div>

                <div className="info-card">
                  <h3>🕐 Hours</h3>
                  <p>{RESTAURANT_INFO.hours.weekday}</p>
                  <p>{RESTAURANT_INFO.hours.sunday}</p>
                </div>
              </div>

              <div className="reservation-form-container">
                <h2>Reservation Details</h2>
                <ReservationForm onSuccess={handleReservationSuccess} />
              </div>

              <div className="reservation-notes">
                <h3>Important Information</h3>
                <ul>
                  <li>Reservations must be made at least 1 hour in advance</li>
                  <li>Each reservation is for 2 hours</li>
                  <li>Party size: 1-8 guests</li>
                  <li>
                    Please arrive within 15 minutes of your reservation time
                  </li>
                  <li>For parties larger than 8, please call us directly</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationsPage;
