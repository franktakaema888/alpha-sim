import PropTypes from 'prop-types';

const HoldingsTable = ({ holdings, isLoading }) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading holdings data...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">COMPANY NAME</th> */}
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">SYMBOL</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">QUANTITY</th>
            {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">GAIN/LOSS(%)</th> */}
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">CURRENT VALUE</th>
            {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">DETAILS</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {holdings.map((holding) => (
            <tr key={holding._id} className="hover:bg-gray-50">
              {/* <td className="px-6 py-4 text-sm text-gray-900">{holding.companyName}</td> */}
              <td className="px-6 py-4 text-sm text-gray-900">{holding.stockSymbol}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{holding.totalQuantity}</td>
              {/* <td className={`px-6 py-4 text-sm ${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {holding.gainLoss}%
              </td> */}
              <td className="px-6 py-4 text-sm text-gray-900">${holding.avgPrice.toFixed(2)}</td>
              {/* <td className="px-6 py-4 text-sm">
                <button className="text-accent hover:text-blue-700">
                  View
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

HoldingsTable.propTypes = {
  holdings: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    stockSymbol: PropTypes.string.isRequired,
    totalQuantity: PropTypes.number.isRequired,
    gainLoss: PropTypes.number.isRequired,
    currentValue: PropTypes.number.isRequired
  })).isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default HoldingsTable;