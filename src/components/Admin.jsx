import React, { useState, useEffect } from 'react';
import './Admin.css'; // Import the CSS file

const Admin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [collected, setCollected] = useState('');
  const [goal, setGoal] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/campaigns')
      .then(response => response.json())
      .then(data => setCampaigns(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const campaignData = { title, description, collected, goal, imageUrl };

    if (editingCampaign) {
      // Update existing campaign
      fetch(`http://localhost:5000/api/campaigns/${editingCampaign._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      }).then(() => {
        setEditingCampaign(null);
        resetForm();
        fetchCampaigns();
      });
    } else {
      // Create new campaign
      fetch('http://localhost:5000/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      }).then(() => {
        resetForm();
        fetchCampaigns();
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCollected('');
    setGoal('');
    setImageUrl('');
  };

  const fetchCampaigns = () => {
    fetch('http://localhost:5000/api/campaigns')
      .then(response => response.json())
      .then(data => setCampaigns(data));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/campaigns/${id}`, {
      method: 'DELETE',
    }).then(() => fetchCampaigns());
  };

  const handleEdit = (campaign) => {
    setTitle(campaign.title);
    setDescription(campaign.description);
    setCollected(campaign.collected);
    setGoal(campaign.goal);
    setImageUrl(campaign.imageUrl);
    setEditingCampaign(campaign);
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmit} className="campaign-form">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Collected</label>
          <input
            type="number"
            value={collected}
            onChange={(e) => setCollected(e.target.value)}
          />
        </div>
        <div>
          <label>Goal</label>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">
            {editingCampaign ? 'Update Campaign' : 'Save Campaign'}
          </button>
        </div>
      </form>
      <div className="campaign-list">
        <h2>Campaigns</h2>
        {campaigns.map(campaign => (
          <div key={campaign._id} className="campaign-item">
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p>Collected: Rs.{campaign.collected}</p>
            <p>Goal: Rs.{campaign.goal}</p>
            <p><img src={campaign.imageUrl} alt={campaign.title} /></p>
            <div>
              <button onClick={() => handleEdit(campaign)}>Edit</button>
              <button onClick={() => handleDelete(campaign._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
