import React, { useState } from "react";
import "./List.css";
import axios from "axios";

const BusinessForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    ServiceType: "",
    ServiceName: "",
    ServiceArea: "",
    Price: "",
    Name: "",
    Capacity: "",
    PricePerPlate: "",
    Description: "",
    City: "",
    Address: "",
    BestForEventTypes: "",
    FoodType: "",
    Amenities: "",
    Website: "",
    Twitter: "",
    Instagram: "",
    Photos: [],
    Images: [],
  });

  const handleServiceSelection = (e) => {
    setSelectedService(e.target.value);
    setFormData({
      ServiceType: "",
      ServiceName: "",
      ServiceArea: "",
      Price: "",
      Name: "",
      Capacity: "",
      PricePerPlate: "",
      Description: "",
      City: "",
      Address: "",
      BestForEventTypes: "",
      FoodType: "",
      Amenities: "",
      Website: "",
      Twitter: "",
      Instagram: "",
      Photos: [],
      Images: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    const url =
      selectedService === "venue"
        ? "http://localhost:5000/api/venues"
        : "http://localhost:5000/api/services";

    try {
      const data = new FormData();

      if (selectedService === "venue") {
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "Photos" && key !== "Images") {
            data.append(key, value);
          }
        });

        for (let i = 0; i < formData.Photos.length; i++) {
          data.append("Photos", formData.Photos[i]);
        }
      } else if (selectedService === "vendor") {
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "Photos" && key !== "Images") {
            data.append(key, value);
          }
        });

        for (let i = 0; i < formData.Images.length; i++) {
          data.append("Images", formData.Images[i]);
        }
      }

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  const services = [
    "Catering", "Photography", "Videography", "Music Band", "Decoration", "Event Planning",
    "Transportation", "Security Services", "Lighting Services", "Sound Equipment Rental",
    "Venue Booking", "Makeup Artist", "Florist", "Baker", "Rentals", "Bartending", "DJ Services",
    "MC Services", "Graphic Design", "Social Media Management",
  ];

  return (
    <div className="business-form__container">
      <h2 className="business-form__heading">Which service are you interested in?</h2>
      <div className="business-form__service-options">
        <div className="business-form__radio-group">
          <input
            type="radio"
            id="venue"
            value="venue"
            name="service"
            checked={selectedService === "venue"}
            onChange={handleServiceSelection}
          />
          <label htmlFor="venue">List your Venue</label>
        </div>
        <div className="business-form__radio-group">
          <input
            type="radio"
            id="vendor"
            value="vendor"
            name="service"
            checked={selectedService === "vendor"}
            onChange={handleServiceSelection}
          />
          <label htmlFor="vendor">List as a Vendor</label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="business-form__service-form">
        {selectedService === "venue" && (
          <>
            <div className="business-form__card">
              <h3 className="business-form__card-heading">Venue Details</h3>
              <div className="business-form__input-group">
                <label>Venue Name *</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Capacity *</label>
                <input
                  type="number"
                  name="Capacity"
                  value={formData.Capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Price per Plate *</label>
                <input
                  type="number"
                  name="PricePerPlate"
                  value={formData.PricePerPlate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Description *</label>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>City *</label>
                <input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Best for Event Types *</label>
                <input
                  type="text"
                  name="BestForEventTypes"
                  value={formData.BestForEventTypes}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Food Type *</label>
                <input
                  type="text"
                  name="FoodType"
                  value={formData.FoodType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Amenities *</label>
                <input
                  type="text"
                  name="Amenities"
                  value={formData.Amenities}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Website</label>
                <input
                  type="text"
                  name="Website"
                  value={formData.Website}
                  onChange={handleInputChange}
                />
              </div>
              <div className="business-form__input-group">
                <label>Twitter</label>
                <input
                  type="text"
                  name="Twitter"
                  value={formData.Twitter}
                  onChange={handleInputChange}
                />
              </div>
              <div className="business-form__input-group">
                <label>Instagram</label>
                <input
                  type="text"
                  name="Instagram"
                  value={formData.Instagram}
                  onChange={handleInputChange}
                />
              </div>
              <div className="business-form__input-group">
                <label>Upload Venue Images</label>
                <input
                  type="file"
                  name="Photos"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </>
        )}

        {selectedService === "vendor" && (
          <>
            <div className="business-form__card">
              <h3 className="business-form__card-heading">Vendor Details</h3>
              <div className="business-form__input-group">
                <label>Service Type *</label>
                <select
                  name="ServiceType"
                  value={formData.ServiceType}
                  onChange={handleInputChange}
                  required
                >
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div className="business-form__input-group">
                <label>Service Name *</label>
                <input
                  type="text"
                  name="ServiceName"
                  value={formData.ServiceName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Service Area *</label>
                <input
                  type="text"
                  name="ServiceArea"
                  value={formData.ServiceArea}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Upload Service Images</label>
                <input
                  type="file"
                  name="Images"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </>
        )}
        <button type="submit" className="business-form__submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;
