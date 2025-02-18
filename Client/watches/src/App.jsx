import React from 'react'
import './App.css';
import Navbar from '../Components/navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/home'
import Men from '../pages/men'
import Women from '../pages/women'
import Cart from '../pages/cart'
import Loginpage from '../pages/loginpage'
import Footer from '../Components/footer'
import WatchDetails from '../pages/watchDetails';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Men" element={<Men />} />
        <Route path="/Women" element={<Women />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/watches/:id" element={<WatchDetails />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
