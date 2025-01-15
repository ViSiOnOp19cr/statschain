import express, { Request, Response, Router } from 'express'; // Import express and types for Request and Response
import { getCompanyData } from '../controllers/companydata'; // Import getCompanyData function from controller

// Create a router instance
const router: Router = express.Router();

// Define route to fetch company data
router.post('/companies', (req: Request, res: Response) => {
    getCompanyData(req, res);
});

export default router; // Export the router
