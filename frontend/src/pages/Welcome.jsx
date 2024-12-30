import { Link } from 'react-router-dom'; 
import Navbar from '../components/common/Navbar';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Start your trading journey with us...
          </h1>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
              <h2 className="text-2xl font-semibold text-primary">Trade</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              In his 2008 book Outliers, Malcolm Gladwell wrote that &quot;ten thousand 
              hours is the magic number of greatness.&quot;Register with us to start 
              practising with fake money.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition"
              >
                Register
              </Link>
              <Link 
                to="/login"
                className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;