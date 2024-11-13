import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./BookingVendor.css"; // Add your styling as needed

const BookingVendor = ({ vendor, onClose }) => {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState(""); // Event type state
  const [vendorAdded, setVendorAdded] = useState(false); // State for confirmation
  const [paymentProcessing, setPaymentProcessing] = useState(false); // State for dummy payment
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // State for booking confirmation

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating user login state
  const navigate = useNavigate(); // React Router hook for redirection

  // Function to validate date input (must be at least tomorrow's date)
  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  // setIsLoggedIn(localStorage.getItem("token"))   


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

    setVendorAdded(true); // Confirm vendor added to cart
  };

  if (vendorAdded && !paymentProcessing && !bookingConfirmed) {
    return (
      <div className="booking-popup">
        <h2>Vendor Added to Cart</h2>
        <p>
          {vendor.name} for {eventType} on {date} for {guests} guests has been
          added to your cart!
        </p>
        <button onClick={onClose}>Close</button>
        <button onClick={handleAddToCart}>Proceed to Payment</button>
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
          Your booking for {vendor.name} on {date} for {guests} guests has been
          successfully confirmed!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="booking-popup">
      <h2>Book {vendor.name}</h2>
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

        <div>
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
          <label>Address:</label>
          <input type="input" required />
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
          <p>Total Price: ₹{vendor.priceRange}</p>
        </div>
        <button type="submit">Pay Now</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BookingVendor;
