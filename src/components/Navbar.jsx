import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';
import DonateNowbutton from './DonateNowbutton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="Contanier_logo">
        <Link to="/"><img src={logo} alt="profile" /></Link>
      </div>
      <div className="FirstName">
        <Link to="/"><span>HEP</span><h6>Humanity Edge Portal</h6></Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-nav ${isOpen ? 'active' : ''}`}>
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/islamic-giving">Islamic Giving</Link>
          <ul className="dropdown-menu">
            <li><Link to="/sadaqah">Sadaqah</Link></li>
            <li><Link to="/zakat">Zakat</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/volunteer">Be a Volunteer</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/compains">Compains</Link>
          <ul className="dropdown-menu">
            <li><Link to="/blood-donation">Blood Donation</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/blogs">Blogs</Link>
          <ul className="dropdown-menu">
            <li><Link to="/media">Media</Link></li>
          </ul>
        </li>
      </ul>
      <div className="Button_Navbar">
        <DonateNowbutton title="Donate Now" />
      </div>
    </nav>
  );
};

export default Navbar;
