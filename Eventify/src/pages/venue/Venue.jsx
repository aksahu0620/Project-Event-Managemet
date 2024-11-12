import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Venue.css";
import BookingComponent from "../../components/Booking/BookingComponent";

const VenueSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [venues, setVenues] = useState([]); // State to hold fetched venues

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/venues");
        const data = await response.json();
        
        // Transform data to match component fields and set default values
        const transformedData = data.map(venue => ({
          id: venue.VenueID,
          name: venue.Name || "Unnamed Venue",
          address: venue.Address || "No Address Provided",
          city: venue.City || "Unknown City",
          guestCapacity: venue.Capacity || "N/A",
          type: venue.FoodType || "Unknown Type",
          budget: venue.PricePerPlate || "Unknown Price",
          location: venue.City || "Unknown Location",
          occasion: venue.BestForEventTypes || "General",
          description: venue.Description || "No Description Available",
          amenities: venue.Amenities ? venue.Amenities.split(", ") : ["No Amenities"],
          images: venue.Photos ? venue.Photos.split(",") : ["placeholder.jpg"],
          contactNumber: "Not Provided",
          rating: venue.Rating || 0,
          reviews: venue.Reviews || 0,
          customerReviews: venue.CustomerReviews || [],
          views: venue.Views || 0,
          rooms: venue.Rooms || 0,
          alcoholServed: venue.AlcoholServed || "No",
        }));
        
        setVenues(transformedData);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  const handleBookNow = (venue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book a venue.");
      navigate("/signin");
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
    budget: ["Under 400", "401 to 600", "601 to 800", "801 to 1000", "1001 to 1200"],
    region: ["Bairagarh", "Lalghati", "Kolar", "Minal", "MP Nagar"],
    occasion: ["Family Get Together", "Birthday Party", "Engagement", "Wedding"],
  };

  const filteredVenues = venues.filter((venue) => {
    const matchesSearchTerm =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType ? venue.type === selectedType : true;
    const matchesBudget = selectedBudget ? venue.budget === selectedBudget : true;
    const matchesRegion = selectedRegion ? venue.location === selectedRegion : true;
    const matchesOccasion = selectedOccasion ? venue.occasion.includes(selectedOccasion) : true;

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
            <img src={venue.images[0]} alt={venue.name} className="venue-card__image" />
            <div className="venue-card-detail">
              <h3 className="venue-card__name">{venue.name}</h3>
              <p className="venue-card__description">
                Location: {venue.location} <br />
                Address: {venue.address}
              </p>
              <p className="venue-card__description">Guest Capacity: {venue.guestCapacity}</p>
              <p className="venue-card__description">Veg Price: {venue.budget}</p>
              <p className="venue-card__description">
                Rooms: {venue.rooms} <br />
                Alcohol Served: {venue.alcoholServed}
              </p>
              <p className="venue-card__description_ratting">
                Rating: {venue.rating}⭐ ({venue.reviews} Reviews)
              </p>
              <p className="venue-card__description">
                Type: {venue.type} <br />
                Occasion: {venue.occasion}
              </p>
              <p className="venue-card__description">{venue.description}</p>
              <p className="venue-card__description">
                Amenities: {venue.amenities.join(", ")}
              </p>
              <p className="venue-card__description">Contact Number: {venue.contactNumber}</p>
              <button
                className="venue-card__book-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookNow(venue);
                }}
              >
                Book Now
              </button>
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
