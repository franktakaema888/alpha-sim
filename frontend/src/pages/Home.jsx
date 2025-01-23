// import { useAuth } from '../context/useAuth';
import { useAuth0 } from "@auth0/auth0-react";

import { Link } from 'react-router-dom';
import AuthNavbar from '../components/common/AuthNavbar';

const Home = () => {
  const { username, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar />
      
      <main className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-12">
            Hi {username}! Welcome to your Trading Area
          </h1>
          
          {/* Trade Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-2">Trade</h2>
                <p className="text-gray-600 mb-4">
                  Buy Stocks by searching for the specific ticker of your choice and start trading away! 
                  Your starting balance will be 10,000 Dollars
                </p>
                <Link 
                  to="/trade"
                  className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Start Trading
                </Link>
              </div>
            </div>
          </div>

          {/* Learn Section
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-2">Learn</h2>
                <p className="text-gray-600 mb-4">
                  New to the world of Trading and unsure on how to navigate through? Find out more below!
                </p>
                <Link 
                  to="/learn"
                  className="inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
