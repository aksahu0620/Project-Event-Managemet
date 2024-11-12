import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Vendor.css";
import BookingVendor from "../../components/BookingVendor/BookingVendor";

const VendorSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [vendors, setVendors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API on component mount
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        const data = await response.json();
        
        // Transforming API data to fit required fields
        const formattedData = data.map(vendor => ({
          id: vendor.ServiceID,
          name: vendor.ServiceName,
          description: "Service provided by vendor",
          location: vendor.ServiceArea || "Unknown Location",
          serviceType: vendor.ServiceType || "General",
          priceRange: vendor.Price || "0.00",
          rating: 0, // Default rating if not in response
          reviews: 0, // Default number of reviews
          images: vendor.Images ? vendor.Images.split(",") : ["default.jpg"],
          customerReviews: [], // Default empty array if no reviews
          status: vendor.Status || "Pending",
        }));

        setVendors(formattedData);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      }
    };

    fetchVendors();
  }, []);

  const handleBookNow = (vendor) => {
    const token = localStorage.getItem("token");

    if (token) {
      setSelectedVendor(vendor);
      setShowBooking(true);
    } else {
      alert("Please log in to proceed with the booking.");
      navigate("/signin");
    }
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedVendor(null);
  };

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

  const filteredVendors = vendors.filter((vendor) => {
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

          {/* Price Filter */}
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

          {/* Location Filter */}
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

          {/* Service Type Filter */}
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

          {/* Rating Filter */}
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
                    e.preventDefault();
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

      {showBooking && selectedVendor && (
        <BookingVendor vendor={selectedVendor} onClose={handleCloseBooking} />
      )}
    </div>
  );
};

export default VendorSearch;
