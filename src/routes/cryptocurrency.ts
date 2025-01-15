import express, { Request, Response, Router } from 'express'; // Import express and types for Request and Response
import { getCryptoList } from '../controllers/cryptocurrency'; // Import getCryptoList function from controller

// Create a router instance
const router: Router = express.Router();

// Define route to update cryptocurrency data
router.get('/update', (req: Request, res: Response) => {
    getCryptoList(req, res);
});

export default router; // Export the router
