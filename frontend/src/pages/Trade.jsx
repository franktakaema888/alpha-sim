import { useState, useEffect } from 'react';
// import { useAuth } from '../context/useAuth';
import { useAuth0 } from "@auth0/auth0-react";
import AuthNavbar from '../components/common/AuthNavbar';
import StockSearch from '../components/trade/StockSearch';
import StockInfo from '../components/trade/StockInfo';
import StockChart from '../components/trade/StockChart';
import TradeModal from '../components/trade/TradeModal';
// import axios from 'axios';

import api from '../services/api.service';


const Trade = () => {
  const { username } = useAuth0();

  const [selectedStock, setSelectedStock] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tradeResult, setTradeResult] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username) return;

      try {
        const response = await api.get(`http://localhost:3000/portfolio/user/${username}`);
        
        if (response.data && response.data._id) {
          localStorage.setItem('portfolioId', response.data._id);
          console.log('Portfolio ID set:', response.data._id);
        } else {
          console.error('Invalid portfolio data:', response.data);
        }
      } catch (error) {
        console.error('Portfolio error:', error.response?.data || error.message);
      }
    };

    fetchPortfolio();
  }, [username]); 

  const handleStockSelect = async (stock) => {
    try {
      // Get current price when stock is selected
      const priceResponse = await api.get(`http://localhost:3000/stock/quote/${stock.symbol}`);
      setSelectedStock({
        ...stock,
        currentPrice: priceResponse.data.data.currentPrice
      });
    } catch (error) {
      console.error('Error fetching stock price:', error);
      setSelectedStock({
        ...stock,
        error: 'Company not available for trading'
      });
    }
  };


  const executeOrder = async (orderData) => {
    const portfolioId = localStorage.getItem('portfolioId');
    if (!portfolioId) {
      throw new Error('No portfolio selected');
    }
    
    try {
      const response = await api.post('http://localhost:3000/order', {
        ...orderData,
        portfolioId,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Trade execution failed');
    }
  };

  const handleTrade = async (tradeType, quantity) => {
    if (!selectedStock || selectedStock.error || !selectedStock.currentPrice) {
        setTradeResult({
            success: false,
            message: 'Invalid stock selection or price not available'
        });
        setShowModal(true);
        return;
    }

    try {
      const response = await executeOrder({
          stockSymbol: selectedStock.symbol,
          orderType: tradeType,
          quantity: parseInt(quantity),
          price: selectedStock.currentPrice,
          portfolioId: localStorage.getItem('portfolioId')
      });
      
      const totalValue = response.order.price * quantity;
      
      setTradeResult({
          success: true,
          message: `Successfully ${tradeType.toLowerCase()}ed ${quantity} shares of ${selectedStock.symbol}`,
          orderDetails: {
              symbol: selectedStock.symbol,
              shares: quantity,
              pricePerShare: response.order.price,
              totalValue: totalValue.toFixed(2),
              type: tradeType,
              updatedHolding: response.holding
          }
      });
      setShowModal(true);
    } catch (error) {
        
        let errorMessage = 'Trade execution failed';
        if (error.response?.data?.message?.includes('holdingId')) {
            errorMessage = "You don't have any shares of this stock to sell";
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        
        setTradeResult({
            success: false,
            message: errorMessage
        });
        setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar />
      
      <main className="container mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Trading Dashboard - {username}
        </h1>
        {/* Stock Search Section */}
        <div className="mb-8">
          <StockSearch onSelect={handleStockSelect} />
        </div>

        {/* Stock Info and Trading Section */}
        {selectedStock && (
          <div className="mb-8">
            <StockInfo 
              stock={selectedStock}
              onBuy={(quantity) => handleTrade('BUY', quantity)}
              onSell={(quantity) => handleTrade('SELL', quantity)}
            />
          </div>
        )}

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          {selectedStock ? (
            <StockChart 
              symbol={selectedStock.symbol || ''} 
              key={selectedStock.symbol}
            />
          ) : (
            <div className="text-center py-20 text-gray-500">
              Search for a stock to view its chart
            </div>
          )}
        </div>
      </main>

      {/* Trade Result Modal */}
      <TradeModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={tradeResult}
      />
    </div>
  );
};

export default Trade;
