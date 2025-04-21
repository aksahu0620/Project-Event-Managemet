// // controllers/venueController.js
// import pool from '../config/db.js';
// import * as Venue from '../models/Venue.js';
// import { getVenueById, updateVenue } from '../models/Venue.js';


// export const listVenues = async (req, res) => {
//     try {
//         const venues = await Venue.getAllVenues();
//         res.status(200).json(venues);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving venues', error });
//     }
// };

// export const createVenue = async (req, res) => {
//     try {
//         const {
//             Name, Address, City, Capacity, BestForEventTypes, PricePerPlate,
//             FoodType, Amenities, Status, Description, Website, Twitter, Instagram
//         } = req.body;

//         const OwnerID = req.user.userId;

//         // Check required fields
//         if (!Name || !Address || !City) {
//             return res.status(400).json({ message: 'Name, Address, and City are required.' });
//         }

//         // Check file
//         if (!req.file || !req.file.path) {
//             return res.status(400).json({ message: 'Photo is required.' });
//         }

//         // Optional FoodType validation
//         const allowedFoodTypes = ['Veg', 'Non-Veg', 'Both'];
//         if (FoodType && !allowedFoodTypes.includes(FoodType)) {
//             return res.status(400).json({ message: 'Invalid FoodType selected.' });
//         }

//         const photoUrl = req.file.path;

//         const venueData = {
//             OwnerID,
//             Name,
//             Address,
//             City,
//             Capacity: Capacity || null,
//             BestForEventTypes: BestForEventTypes || null,
//             PricePerPlate: PricePerPlate || null,
//             FoodType: FoodType || null,
//             Amenities: Amenities || null,
//             Photos: JSON.stringify([photoUrl]),
//             Status: Status || 'Pending',
//             Description: Description || '',
//             Website: Website || '',
//             Twitter: Twitter || '',
//             Instagram: Instagram || ''
//         };

//         const venueId = await Venue.createVenue(venueData);
//         res.status(201).json({ message: 'Venue created successfully', venueId });
//     } catch (error) {
//         console.error('Error creating venue:', error);
//         res.status(500).json({ message: 'Error creating venue', error });
//     }
// };




// export const getVenueDetails = async (req, res) => {
//     try {
//         const venueId = req.params.id;
//         const venue = await getVenueById(venueId);

//         if (!venue) {
//             return res.status(404).json({ message: 'Venue not found' });
//         }

//         res.json(venue);
//     } catch (error) {
//         console.error('Error fetching venue details:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// export const updateVenueDetails = async (req, res) => {
//     try {
//         const venueId = req.params.id;
//         const { userId: ownerId } = req.user; // Use userId from req.user

//         const { FoodType } = req.body;

//         // ✅ Validate FoodType if it's provided in the update
//         if (FoodType) {
//             const allowedFoodTypes = ['Veg', 'Non-Veg', 'Both'];
//             if (!allowedFoodTypes.includes(FoodType)) {
//                 return res.status(400).json({ message: 'Invalid FoodType selected' });
//             }
//         }

//         const venueData = { ...req.body, OwnerID: ownerId };

//         const affectedRows = await updateVenue(venueId, venueData);

//         if (affectedRows === 0) {
//             return res.status(404).json({ message: 'Venue not found or you are not authorized to update this venue' });
//         }

//         res.json({ message: 'Venue updated successfully' });
//     } catch (error) {
//         console.error('Error updating venue:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


// export const deleteVenue = async (req, res) => {
//     const { id } = req.params;
//     const { role, userId } = req.user; // user info from authMiddleware

//     try {
//         // // Only allow deletion if the user is a Venue Owner or an Admin
//         // if (role !== 'Admin' && !(role === 'Service Provider' && type === 'Venue Owner')) {
//         //     return res.status(403).json({ message: 'Access denied: Only admins or venue owners can delete venues.' });
//         // }

//         // Check if the venue exists and belongs to the current user (if they are not an Admin)
//         const [venue] = await pool.query('SELECT * FROM Venue WHERE VenueID = ?', [id]);
//         if (venue.length === 0) {
//             return res.status(404).json({ message: 'Venue not found.' });
//         }

//         if (role !== 'Admin' && venue[0].OwnerID !== userId) {
//             return res.status(403).json({ message: 'Access denied: You can only delete your own venues.' });
//         }

