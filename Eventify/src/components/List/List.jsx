import React, { useState } from "react";
import "./List.css";
import axios from "axios";

const BusinessForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState(getInitialFormData());

  function getInitialFormData() {
    return {
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
    };
  }

  const handleServiceSelection = (e) => {
    setSelectedService(e.target.value);
    setFormData(getInitialFormData());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files }));
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

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "Photos" || key === "Images") return;
        data.append(key, value);
      });

      const imageKey = selectedService === "venue" ? "Photos" : "Images";
      const images = formData[imageKey];

      for (let i = 0; i < images.length; i++) {
        data.append(imageKey, images[i]);
      }

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert("Form submitted successfully!");
        setFormData(getInitialFormData());
        setSelectedService("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  const services = [
    "Catering", "Photography", "Videography", "Music Band", "Decoration",
    "Event Planning", "Transportation", "Security Services", "Lighting Services",
    "Sound Equipment Rental", "Venue Booking", "Makeup Artist", "Florist",
    "Baker", "Rentals", "Bartending", "DJ Services", "MC Services",
    "Graphic Design", "Social Media Management",
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
          <div className="business-form__card">
            <h3 className="business-form__card-heading">Venue Details</h3>
            {[
              ["Venue Name *", "Name"],
              ["Capacity *", "Capacity", "number"],
              ["Price per Plate", "PricePerPlate", "number"],
              ["Description", "Description", "textarea"],
              ["City *", "City"],
              ["Address *", "Address"],
              ["Best for Event Types", "BestForEventTypes"],
              ["Amenities", "Amenities"],
              ["Website", "Website"],
              ["Twitter", "Twitter"],
              ["Instagram", "Instagram"],
            ].map(([label, name, type = "text"]) => (
              <div className="business-form__input-group" key={name}>
                <label>{label}</label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required
                  />
                )}
              </div>
            ))}
            <div className="business-form__input-group">
              <label>Food Type</label>
              <select
                name="FoodType"
                value={formData.FoodType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Food Type</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Both">Both</option>
              </select>
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
        )}

        {selectedService === "vendor" && (
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
                <option value="">Select Service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            {[
              ["Service Name *", "ServiceName"],
              ["Service Area *", "ServiceArea"],
              ["Price *", "Price", "number"],
            ].map(([label, name, type = "text"]) => (
              <div className="business-form__input-group" key={name}>
                <label>{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
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
        )}

        {selectedService && (
          <button type="submit" className="business-form__submit-button">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default BusinessForm;
