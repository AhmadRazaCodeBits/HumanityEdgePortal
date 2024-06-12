import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import DonateNowbutton from './DonateNowbutton';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          {/* <Link to="/"><img src={logo} alt="Humanity Edge Portal" /></Link> */}
          <div className="footer-logo-text">
           
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/islamic-giving">Islamic Giving</Link></li>
              <li><Link to="/volunteer">Be a Volunteer</Link></li>
              <li><Link to="/compains">Compains</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Islamic Giving</h4>
            <ul>
              <li><Link to="/sadaqah">Sadaqah</Link></li>
              <li><Link to="/zakat">Zakat</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Compains</h4>
            <ul>
              <li><Link to="/blood-donation">Blood Donation</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Blogs</h4>
            <ul>
              <li><Link to="/media">Media</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-donate">
          <DonateNowbutton title="Donate Now" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Humanity Edge Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
