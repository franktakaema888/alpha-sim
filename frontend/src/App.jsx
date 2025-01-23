import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext.jsx';
import AuthWrapper from './components/common/AuthWrapper';
import ProtectedRoute from './components/common/ProtectedRoute';
import Welcome from './pages/Welcome';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Trade from './pages/Trade';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import './App.css'

function App() {
  return (
      <BrowserRouter>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> */}
            
            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/trade" element={
              <ProtectedRoute>
                <Trade />
              </ProtectedRoute>
            } />
            <Route path="/portfolio" element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
  );
}

export default App;

// // import { useState } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Welcome from './pages/Welcome';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import Home from './pages/Home';
// import Trade from './pages/Trade';
// import Portfolio from './pages/Portfolio';
// import About from './pages/About';
// import './App.css'

// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Welcome />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/trade" element={<Trade />} />
//         <Route path="/portfolio" element={<Portfolio />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App;
