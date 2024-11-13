import React, { useState } from "react";
import "./VendorDashboard.css";
import UserProfile from "../UserProfile/UserProfile";

const VendorDashboard = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Elite Catering Services",
      location: "Delhi",
      price: "10000",
      services: "Catering, Decoration",
      booked: true,
      bookingDate: "2024-11-14",
      capacity: 100,
      amenities: "Chairs, Tables, Decorations, Wait Staff",
    },
    {
      id: 2,
      name: "Luxury DJ Sound",
      location: "Mumbai",
      price: "5000",
      services: "DJ, Lighting",
      booked: false,
      bookingDate: "2024-11-14",
      capacity: 100,
      amenities: "Speakers, Lighting Equipment",
    },
  ]);

  const [isManageBookingsVisible, setIsManageBookingsVisible] = useState(true);
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    name: "",
    location: "",
    price: "",
    services: "",
    capacity: "",
    amenities: "",
  });

  const handleManageBookingsClick = () => {
    setIsManageBookingsVisible(true);
  };

  const handleManageServicesClick = () => {
    setIsManageBookingsVisible(false);
  };

  const handleDeleteService = (vendorId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setVendors(vendors.filter((vendor) => vendor.id !== vendorId));
      alert("Service deleted successfully.");
    }
  };

  const handleEditService = (vendor) => {
    setEditingVendorId(vendor.id);
    setEditedDetails({
      name: vendor.name,
      location: vendor.location,
      price: vendor.price,
      services: vendor.services,
      capacity: vendor.capacity,
      amenities: vendor.amenities,
    });
    // alert(Editing ${vendor.name}. Modify the details and save your changes.);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSaveEditedVendor = () => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === editingVendorId ? { ...vendor, ...editedDetails } : vendor
      )
    );
    setEditingVendorId(null);
    alert("Changes saved successfully.");
  };

  const handleCancelBooking = (vendorId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setVendors(
        vendors.map((vendor) =>
          vendor.id === vendorId
            ? { ...vendor, booked: false, bookingDate: "" }
            : vendor
        )
      );
      alert("Booking canceled successfully.");
    }
  };

  return (
    <div className="vendor-owner-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Services</div>
        <div className="navbar-user">Welcome, User</div>
        <button
          className="manage-bookings-btn"
          onClick={handleManageBookingsClick}
        >
          Manage Bookings
        </button>
        <button
          className="manage-services-btn"
          onClick={handleManageServicesClick}
        >
          Manage Services
        </button>
      </nav>
      <UserProfile />
      {/* Manage Bookings Section */}
      {isManageBookingsVisible && (
        <div className="manage-bookings-section">
          <h2>Manage Bookings</h2>
          <div className="vendor-cards">
            {vendors
              .filter((vendor) => vendor.booked)
              .map((vendor) => (
                <div className="vendor-card" key={vendor.id}>
                  <div className="vendor-info">
                    <h3>{vendor.name}</h3>
                    <p>
                      <strong>Location:</strong> {vendor.location}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{vendor.price}
                    </p>
                    <p>
                      <strong>Services:</strong> {vendor.services}
                    </p>
                    <p>
                      <strong>Booking Date:</strong> {vendor.bookingDate}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {vendor.capacity} people
                    </p>
                    <p>
                      <strong>Amenities:</strong> {vendor.amenities}
                    </p>
                  </div>
                  <div className="vendor-actions">
                    <button
                      onClick={() => handleCancelBooking(vendor.id)}
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

      {/* Manage Services Section */}
      {!isManageBookingsVisible && (
        <div className="manage-services-section">
          <h2>Manage Services</h2>
          <div className="vendor-cards">
            {vendors.map((vendor) => (
              <div className="vendor-card1" key={vendor.id}>
                <div className="vendor-info">
                  <h3>{vendor.name}</h3>
                  <p>
                    <strong>Location:</strong> {vendor.location}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{vendor.price}
                  </p>
                  <p>
                    <strong>Services:</strong> {vendor.services}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {vendor.capacity} people
                  </p>
                  <p>
                    <strong>Amenities:</strong> {vendor.amenities}
                  </p>
                </div>
                <div className="vendor-actions">
                  <button
                    onClick={() => handleDeleteService(vendor.id)}
                    className="delete-vendor-btn"
                  >
                    Delete Service
                  </button>
                  <button
                    onClick={() => handleEditService(vendor)}
                    className="edit-vendor-btn"
                  >
                    Edit Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Vendor Modal (Alert-style Form) */}
      {editingVendorId && (
        <div className="edit-vendor-modal">
          <div className="edit-vendor-form">
            <h3>Edit Service Details</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedDetails.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={editedDetails.location}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={editedDetails.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Services:
              <input
                type="text"
                name="services"
                value={editedDetails.services}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Capacity:
              <input
                type="number"
                name="capacity"
                value={editedDetails.capacity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Amenities:
              <input
                type="text"
                name="amenities"
                value={editedDetails.amenities}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleSaveEditedVendor}>Save Changes</button>
            <button onClick={() => setEditingVendorId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
