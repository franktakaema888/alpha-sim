import { useAuth } from '../context/useAuth';
import Navbar from '../components/common/Navbar';
import AuthNavbar from '../components/common/AuthNavbar';

const About = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">About αSim</h1>
        
        {/* Introduction Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Welcome to αSim Trading</h2>
          <p className="text-gray-600 mb-4">
            αSim is a mock trading platform designed to help you practice and improve your trading skills
            without risking real money. With $10,000 in virtual capital, you can experiment with different
            trading strategies and learn the fundamentals of stock market investing.
          </p>
        </section>

        {/* Why Practice Trading Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Why Practice Trading?</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Practice trading offers several benefits for both beginners and experienced traders:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Learn market mechanics without financial risk</li>
              <li>Develop and test trading strategies</li>
              <li>Practice emotional control and discipline</li>
              <li>Understand portfolio management principles</li>
              <li>Gain confidence before trading with real money</li>
            </ul>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">How to Use αSim</h2>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Getting Started</h3>
              <p>Sign up for an account and you&apos;ll receive $10,000 in virtual trading capital.</p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Trading</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the search bar to find stocks by company name or symbol</li>
                <li>View real-time stock prices and charts</li>
                <li>Place buy and sell orders with your virtual capital</li>
                <li>Monitor your positions in the Portfolio page</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Portfolio Management</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Track your holdings and performance</li>
                <li>View detailed transaction history (Coming Soon...)</li>
                <li>Analyze your trading patterns (Coming Soon...)</li>
                <li>Monitor your profit/loss metrics (Coming Soon...)</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;