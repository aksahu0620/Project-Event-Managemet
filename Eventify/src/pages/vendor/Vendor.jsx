import React, { useState } from "react";
import "./Vendor.css";
import VendorData from "../../Context/VendorData";
import BookingVendor from "../../components/BookingVendor/BookingVendor";

const VendorSearch = ({ userLoggedIn }) => {
  // State for managing search input and filter selections
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null); // State to manage selected vendor
  const [showBooking, setShowBooking] = useState(false); // State to control booking visibility

  const handleBookNow = (vendor) => {
    if (userLoggedIn) {
      setSelectedVendor(vendor);
      setShowBooking(true); // Show the booking component
    } else {
      alert("Please log in to book this vendor.");
    }
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedVendor(null); // Reset selected vendor
  };

  // Dummy data for filters
  const filterOptions = {
    price: [
      { label: "Under 40000", range: [0, 40000] },
      { label: "40001 to 60000", range: [40001, 60000] },
      { label: "60001 to 70000", range: [60001, 70000] },
      { label: "70001 to 90000", range: [70001, 90000] },
    ],
    location: ["MP Nagar", "Lalghati", "Bairagarh", "Kolar"],
    serviceType: ["Catering", "Decoration", "Photography", "Entertainment"],
    rating: [1, 2, 3, 4, 5],
  };

  // Filter vendors based on search term and selected filters
  const filteredVendors = VendorData.filter((vendor) => {
    const matchesSearchTerm =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice = selectedPrice
      ? vendor.priceRange >= selectedPrice.range[0] &&
        vendor.priceRange <= selectedPrice.range[1]
      : true;

    const matchesLocation = selectedLocation
      ? vendor.location === selectedLocation
      : true;

    const matchesServiceType = selectedServiceType
      ? vendor.serviceType === selectedServiceType
      : true;

    const matchesRating = selectedRating
      ? vendor.rating === selectedRating
      : true;

    return (
      matchesSearchTerm &&
      matchesPrice &&
      matchesLocation &&
      matchesServiceType &&
      matchesRating
    );
  });

  return (
    <div className="vendor-search">
      <aside className="vendor-search__filters">
        <div className="vendor-search__header">
          <input
            type="text"
            placeholder="Search your vendors"
            className="vendor-search__input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-card">
          <h3 className="filter-card__title">Filter Your Search</h3>

          {/* By Price Range */}
          <div className="filter-card__option filter-card__option--price">
            <h4 className="filter-card__option-title">By Price Range</h4>
            {filterOptions.price.map((price) => (
              <label className="filter-card__option-label" key={price.label}>
                <input
                  type="radio"
                  name="price"
                  className="filter-card__option-input"
                  onChange={() => setSelectedPrice(price)}
                  checked={selectedPrice === price}
                />{" "}
                <span>{price.label}</span>
              </label>
            ))}
          </div>

          {/* By Location */}
          <div className="filter-card__option">
            <h4 className="filter-card__option-title">By Location</h4>
            {filterOptions.location.map((location) => (
              <label className="filter-card__option-label" key={location}>
                <input
                  type="radio"
                  name="location"
                  className="filter-card__option-input"
                  onChange={() => setSelectedLocation(location)}
                  checked={selectedLocation === location}
                />{" "}
                <span>{location}</span>
              </label>
            ))}
          </div>

          {/* By Service Type */}
          <div className="filter-card__option">
            <h4 className="filter-card__option-title">By Service Type</h4>
            {filterOptions.serviceType.map((service) => (
              <label className="filter-card__option-label" key={service}>
                <input
                  type="radio"
                  name="serviceType"
                  className="filter-card__option-input"
                  onChange={() => setSelectedServiceType(service)}
                  checked={selectedServiceType === service}
                />{" "}
                <span>{service}</span>
              </label>
            ))}
          </div>

          {/* By Rating */}
          <div className="filter-card__option">
            <h4 className="filter-card__option-title">By Rating</h4>
            {filterOptions.rating.map((rating) => (
              <label className="filter-card__option-label" key={rating}>
                <input
                  type="radio"
                  name="rating"
                  className="filter-card__option-input"
                  onChange={() => setSelectedRating(rating)}
                  checked={selectedRating === rating}
                />{" "}
                <span>
                  {rating} Star{rating > 1 ? "s" : ""}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <main className="vendor-search__results">
        {filteredVendors.map((vendor) => (
          <div className="vendor-card" key={vendor.id}>
            <img
              src={vendor.images[0]}
              alt={vendor.name}
              className="vendor-card__image"
            />
            <div className="vendor-card-detail">
              <h3 className="vendor-card__name">{vendor.name}</h3>
              <p className="vendor-card__description">
                Location: {vendor.location} <br />
                Service Type: {vendor.serviceType}
              </p>
              <p className="vendor-card__description">
                Price Range: {vendor.priceRange}
              </p>
              <p className="vendor-card__description">
                Rating: {vendor.rating}⭐ ({vendor.reviews} Reviews)
              </p>
              <p className="vendor-card__description">{vendor.description}</p>
              <div className="vendor-card__reviews">
                <h4>Customer Reviews:</h4>
                {vendor.customerReviews.map((review, index) => (
                  <p key={index}>
                    <strong>{review.name}:</strong> {review.review}
                  </p>
                ))}
              </div>

              <form className="vendor-card__form">
                <button
                  className="vendor-card__book-btn"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default form submission
                    handleBookNow(vendor);
                  }}
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        ))}
      </main>

      {/* Render BookingComponent as a Popup */}
      {showBooking && selectedVendor && (
        <BookingVendor vendor={selectedVendor} onClose={handleCloseBooking} />
      )}
    </div>
  );
};

export default VendorSearch;
