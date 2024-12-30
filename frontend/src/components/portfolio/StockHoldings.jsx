import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'chart.js/auto';

const StockHoldings = ({ holdings }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    //  pie chart
    const data = {
      labels: holdings.map(h => h.stockSymbol),
      datasets: [{
        data: holdings.map(h => h.totalAmount),
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // yellow
          '#EF4444', // red
          '#8B5CF6' // purple
        ]
      }]
    };

    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Stock Holdings Distribution'
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [holdings]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-primary mb-6">Stock Holdings</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

StockHoldings.propTypes = {
  holdings: PropTypes.arrayOf(PropTypes.shape({
    stockSymbol: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired
  })).isRequired
};

export default StockHoldings;