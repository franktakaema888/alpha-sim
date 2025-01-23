import { useState, useEffect } from 'react';
// import { useAuth } from '../context/useAuth';
import { useAuth0 } from "@auth0/auth0-react";

import AuthNavbar from '../components/common/AuthNavbar';
import AccountSummary from '../components/portfolio/AccountSummary';
import StockHoldings from '../components/portfolio/StockHoldings';
import HoldingsTable from '../components/portfolio/HoldingsTable';
// import axios from 'axios';
import api from '../services/api.service';


const Portfolio = () => {
  const { username } = useAuth0();
  const [portfolioData, setPortfolioData] = useState({
    accountBalance: 0,
    valueInvested: 0,
    holdings: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        
        // Get portfolio data
        const portfolioResponse = await api.get(`http://localhost:3000/portfolio/${username}`);
        const portfolioId = portfolioResponse.data.portfolioId;
        
        // Get holdings data using portfolioId
        const holdingsResponse = await api.get(`http://localhost:3000/portfolio/holdings/${portfolioId}`);

        // Calculate total invested value
        const totalInvested = holdingsResponse.data.reduce((sum, holding) => 
          sum + (holding.totalQuantity * holding.avgPrice), 0);

        setPortfolioData({
          accountBalance: portfolioResponse.data.accountBalance,
          valueInvested: totalInvested,
          holdings: holdingsResponse.data.map(holding => ({
            ...holding,
            currentValue: holding.totalQuantity * holding.currentPrice,
            gainLoss: ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100
          }))
        });
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchPortfolioData();
    }
  }, [username]);
  

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          {/* {username}&apos;s Portfolio */}
          {username} Portfolio

        </h1>        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Account Summary Section */}
          <AccountSummary 
            balance={portfolioData.accountBalance}
            invested={portfolioData.valueInvested}
          />
          
          {/* Stock Holdings Chart Section */}
          <StockHoldings 
            holdings={portfolioData.holdings}
          />
        </div>

        {/* Holdings Table Section */}
        <div className="bg-white rounded-lg shadow-lg">
          <h2 className="bg-gray-200 text-primary font-semibold p-4 rounded-t-lg">
            Stock Holding Information
          </h2>
          <HoldingsTable 
            holdings={portfolioData.holdings}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Portfolio;