import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import for React Router v6
import "./BookingComponent.css"; // Add styling as needed

const BookingComponent = ({ venue, onClose }) => {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState(""); // Event type state
  const [venueAdded, setVenueAdded] = useState(false); // State for confirmation
  const [paymentProcessing, setPaymentProcessing] = useState(false); // State for dummy payment
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // State for booking confirmation

  // Simulating user login state (replace with your actual login logic)
  const isLoggedIn = true; // Set this to true if user is logged in
  const navigate = useNavigate(); // Use `useNavigate` for React Router v6 navigation

  // Function to validate date input (must be at least tomorrow's date)
  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if user is logged in
    if (isLoggedIn) {
      setPaymentProcessing(true); // Simulate payment gateway processing
      setTimeout(() => {
        setPaymentProcessing(false); // Stop payment processing
        setBookingConfirmed(true); // Show booking confirmation
      }, 2000); // Simulate payment processing time (2 seconds)
    } else {
      // Redirect to Register Page if not logged in
      navigate("/register");
    }

    setVenueAdded(true); // Confirm venue added to cart
  };

  if (venueAdded && !paymentProcessing && !bookingConfirmed) {
    return (
      <div className="booking-popup">
        <h2>Venue Added to Cart</h2>
        <p>
          {venue.name} for {eventType} on {date} for {guests} guests has been
          added to your cart!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  if (paymentProcessing) {
    return (
      <div className="booking-popup">
        <h2>Processing Payment</h2>
        <p>Please wait while we process your payment...</p>
        <div className="payment-loading">Processing...</div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="booking-popup">
        <h2>Booking Confirmation</h2>
        <p>
          Your booking for {venue.name} on {date} for {guests} guests has been
          successfully confirmed!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="booking-popup">
      <h2>Book {venue.name}</h2>
      <form onSubmit={handleAddToCart}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            min={minDate} // Set minimum date to tomorrow
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="event-t">
          <label>Event Type:</label>
          <select
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select an event type
            </option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Pool Party">Pool Party</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>
        <div>
          <label>Number of Guests:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="20"
            required
          />
        </div>
        <div>
          <p>Total Price {venue.budget * guests}</p>
        </div>
        <button type="submit">Pay Now</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BookingComponent;
