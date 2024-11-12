import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Venue.css";
import VenueData from "../../Context/VenueData";
import BookingComponent from "../../components/Booking/BookingComponent";

const VenueSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleBookNow = (venue) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to book a venue.");
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    setSelectedVenue(venue);
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedVenue(null);
  };

  const filterOptions = {
    type: ["Pure Veg", "Veg & NonVeg Both"],
    budget: [
      "Under 400",
      "401 to 600",
      "601 to 800",
      "801 to 1000",
      "1001 to 1200",
    ],
    region: ["Bairagarh", "Lalghati", "Kolar", "Minal", "MP Nagar"],
    occasion: [
      "Family Get Together",
      "Birthday Party",
      "Engagement",
      "Wedding",
    ],
  };

  const filteredVenues = VenueData.filter((venue) => {
    const matchesSearchTerm =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType ? venue.type === selectedType : true;
    const matchesBudget = selectedBudget
      ? venue.budget === selectedBudget
      : true;
    const matchesRegion = selectedRegion
      ? venue.location === selectedRegion
      : true;
    const matchesOccasion = selectedOccasion
      ? venue.occasion === selectedOccasion
      : true;

    return (
      matchesSearchTerm &&
      matchesType &&
      matchesBudget &&
      matchesRegion &&
      matchesOccasion
    );
  });

  return (
    <div className="venue-search">
      <aside className="venue-search__filters">
        <div className="venue-search__header">
          <input
            type="text"
            placeholder="Search your venues"
            className="venue-search__input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-card">
          <h3 className="filter-card__title">Filter Your Search</h3>
          <div className="filter-card__option">
            <h4 className="filter-card__option-title">By Type</h4>
            {filterOptions.type.map((type) => (
              <label className="filter-card__option-label" key={type}>
                <input
                  type="radio"
                  name="type"
                  className="filter-card__option-input"
                  onChange={() => setSelectedType(type)}
                  checked={selectedType === type}
                />{" "}
                <span>{type}</span>
              </label>
            ))}
          </div>
          <div className="filter-card__option filter-card__option--budget">
            <h4 className="filter-card__option-title">By Budget Range</h4>
            <div className="filter-card__budget-card">
              <div className="filter-card__budget-scroll">
                {filterOptions.budget.map((range) => (
                  <label className="filter-card__option-label" key={range}>
                    <input
                      type="radio"
                      name="budget"
                      className="filter-card__option-input"
                      onChange={() => setSelectedBudget(range)}
                      checked={selectedBudget === range}
                    />{" "}
                    <span>{range} per plate</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="filter-card__option">
            <h4 className="filter-card__option-title">By Region</h4>
            {filterOptions.region.map((region) => (
              <label className="filter-card__option-label" key={region}>
                <input
                  type="radio"
                  name="region"
                  className="filter-card__option-input"
                  onChange={() => setSelectedRegion(region)}
                  checked={selectedRegion === region}
                />{" "}
                <span>{region}</span>
              </label>
            ))}
          </div>
          <div className="filter-card__option">
            <h4 className="filter-card__option-title">By Occasion</h4>
            {filterOptions.occasion.map((occasion) => (
              <label className="filter-card__option-label" key={occasion}>
                <input
                  type="radio"
                  name="occasion"
                  className="filter-card__option-input"
                  onChange={() => setSelectedOccasion(occasion)}
                  checked={selectedOccasion === occasion}
                />{" "}
                <span>{occasion}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
      <main className="venue-search__results">
        {filteredVenues.map((venue) => (
          <div className="venue-card2" key={venue.id}>
            <img
              src={venue.images[0]}
              alt={venue.name}
              className="venue-card__image"
            />
            <div className="venue-card-detail">
              <h3 className="venue-card__name">{venue.name}</h3>
              <p className="venue-card__description">
                Location: {venue.location} <br />
                Address: {venue.address}
              </p>
              <p className="venue-card__description">
                Guest Capacity: {venue.guestCapacity}
              </p>
              <p className="venue-card__description">
                Veg Price: {venue.vegPrice}
              </p>
              <p className="venue-card__description">
                Non-Veg Price: {venue.nonVegPrice}
              </p>
              <p className="venue-card__description">
                Rooms: {venue.rooms} <br />
                Alcohol Served: {venue.alcoholServed}
              </p>
              <p className="venue-card__description_ratting">
                Rating: {venue.rating}⭐ ({venue.reviews} Reviews)
              </p>
              <p className="venue-card__description">
                Views: {venue.views} <br />
                Type: {venue.type} <br />
                Occasion: {venue.occasion}
              </p>
              <p className="venue-card__description">{venue.description}</p>
              <p className="venue-card__description">
                Amenities: {venue.amenities.join(", ")}
              </p>
              <p className="venue-card__description">
                Contact Number: {venue.contactNumber}
              </p>
              <div className="venue-card__reviews">
                <h4>Customer Reviews:</h4>
                {venue.customerReviews.map((review, index) => (
                  <p key={index}>
                    <strong>{review.name}:</strong> {review.review}
                  </p>
                ))}
              </div>
              <form className="venue-card__form">
                <button
                  className="venue-card__book-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBookNow(venue);
                  }}
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        ))}
      </main>
      {showBooking && selectedVenue && (
        <BookingComponent venue={selectedVenue} onClose={handleCloseBooking} />
      )}
    </div>
  );
};

export default VenueSearch;
