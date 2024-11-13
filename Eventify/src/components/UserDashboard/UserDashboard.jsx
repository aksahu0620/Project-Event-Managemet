import React, { useState } from "react";
import "./UserDashboard.css";
import UserProfile from "../UserProfile/UserProfile";

const UserDashboard = ({ userName }) => {
  const [venues, setVenues] = useState([
    {
      name: "Royal banquet hall",
      date: "2024-11-14",
      occasion: "Wedding",
      guests: 100,
      budget: "50000",
      city: "Delhi",
      status: "Confirmed",
    },
    {
      name : "Green lawn",
      date: "2024-11-14",
      occasion: "Wedding",
      guests: 100,
      budget: "20000",
      city: "Mumbai",
      status: "Pending",
    },
  ]);

  const [vendors, setVendors] = useState([
    {
      name: "Delux catering",
      location: "Rohini, Delhi",
      startingPrice: "40000",
      services: "Photography, Videography",
    },
    {
      name: "Event photography",
      location: "South Delhi",
      startingPrice: "50000",
      services: "Catering, Decor",
    },
  ]);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(null);
  const [cancelType, setCancelType] = useState(""); // "venue" or "vendor"

  const handleCancelClick = (item, type) => {
    setCancelBooking(item);
    setCancelType(type);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    if (cancelType === "venue") {
      setVenues(venues.filter((venue) => venue.date !== cancelBooking.date));
    } else if (cancelType === "vendor") {
      setVendors(
        vendors.filter((vendor) => vendor.name !== cancelBooking.name)
      );
    }
    setShowCancelModal(false);
  };

  const handleCancelClose = () => {
    setShowCancelModal(false);
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Events</div>
        <div className="navbar-greeting">Welcome {userName || "User"}</div>
      </nav>

      {/* Headline */}
      <h1 className="dashboard-headline">User Dashboard</h1>
      <UserProfile />
      {/* Active Venues Card */}
      <div className="venues-card">
        <h2 className="card-title">Booked Venues</h2>
        <div className="venue-list">
          {venues.map((venue, index) => (
            <div className="venue-item" key={index}>
              <div className="venue-field">
                Name: <span>{venue.name}</span>
              </div>
              <div className="venue-field">
                Date: <span>{venue.date}</span>
              </div>
              <div className="venue-field">
                Occasion: <span>{venue.occasion}</span>
              </div>
              <div className="venue-field">
                Guests: <span>{venue.guests}</span>
              </div>
              <div className="venue-field">
                Budget: <span>{venue.budget}</span>
              </div>
              <div className="venue-field">
                City: <span>{venue.city}</span>
              </div>
              <div className="venue-actions">
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelClick(venue, "venue")}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Vendors Card */}
      <div className="vendors-card">
        <h2 className="card-title">Booked Vendors</h2>
        <div className="vendor-list">
          {vendors.map((vendor, index) => (
            <div className="vendor-item" key={index}>
              <p>
                <strong>Name:</strong> {vendor.name}
              </p>
              <p>
                <strong>Location:</strong> {vendor.location}
              </p>
              <p>
                <strong>Starting Price:</strong> {vendor.startingPrice}
              </p>
              <p>
                <strong>Services:</strong> {vendor.services}
              </p>
              <div className="vendor-actions">
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelClick(vendor, "vendor")}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="cancel-modal">
          <div className="cancel-confirmation">
            <h3>Are you sure you want to cancel the booking?</h3>
            <div className="cancel-actions">
              <button className="cancel-btn" onClick={handleCancelClose}>
                No
              </button>
              <button className="confirm-btn" onClick={handleCancelConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
