import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './fontawesome';
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredits from './pages/BuyCredits';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="px-4a sm:px-10a md:px-14a lg:px-28a min-h-screen bg-gradient-to-b from-purple-50 to-yellow-50">
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredits />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
