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

  const img = [
    { image: "https://imgs.search.brave.com/aSX7a-8ZXJpgfItN7eT-BVtfuLu04QqK6aqYjBG9SAg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4w/LndlZGRpbmd3aXJl/LmluL3ZlbmRvci8w/MTQ1LzNfMi82NDAv/anBnL2NhdGVyaW5n/LWJyb3duLXN1Z2Fy/LWNhdGVyaW5nLXNl/dHVwLTFfMTVfMzYw/MTQ1LTE2MDg2NjM2/Mzg4Mzc3Mi5qcGVn" },
    { image: "https://imgs.search.brave.com/RH8rKrIuG__6Jk6ETPkRh0fwwoDI5U5DdUB_5O2cHzI/rs:fit:500:0:0:0/g:ce/aHR0cDovL3d3dy5n/YWxhY2F0ZXJlcnMu/aW4vaW1hZ2VzL3Nl/cnZpY2VzLWNvcnBv/cmF0ZS5qcGc" },
    { image: "https://imgs.search.brave.com/wvCgazJH5YboKX1_Mv3ySevm71UDeZJhjZNhKk0oyQc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9qdWxp/YW5yaWJpbmlrd2Vk/ZGluZ3MuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzAy/L3RyYWRpdGlvbmFs/LWluZGlhLXdlZGRp/bmctMTAyNHg2ODMu/anBn" },
    { image: "https://imgs.search.brave.com/7VGGIOk8o1tNyL6O5eN2w-SugZH0yTJeL674BOq642k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMubWludGVkLmNv/bS9pbWFnZS91cGxv/YWQvZl9hdXRvLHFf/YXV0by9NaW50ZWRf/T25zaXRlX0Fzc2V0/cy8yMDIyL0xQL0lu/ZGlhbldlZGRpbmdU/cmFkaXRpb25zXzIy/MDgzMV9JbWFnZTAz/LmpwZw" },
    { image: "https://imgs.search.brave.com/lawf2GyZspx45y6p7XTjWFeaYWUGfMvPTUhwGMQZMC0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2RkL0FfZmFuY3lf/SW5kaWFuX3dlZGRp/bmdfdGFraW5nX3Bs/YWNlX2luX1B1ZHVj/aGVycnksX1RhbWls/X05hZHUsX0luZGlh/LmpwZw" },
    { image: "https://imgs.search.brave.com/RQLRX4DkkQsbmFZdHqrTOO1myPgsXpM0YWW05s6Anpc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YnJpZGVzLmNvbS90/aG1iL1JaMXVRd1pI/bk9FVEFONXJpSFpq/RWNJQzh2dz0vMTUw/MHgwL2ZpbHRlcnM6/bm9fdXBzY2FsZSgp/Om1heF9ieXRlcygx/NTAwMDApOnN0cmlw/X2ljYygpLzU0Mmgt/MTk5NTZjOWU3ODA4/NGRiZGFlYjY3MGMx/OWJiNDI0MzMtOWE3/OTQwMTIwYmNiNDli/Yzg5OTVmMDFiNGFm/MTAxOTMuanBn" },
    { image: "https://imgs.search.brave.com/BTUrI7WVtvPRDffDAzc2J30nwaYHdELDxmV7RnsYqfI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YnJpZGVzLmNvbS90/aG1iL184UjZkMVNs/TGRxLTJIemVfNGt3/eDZKdk1mRT0vMTUw/MHgwL2ZpbHRlcnM6/bm9fdXBzY2FsZSgp/Om1heF9ieXRlcygx/NTAwMDApOnN0cmlw/X2ljYygpL2luZGlh/bi13ZWRkaW5nLUpB/TUVTLVNDSFVMWkUt/MzlmZjJlZGJkYmFi/NDIwZWI0NDAzZTU5/NTY5OGZiOTcuanBn" },
    { image: "https://imgs.search.brave.com/Yv6P7B16ZpaQtwSQB_Q1sTrDnGaD46hxDijg06xFEjk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4w/LndlZGRpbmd3aXJl/LmluL3ZlbmRvci8z/MDMwLzNfMi82NDAv/anBnL2FtaXNoLXRo/YWtrYXItN280MjJ5/Zy1iODAtdW5zcGxh/c2hfMTVfMzgzMDMw/LTE3MDcwNDM3MzM2/MTEwMy5qcGVn" },
    { image: "https://example.com/image9.jpg" },
    { image: "https://example.com/image10.jpg" },
    { image: "https://example.com/image11.jpg" },
    { image: "https://example.com/image12.jpg" },
    { image: "https://example.com/image13.jpg" },
    { image: "https://example.com/image14.jpg" },
    { image: "https://example.com/image15.jpg" },
    { image: "https://example.com/image16.jpg" },
    { image: "https://example.com/image17.jpg" },
    { image: "https://example.com/image18.jpg" },
    { image: "https://example.com/image19.jpg" },
    { image: "https://example.com/image20.jpg" }
  ];

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
          rating: 4, // Default rating if not in response
          reviews: "160+", // Default number of reviews
          images: vendor.Images ? vendor.Images.split(",") : ["default.jpg"],
          customerReviews: ["Highly recommanded"], // Default empty array if no reviews
          status: vendor.Status || "Pending",
        }));

        setVendors(formattedData);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      }
    };

    fetchVendors();
  }, []);


  // const handleBookNow = (venue) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("Please log in to book a venue.");
  //     navigate("/signin");
  //     return;
  //   }
    
  const handleBookNow = (vendor) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book a venue.");
      navigate("/signin");
      return;
    }

    setSelectedVendor(vendor);
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedVendor(null);
  };

  const filterOptions = {
    price: [
      { label: "Under 1500", range: [0, 1500] },
      { label: "1500 to 3000", range: [1500, 3000] },
      { label: "3000 to 4000", range: [3000, 4000] },
      { label: "4000 to 5000", range: [4000, 5000] },
    ],
    location: ["Delhi", "Mumbai", "Kolkata", "Bhopal"],
    serviceType: ["Catering", "Decoration", "Photography", "Mahendi Artist"],
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
              src={img[vendor.id -1].image}
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
