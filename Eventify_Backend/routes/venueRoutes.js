// routes/venueRoutes.js
import express from 'express';
import {
    createVenue,
    listVenues,
    getVenueDetails,
    updateVenueDetails,
    deleteVenue
} from '../controllers/venueController.js';
import { authenticateToken, authorizeAdminOrOwner } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/venues', listVenues);

// Single photo upload (field name must match frontend/Postman: 'Photos')
router.post('/venues', authenticateToken, authorizeAdminOrOwner, upload.single('Photos'), createVenue);

router.get('/venues/:id', getVenueDetails);

router.put('/venues/:id', authenticateToken, authorizeAdminOrOwner, upload.single('Photos'), updateVenueDetails);

router.delete('/venues/:id', authenticateToken, authorizeAdminOrOwner, deleteVenue);

router.post('/test-upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('Upload success');
  });
  

export default router;