//         // Delete the venue
//         await pool.query('DELETE FROM Venue WHERE VenueID = ?', [id]);
//         res.json({ message: 'Venue deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting venue:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };




// controllers/venueController.js
import pool from '../config/db.js';
import * as Venue from '../models/Venue.js';

export const listVenues = async (req, res) => {
    try {
        const venues = await Venue.getAllVenues();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving venues', error });
    }
};

export const createVenue = async (req, res) => {
    try {
        const {
            Name, Address, City, Capacity, BestForEventTypes, PricePerPlate,
            FoodType, Amenities, Status, Description, Website, Twitter, Instagram
        } = req.body;

        const OwnerID = req.user.userId;

        // Check required fields
        if (!Name || !Address || !City) {
            return res.status(400).json({ message: 'Name, Address, and City are required.' });
        }

        // Check file
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'Photo is required.' });
        }

        // Optional FoodType validation
        const allowedFoodTypes = ['Veg', 'Non-Veg', 'Both'];
        if (FoodType && !allowedFoodTypes.includes(FoodType)) {
            return res.status(400).json({ message: 'Invalid FoodType selected.' });
        }

        const photoUrl = req.file.path;

        const venueData = {
            OwnerID,
            Name,
            Address,
            City,
            Capacity: Capacity || null,
            BestForEventTypes: BestForEventTypes || null,
            PricePerPlate: PricePerPlate || null,
            FoodType: FoodType || null,
            Amenities: Amenities || null,
            Photos: JSON.stringify([photoUrl]),
            Status: Status || 'Pending',
            Description: Description || '',
            Website: Website || '',
            Twitter: Twitter || '',
            Instagram: Instagram || ''
        };

        const venueId = await Venue.createVenue(venueData);
        res.status(201).json({ message: 'Venue created successfully', venueId });
    } catch (error) {
        console.error('Error creating venue:', error);
        res.status(500).json({ message: 'Error creating venue', error });
    }
};

export const getVenueDetails = async (req, res) => {
    try {
        const venueId = req.params.id;
        const venue = await Venue.getVenueById(venueId);

        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }

        res.json(venue);
    } catch (error) {
        console.error('Error fetching venue details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateVenueDetails = async (req, res) => {
    try {
        const venueId = req.params.id;
        const { userId: ownerId } = req.user;

        const { FoodType } = req.body;

        // Validate FoodType if it's provided in the update
        if (FoodType) {
            const allowedFoodTypes = ['Veg', 'Non-Veg', 'Both'];
            if (!allowedFoodTypes.includes(FoodType)) {
                return res.status(400).json({ message: 'Invalid FoodType selected' });
            }
        }

        // Handle photo update if a new file is uploaded
        let updatedData = { ...req.body, OwnerID: ownerId };
        
        if (req.file && req.file.path) {
            // If there's an existing venue, get its current photos
            const existingVenue = await Venue.getVenueById(venueId);
            let currentPhotos = [];
            
            if (existingVenue && existingVenue.Photos) {
                try {
                    currentPhotos = JSON.parse(existingVenue.Photos);
                } catch (e) {
                    // Handle parsing error - initialize as empty array if needed
                    currentPhotos = [];
                }
            }
            
            // Add the new photo URL
            currentPhotos.push(req.file.path);
            updatedData.Photos = JSON.stringify(currentPhotos);
        }

        const affectedRows = await Venue.updateVenue(venueId, updatedData);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Venue not found or you are not authorized to update this venue' });
        }

        res.json({ message: 'Venue updated successfully' });
    } catch (error) {
        console.error('Error updating venue:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteVenue = async (req, res) => {
    const { id } = req.params;
    const { role, userId } = req.user; // user info from authMiddleware

    try {
        // Check if the venue exists and belongs to the current user (if they are not an Admin)
        const [venue] = await pool.query('SELECT * FROM Venue WHERE VenueID = ?', [id]);
        if (venue.length === 0) {
            return res.status(404).json({ message: 'Venue not found.' });
        }

        if (role !== 'Admin' && venue[0].OwnerID !== userId) {
            return res.status(403).json({ message: 'Access denied: You can only delete your own venues.' });
        }

        // Delete the venue
        await pool.query('DELETE FROM Venue WHERE VenueID = ?', [id]);
        res.json({ message: 'Venue deleted successfully' });
    } catch (error) {
        console.error('Error deleting venue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};