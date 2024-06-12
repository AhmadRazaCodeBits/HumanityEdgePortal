// Campaign.js

import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import './Campaigns.css'; // Import the CSS file

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/campaigns')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCampaigns(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div className="CampaignHeader"> 
    <h1>Campaigns</h1></div>
    <div className="campaign-container">
      
      {campaigns.map(campaign => (
        <CampaignCard key={campaign._id} campaign={campaign} />
      ))}
    </div>
    </>
  );
};

export default Campaign;
