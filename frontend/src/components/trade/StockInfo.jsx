import { useState } from 'react';
import PropTypes from 'prop-types';

const StockInfo = ({ stock, onBuy, onSell }) => {
  const [quantity, setQuantity] = useState(1);

  if (stock.error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-red-500 text-center">
          {stock.error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">{stock.name} ({stock.symbol})</h2>
          <div className="mt-2 space-y-1">
            <div className="text-3xl font-bold text-primary">${stock.currentPrice}</div>
            <div className={`text-sm ${stock.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`} >
              {stock.percentageChange}% Today
            </div>
          </div>
        </div>
        
        <div className="space-x-4">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => onBuy(quantity)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Buy
          </button>
          <button
            onClick={() => onSell(quantity)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

StockInfo.propTypes = {
  stock: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    currentPrice: PropTypes.number,
    percentageChange: PropTypes.number,
    error: PropTypes.string
  }).isRequired,
  onBuy: PropTypes.func.isRequired,
  onSell: PropTypes.func.isRequired
};

export default StockInfo;