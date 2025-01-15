// Importing required modules
import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import schedule from 'node-schedule';

// Load environment variables
dotenv.config();

// Define port number
const PORT: number = parseInt(process.env.PORT || '4000', 10);

// Importing route modules
import cryptocurrencyRoute from './routes/cryptocurrency.route';
import priceConversionRoute from './routes/priceConversion.route';
import companyDataRoute from './routes/companyData.router';

// Importing database connection module
import dbConnect from './config/databaseConnection';

// Initialize express app
const app = express();

// Enable CORS
app.use(
  cors({
    origin: '*', // Allow requests from all origins
  })
);

// Middleware for parsing JSON
app.use(express.json());

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send("<h1>It's Nishant, The KoniX app is running!</h1>");
});

// Define routes
app.use('/cryptocurrency', cryptocurrencyRoute); // Route for cryptocurrency-related operations
app.use('/priceConversion', priceConversionRoute); // Route for price conversion
app.use('/companyData', companyDataRoute); // Route for fetching company data

// Schedule job to update cryptocurrency data every hour
schedule.scheduleJob('0 * * * *', async () => {
  try {
    // Make a GET request to update cryptocurrency data
    await axios.get(`http://localhost:${PORT}/cryptocurrency/update`);
    console.log('Cryptocurrency data updated successfully');
  } catch (error) {
    console.error('Error updating cryptocurrency data:', error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

// Connect to the database
dbConnect();

// Global error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// URL references for testing

// Get request to fetch cryptocurrency
// http://localhost:3005/cryptocurrency/update

// Post request to convert price
// http://localhost:3005/priceConversion/convert

// Post request to fetch company data
// http://localhost:3005/companyData/companies
