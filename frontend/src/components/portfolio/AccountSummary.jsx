import PropTypes from 'prop-types';

const AccountSummary = ({ balance, invested }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-primary mb-6">Account Summary</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Account Balance:</p>
          <p className="text-2xl font-bold text-primary">${balance.toFixed(2) - invested.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">Value Invested:</p>
          <p className="text-2xl font-bold text-primary">${invested.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

AccountSummary.propTypes = {
  balance: PropTypes.number.isRequired,
  invested: PropTypes.number.isRequired
};

export default AccountSummary;