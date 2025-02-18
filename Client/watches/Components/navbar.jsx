import React from 'react'
import './navbar.css'
import Logo from '../src/assets/Images/G-Shock-logo.jpg'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className='Navbar-wrap'>
                <ul className='Nav-list'>

                    <li><Link to="/Men" className='Nav-links'>MEN</Link></li>

                    <li><Link to="/Women" className='Nav-links'>WOMEN</Link></li>

                    <Link to="/" className='Nav-links'><img src={Logo} alt="G-Shock Logo" className="Logo" /></Link>

                    <li><Link to="/Cart" className='Nav-links'>CART</Link></li>

                    <li><Link to="/Login" className='Nav-links'>LOGIN</Link></li>
                </ul>

            </div>
        </>
    )
}

export default Navbar
