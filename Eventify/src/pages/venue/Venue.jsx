import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Venue.css";
import BookingComponent from "../../components/Booking/BookingComponent";
import VenueData from "../../Context/VenueData";


const img = [
  { image: "https://imgs.search.brave.com/qHT_4VT_JczDPYoiOxIpRM-EkGRl7IpbUvFYv-_Z2P4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cm15aW5kaWEu/Y29tL2Jsb2cvL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L0x1eHVyeS1XZWRk/aW5nLURlc3RpbmF0/aW9uLmpwZw" },
  { image: "https://imgs.search.brave.com/RQs7pmPkm5JdP9DaWb8p9lvrlTFC-kzmICELZ4A3Cb4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cm15aW5kaWEu/Y29tL2Jsb2cvL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L1BhbGFjZS1Hcm91/bmQuanBn" },
  { image: "https://imgs.search.brave.com/4WGknjsYSwNrmDC3M32UzQvB3k2aSLvRWqUB9FaVNU0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cm15aW5kaWEu/Y29tL2Jsb2cvL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L0xhbGl0LUxheG1p/LVZpbGFzLmpwZw" },
  { image: "https://imgs.search.brave.com/vWYGqCZo9gTDB5GKCBoi8PAZ2arzZGZCbNyngQJMr-E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cm15aW5kaWEu/Y29tL2Jsb2cvL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L0xlZWxhLVBhbGFj/ZS5qcGc" },
  { image: "https://imgs.search.brave.com/pRWsSaU4g7LLaVNlWSnqDzEYAmwyrd0YtwiskdvP5e4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cm15aW5kaWEu/Y29tL2Jsb2cvL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L0ZhdGVoLVByYWth/c2gtUGFsYWNlLmpw/Zw" },
  { image: "https://imgs.search.brave.com/w053pDeCrKjRFGqBx_uj65XEiijWyeh3M4LYhYULIKg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZWFzeXdlZGRp/bmdzLmNvbS9maWxl/cy8yMDIxLzEwLzMw/MTAzMDQwL0RyYXBl/cnMtSGFsbC1XZWRk/aW5nLVZlbnVlLUxp/dmVyeS1IYS04OTB4/NTY3LmpwZw" },
  { image: "https://imgs.search.brave.com/avDbqjw0-YryMFWl3DUE5SLDK88vHE5se5E0ZiXGnB8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnRo/ZXdlZGRpbmd2b3dz/Zy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDQvRmFp/cm1vbnQtSmFpcHVy/LUluZGlhLVdlZGRp/bmctVmVudWVzLmpw/Zz9yZXNpemU9OTYw/LDQwOCZzc2w9MQ" },
  { image: "https://imgs.search.brave.com/GUkKux1UtTCRSkfB5CBB0KZb7ge6HMIf0-0obSzPsWo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZWFzeXdlZGRp/bmdzLmNvbS9maWxl/cy8yMDIxLzEwLzI5/MjMzOTQxL211c2V1/bS1vZi1sb25kb24t/aW5kaWFuLXdlZGRp/bmctdmVudWVzLWxv/bmRvbi5qcGc" },
  { image: "https://imgs.search.brave.com/F4GAVm48XL5kdXQ5D2CmnkWx9w3f7LgkbFTHonvfr2g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cm15aW5kaWEu/Y29tL2Jsb2cvL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L0RldmktR2FyaC1i/eS1MZWJ1YS5qcGc" },
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
          contactNumber: "7421458545",
          rating: venue.Rating || 4,
          reviews: venue.Reviews || 235,
          customerReviews: venue.CustomerReviews || [],
          views: venue.Views || 0,
          rooms: venue.Rooms || "20+",
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
    type: ["Veg", "Both"],
    budget: ["150.50", "300.00", "500.00", "800.00", "1000.00"],

    region: ["Delhi", "Mumbai", "Bhopal", "Kolkata", "Chennai"],
    occasion: ["Corporate", "Birthday", "Engagement", "Wedding"],
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
            <img src={img[venue.id - 1].image} alt={venue.name} className="venue-card__image" />
            <div className="venue-card-detail">
              <h3 className="venue-card__name">{venue.name}</h3>
              <p className="venue-card__description">
                Location: {venue.location} <br />
                Address: {venue.address}
              </p>
              <p className="venue-card__description">Guest Capacity: {venue.guestCapacity}</p>
              <p className="venue-card__description">Price per plate: {venue.budget}</p>
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
