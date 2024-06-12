// src/components/DonateNowbutton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DonateNowbutton.css';

function DonateNowbutton({ title }) {
  const navigate = useNavigate();

  const goToDonationForm = () => {
    navigate('/donation-form'); // Navigate to DonationPage route
  };

  return (
    <button onClick={goToDonationForm}>{title}</button>
  );
}

export default DonateNowbutton;
