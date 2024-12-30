import PropTypes from 'prop-types';

const TradeModal = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className={`text-center ${result?.success ? 'text-green-500' : 'text-red-500'}`}>
                  <div className="text-xl font-bold mb-4">
                      {result?.success ? 'Trade Successful' : 'Trade Failed'}
                  </div>
                  <p className="mb-4">{result?.message}</p>
                  
                  {/* Show additional trade details on success */}
                  {result?.success && result?.orderDetails && (
                      <div className="text-gray-700 text-left mb-6 bg-gray-50 p-4 rounded">
                          <p><span className="font-semibold">Type:</span> {result.orderDetails.type}</p>
                          <p><span className="font-semibold">Shares:</span> {result.orderDetails.shares}</p>
                          <p><span className="font-semibold">Price per Share:</span> ${result.orderDetails.pricePerShare}</p>
                          <p><span className="font-semibold">Total Value:</span> ${result.orderDetails.totalValue}</p>
                          {result.orderDetails.updatedHolding && (
                              <p className="mt-2"><span className="font-semibold">Current Holdings:</span> {result.orderDetails.updatedHolding.totalQuantity} shares</p>
                          )}
                      </div>
                  )}

                  <button
                      onClick={onClose}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
                  >
                      Close
                  </button>
              </div>
          </div>
      </div>
  );
};

TradeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  result: PropTypes.shape({
      success: PropTypes.bool,
      message: PropTypes.string,
      orderDetails: PropTypes.shape({
          symbol: PropTypes.string,
          shares: PropTypes.number,
          pricePerShare: PropTypes.number,
          totalValue: PropTypes.string,
          type: PropTypes.string,
          updatedHolding: PropTypes.object
      })
  })
};

export default TradeModal;