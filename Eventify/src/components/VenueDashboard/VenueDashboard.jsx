import React, { useState } from "react";
import "./VenueDashboard.css";
import UserProfile from "../UserProfile/UserProfile";

const VenueDashboard = () => {
  const [venues, setVenues] = useState([
    {
      id: 1,
      name: "Royal Wedding Venue",
      location: "Delhi",
      price: "50000",
      guests: 150,
      booked: true,
      bookingDate: "2024-11-14",
      capacity: 100,
      amenities: "Sound System, Projector, Stage, Parking",
    },
    {
      id: 2,
      name: "Sunset Banquet Hall",
      location: "Mumbai",
      price: "30000",
      guests: 300,
      booked: false,
      bookingDate: "2024-11-14",
      capacity: 150,
      amenities: "Wi-Fi, Air Conditioning, Dance Floor",
    },
    {
      id: 3,
      name: "City Lights Venue",
      location: "Bangalore",
      price: "45000",
      guests: 200,
      booked: true,
      bookingDate: "2024-11-14",
      capacity: 250,
      amenities: "Projector, Stage, Audio System",
    },
  ]);

  const [isManageBookingsVisible, setIsManageBookingsVisible] = useState(true);
  const [editingVenueId, setEditingVenueId] = useState(null);
  const [editedVenue, setEditedVenue] = useState({
    name: "",
    location: "",
    price: "",
    guests: "",
    capacity: "",
    amenities: "",
  });

  const handleManageBookingsClick = () => {
    setIsManageBookingsVisible(true);
  };

  const handleManageVenuesClick = () => {
    setIsManageBookingsVisible(false);
  };

  const handleCancelBooking = (venueId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel the booking for this venue?"
      )
    ) {
      setVenues(
        venues.map((venue) =>
          venue.id === venueId
            ? { ...venue, booked: false, bookingDate: "" }
            : venue
        )
      );
    }
  };

  const handleDeleteVenue = (venueId) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      setVenues(venues.filter((venue) => venue.id !== venueId));
    }
  };

  const handleEditVenue = (venueId) => {
    const venueToEdit = venues.find((venue) => venue.id === venueId);
    setEditingVenueId(venueId);
    setEditedVenue({
      name: venueToEdit.name,
      location: venueToEdit.location,
      price: venueToEdit.price,
      guests: venueToEdit.guests,
      capacity: venueToEdit.capacity,
      amenities: venueToEdit.amenities,
    });
  };

  const handleSaveEditedVenue = () => {
    setVenues(
      venues.map((venue) =>
        venue.id === editingVenueId ? { ...venue, ...editedVenue } : venue
      )
    );
    setEditingVenueId(null); // Close the editing form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVenue({ ...editedVenue, [name]: value });
  };

  return (
    <div className="venue-owner-dashboard">
      {/* Navbar */}

      <nav className="navbar">
        <div className="navbar-logo">Venues</div>
        <div className="navbar-user">Welcome User</div>
        <button
          className="manage-bookings-btn"
          onClick={handleManageBookingsClick}
        >
          Manage Bookings
        </button>
        <button className="manage-venues-btn" onClick={handleManageVenuesClick}>
          Manage Venues
        </button>
      </nav>
      <UserProfile />
      {/* Manage Bookings Section */}
      {isManageBookingsVisible && (
        <div className="manage-bookings-section">
          <h2>Manage Bookings</h2>
          <div className="venue-cards">
            {venues
              .filter(
                (venue) =>
                  venue.booked && new Date(venue.bookingDate) > new Date()
              )
              .map((venue) => (
                <div className="venue-card" key={venue.id}>
                  <div className="venue-info">
                    <h3>{venue.name}</h3>
                    <p>
                      <strong>Location:</strong> {venue.location}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{venue.price}
                    </p>
                    <p>
                      <strong>Guests:</strong> {venue.guests}
                    </p>
                    <p>
                      <strong>Booking Date:</strong> {venue.bookingDate}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {venue.capacity} people
                    </p>
                    <p>
                      <strong>Amenities:</strong> {venue.amenities}
                    </p>
                  </div>
                  <div className="venue-actions">
                    <button
                      onClick={() => handleCancelBooking(venue.id)}
                      className="cancel-booking-btn"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Manage Venues Section */}
      {!isManageBookingsVisible && (
        <div className="manage-venues-section">
          <h2>Manage Venues</h2>
          <div className="venue-cards">
            {venues.map((venue) => (
              <div className="venue-card" key={venue.id}>
                <div className="venue-info">
                  <h3>{venue.name}</h3>
                  <p>
                    <strong>Location:</strong> {venue.location}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{venue.price}
                  </p>
                  <p>
                    <strong>Guests:</strong> {venue.guests}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {venue.capacity} people
                  </p>
                  <p>
                    <strong>Amenities:</strong> {venue.amenities}
                  </p>
                </div>
                <div className="venue-actions">
                  <button
                    onClick={() => handleDeleteVenue(venue.id)}
                    className="delete-venue-btn"
                  >
                    Delete Venue
                  </button>
                  <button
                    onClick={() => handleEditVenue(venue.id)}
                    className="edit-venue-btn"
                  >
                    Edit Venue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Venue Form (Modal) */}
      {editingVenueId && (
        <div className="edit-venue-modal">
          <div className="edit-venue-form">
            <h3>Edit Venue Details</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedVenue.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={editedVenue.location}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={editedVenue.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Guests:
              <input
                type="number"
                name="guests"
                value={editedVenue.guests}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Capacity:
              <input
                type="number"
                name="capacity"
                value={editedVenue.capacity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Amenities:
              <input
                type="text"
                name="amenities"
                value={editedVenue.amenities}
                onChange={handleInputChange}
              />
            </label>
            <button className="fin-but" onClick={handleSaveEditedVenue}>
              Save Changes
            </button>
            <button className="fin-but" onClick={() => setEditingVenueId(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueDashboard;
