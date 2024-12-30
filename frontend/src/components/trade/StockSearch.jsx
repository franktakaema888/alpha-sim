import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const StockSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchCompanies = async (searchTerm) => {
    if (!searchTerm) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/company/search/${searchTerm}`);
      setResults(response.data.data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 2) {
        searchCompanies(query);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // When a company is selected, fetch its stock data
  const handleCompanySelect = async (company) => {
    try {
      // Fetch current stock price
      const priceResponse = await axios.get(`http://localhost:3000/stock/quote/${company.symbol}`);
      
      const { currentPrice, timestamp } = priceResponse.data.data;
      // Combine company info with stock data
      const stockData = {
        name: company.name,
        symbol: company.symbol,
        currentPrice,
        timestamp,
        percentageChange: 0
      };
      
      onSelect(stockData);
      setQuery(company.name);
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to fetch stock data:', error);
      // Handle the error case where stock data isn't available
      onSelect({
        name: company.name,
        symbol: company.symbol,
        error: 'Company not available for trading'
      });
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent pl-10"
          placeholder="Search for a company or symbol..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-5 w-5 border-2 border-accent rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((company) => (
            <div
              key={company.symbol}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                // onSelect(company);
                setQuery(`${company.name} (${company.symbol})`);
                handleCompanySelect(company);
                setShowDropdown(false);
              }}
            >
              <div className="font-medium">{company.symbol}</div>
              <div className="text-sm text-gray-600">{company.name}</div>
              <div className="text-xs text-gray-500">{company.exchangeShortName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

StockSearch.propTypes = {
  onSelect: PropTypes.func.isRequired
};

export default StockSearch;