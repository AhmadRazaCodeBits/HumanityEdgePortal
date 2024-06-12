import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({ imageUrl: '', totalAmount: '', collectedAmount: '' });

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await axios.get('http://localhost:5000/api/campaigns');
      setCampaigns(res.data);
    };
    fetchCampaigns();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/campaigns', newCampaign);
    const res = await axios.get('http://localhost:5000/api/campaigns');
    setCampaigns(res.data);
    setNewCampaign({ imageUrl: '', totalAmount: '', collectedAmount: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/campaigns/${id}`);
    const res = await axios.get('http://localhost:5000/api/campaigns');
    setCampaigns(res.data);
  };

  return (
    <div className="admin-panel">
      <h1>Campaign Editor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="imageUrl"
          value={newCampaign.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <input
          type="number"
          name="totalAmount"
          value={newCampaign.totalAmount}
          onChange={handleInputChange}
          placeholder="Total Amount"
        />
        <input
          type="number"
          name="collectedAmount"
          value={newCampaign.collectedAmount}
          onChange={handleInputChange}
          placeholder="Collected Amount"
        />
        <button type="submit">Add Campaign</button>
      </form>
      <div className="campaign-list">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="campaign">
            <img src={campaign.imageUrl} alt="Campaign" />
            <p>Total: ${campaign.totalAmount}</p>
            <p>Collected: ${campaign.collectedAmount}</p>
            <button onClick={() => handleDelete(campaign._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;