import express, { Request, Response, Router } from 'express'; // Import express and types for Request and Response
import { priceConversion } from '../controllers/price_converter'; // Import priceConversion function from controller

// Create a router instance
const router: Router = express.Router();

// Define route to convert price
router.post('/convert', (req: Request, res: Response) => {
    priceConversion(req, res);
});

export default router; // Export the router
