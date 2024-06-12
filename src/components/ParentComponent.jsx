import React, { useState } from 'react';
import CampaignCard from './CampaignCard';

const ParentComponent = ({ campaigns }) => {
  const [updatedCampaigns, setUpdatedCampaigns] = useState(campaigns);

  const handleDonationSuccess = (category, amount) => {
    setUpdatedCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign.title === category
          ? { ...campaign, collected: campaign.collected + amount }
          : campaign
      )
    );
  };

  return (
    <div>
      {updatedCampaigns.map((campaign) => (
        <CampaignCard
          key={campaign._id}
          campaign={campaign}
          onDonationSuccess={(amount) => handleDonationSuccess(campaign.title, amount)}
        />
      ))}
    </div>
  );
};

export default ParentComponent;
