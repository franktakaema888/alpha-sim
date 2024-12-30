import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const StockChart = ({ symbol }) => {
  const chartContainerRef = useRef();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interval, setInterval] = useState('DAILY');

  const intervals = [
    { label: '5min', value: 'INTRADAY' },
    { label: 'Daily', value: 'DAILY' },
    { label: 'Weekly', value: 'WEEKLY' },
    { label: 'Monthly', value: 'MONTHLY' }
  ];

  useEffect(() => {
    if (!chartContainerRef.current || !symbol) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#D1D5DB',
        fixLeftEdge: true,
        fixRightEdge: true,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.toLocaleDateString();
        }
      },
      rightPriceScale: {
        borderColor: '#D1D5DB',
        autoScale: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: '#758696',
          style: 0,
        },
        horzLine: {
          width: 1,
          color: '#758696',
          style: 0,
        },
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });   

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    });

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // Set as an overlay
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const fetchHistoricalData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching data for symbol:', symbol, 'interval:', interval);
        const response = await axios.get(`http://localhost:3000/price-history/${symbol}/${interval}`);

        if (!response.data.success) {
          throw new Error('Chart data is not available');
        }
    
        if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
          throw new Error('Chart data is not available');
        }
        
        if (response.data.success && Array.isArray(response.data.data)) {
          const priceData = response.data.data;
          console.log('Chart data received:', priceData.length, 'candles');
    
          // Convert timestamps to local time
          const formattedData = priceData
            .map(candle => ({
              ...candle,
              time: Math.floor(candle.time), 
            }))
            .sort((a, b) => a.time - b.time);
    
          // Set the data
          candlestickSeries.setData(formattedData);
          
          // Set volume data
          const volumeData = formattedData.map(item => ({
            time: item.time,
            value: item.volume,
            color: item.close >= item.open ? '#26a69a' : '#ef5350'
          }));
          volumeSeries.setData(volumeData);
    
          chart.timeScale().fitContent();
        } else {
          throw new Error('No historical data available for this stock');
        }
      } catch (error) {
        console.error('Chart error:', error);
        setError('Chart data is not available');
      } finally {
        setIsLoading(false);
      }
    };
    
    // const fetchHistoricalData = async () => {
    //   setIsLoading(true);
    //   setError(null);
      
    //   try {
    //     console.log('Attempting to fetch data for:', symbol);
    //     if (!symbol) {
    //       throw new Error('No stock symbol provided');
    //     }
    
    //     const response = await axios.get(`http://localhost:3000/price-history/${symbol}/${interval}`, {
    //       timeout: 10000 // 10 second timeout
    //     });
        
    //     console.log('API Response:', response.data); // Debug response
    
    //     if (!response.data.success) {
    //       throw new Error(response.data.message || 'Failed to fetch data');
    //     }
    
    //     if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
    //       throw new Error('No historical data available');
    //     }
    
    //     const formattedData = response.data.data
    //       .filter(candle => (
    //         candle && 
    //         typeof candle.time === 'number' &&
    //         !isNaN(candle.open) &&
    //         !isNaN(candle.high) &&
    //         !isNaN(candle.low) &&
    //         !isNaN(candle.close)
    //       ))
    //       .map(candle => ({
    //         time: candle.time,
    //         open: Number(candle.open),
    //         high: Number(candle.high),
    //         low: Number(candle.low),
    //         close: Number(candle.close),
    //         volume: Number(candle.volume || 0)
    //       }))
    //       .sort((a, b) => a.time - b.time);
    
    //     if (formattedData.length === 0) {
    //       throw new Error('No valid data points available');
    //     }
    
    //     candlestickSeries.setData(formattedData);
    //     volumeSeries.setData(formattedData.map(item => ({
    //       time: item.time,
    //       value: item.volume,
    //       color: item.close >= item.open ? '#26a69a' : '#ef5350'
    //     })));
    
    //     chart.timeScale().fitContent();
    
    //   } catch (error) {
    //     console.error('Failed to fetch historical data:', error);
    //     setError(error.message || 'Failed to load chart data');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }; 

    fetchHistoricalData();
    
    // Handle resize
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol, interval]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-white">
        <p className="text-gray-500">Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Add interval selector */}
      <div className="mb-4 flex justify-end space-x-2">
        {intervals.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setInterval(value)}
            className={`px-3 py-1 rounded ${
              interval === value 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <p className="text-gray-500">Loading chart data...</p>
        </div>
      )}

      <div ref={chartContainerRef} />
      
      {error && (
        <div className="flex items-center justify-center h-[400px] bg-white">
          <p className="text-gray-500">Chart data is not available</p>
        </div>
      )}

      {!symbol && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a stock to view price history</p>
        </div>
      )}
    </div>
  );
};

StockChart.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default StockChart;