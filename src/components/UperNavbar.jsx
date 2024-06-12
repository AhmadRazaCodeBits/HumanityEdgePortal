
import React from 'react';
import './Uperbar.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaTiktok } from 'react-icons/fa';

function UperNavbar() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:humanityedgeportal@gmail.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:0303344119'; // Replace with your phone number
  };

  return (
    <>
      <div className="Container">
        <div className="EmailStatic">
          <button onClick={handleEmailClick}>
            <MailOutlineIcon fontSize="medium" />
          </button>
          <div className="Link">
            <a href="mailto:humanityedgeportal@gmail.com">humanityedgeportal@gmail.com</a>
          </div>
        </div>
        <div className="phone-button" onClick={handlePhoneClick}>
          <PhoneIcon fontSize="medium" />
        
        <div className="Link">
            <a href="tel:03033441119">03033441119</a>
          </div>
          </div>
          <div className="Container_right">
  <div className="SocialMediaIcons">
    <a href="https://www.facebook.com">
      <FacebookIcon fontSize="large" />
    </a>
    <a href="https://www.youtube.com">
      <YouTubeIcon fontSize="large" />
    </a>
    <a href="https://twitter.com">
      <TwitterIcon fontSize="large" />
    </a>
    <a href="https://www.tiktok.com">
      <FaTiktok size={32} color="#000" />
    </a>
    <a href="https://www.instagram.com">
      <InstagramIcon fontSize="large" />
    </a>
  </div>
</div>

      </div>
     
    </>
  );
}

export default UperNavbar;
