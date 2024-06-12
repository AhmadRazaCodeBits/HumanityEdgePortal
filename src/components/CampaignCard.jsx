import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CampaignCard.css';
import DonationTriggerButton from './DonationTriggerButton';

const CampaignCard = ({ campaign, onDonationSuccess }) => {
  const { _id, title, description, goal, imageUrl } = campaign;
  const [collected, setCollected] = useState(campaign.collected);
  const remaining = goal - collected;
  const progress = Math.round((collected / goal) * 100);

  const fetchUpdatedCampaign = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/campaigns/${_id}`);
      setCollected(response.data.collected);
    } catch (error) {
      console.error('Error fetching campaign:', error);
    }
  }, [_id]);

  useEffect(() => {
    fetchUpdatedCampaign();
  }, [fetchUpdatedCampaign]);

  const handleDonationSuccess = (amount) => {
    setCollected((prev) => prev + amount);
    onDonationSuccess(amount);
  };

  return (
    <div className="campaign-card">
      <img className="campaign-image" src={imageUrl} alt={title} />
      <div className="campaign-details">
        <h2 className="campaign-title">{title}</h2>
        <p className="campaign-description">{description}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="campaign-info">Collected: Rs.{collected}</p>
        <p className="campaign-info">Remaining: Rs.{remaining}</p>
      </div>
      <div className="donate-button">
        <DonationTriggerButton title="Donate Now" onDonationSuccess={handleDonationSuccess} />
      </div>
    </div>
  );
};

export default CampaignCard;
