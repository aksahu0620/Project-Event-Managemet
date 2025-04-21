import pool from '../config/db.js';
import {cloudinary} from '../config/cloudinary.js';

// Helper: Upload multiple images to Cloudinary
const uploadImages = async (images) => {
  const uploadPromises = images.map((image) =>
    cloudinary.uploader.upload(image.path, { folder: 'venues' })
  );
  const uploaded = await Promise.all(uploadPromises);
  return uploaded.map((file) => file.secure_url);
};

// Venue Registration
export const registerVenue = async (req, res) => {
  try {
    const {
      Name, Address, City, Capacity, Description,
      Website, Twitter, Instagram, OwnerID,
    } = req.body;

    const images = req.files?.venueImages || [];
    const uploadedImages = await uploadImages(images);

    const query = `
      INSERT INTO Venue 
      (OwnerID, Name, Address, City, Capacity, Description, Website, Twitter, Instagram, Photos) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(query, [
      OwnerID, Name, Address, City, Capacity, Description,
      Website, Twitter, Instagram, JSON.stringify(uploadedImages),
    ]);

    res.status(201).json({ message: 'Venue registered successfully.' });
  } catch (error) {
    console.error('Error registering venue:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Vendor Registration
export const registerVendor = async (req, res) => {
  try {
    const { VendorID, ServiceType, ServiceName, ServiceArea, Price } = req.body;

    const images = req.files?.vendorImages || [];
    const uploadedImages = await uploadImages(images);

    const query = `
      INSERT INTO Service 
      (VendorID, ServiceType, ServiceName, ServiceArea, Price, Images) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await pool.query(query, [
      VendorID, ServiceType, ServiceName, ServiceArea, Price, JSON.stringify(uploadedImages),
    ]);

    res.status(201).json({ message: 'Vendor service listed successfully.' });
  } catch (error) {
    console.error('Error registering vendor:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
