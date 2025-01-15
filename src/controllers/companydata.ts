import { Request, Response } from 'express';
import axios from 'axios';

export const getCompanyData = async (req: Request, res: Response): Promise<void> => {
    try {
      // Get the cryptocurrency ID from request parameters
      const { currency } = req.body;
  
      // Make a GET request to Coingecko's /companies/public_treasury API
      const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
      const companyData = response.data;
  
      // Extract company names from the 'companies' array in the response data
      const companyNames = companyData.companies.map((company: { name: string }) => company.name);
  
      res.status(200).json({ success: true, companyNames: companyNames });
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };