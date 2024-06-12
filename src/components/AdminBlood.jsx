import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminBlood.css';

const AdminBlood = () => {
  const [bloods, setBloods] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [searchBloodType, setSearchBloodType] = useState('');

  useEffect(() => {
    fetchBloods();
  }, []);

  const fetchBloods = async (query = {}) => {
    try {
      const response = await axios.get('http://localhost:5000/api/bloods', { params: query });
      setBloods(response.data);
    } catch (error) {
      console.error('Error fetching blood data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bloods/${id}`);
      fetchBloods();
    } catch (error) {
      console.error('Error deleting blood data:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBloods({ city: searchCity, bloodType: searchBloodType });
  };

  const handleDownload = async (filter = {}) => {
    try {
      const response = await axios.get('http://localhost:5000/api/bloods/download', {
        params: filter,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bloods.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading blood data:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Blood Management</h1>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by blood type"
            value={searchBloodType}
            onChange={(e) => setSearchBloodType(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={() => handleDownload()}>Download All</button>
        <button onClick={() => handleDownload({ city: searchCity, bloodType: searchBloodType })}>Download Search Results</button>
      </div>
      <div className="blood-cards">
        {bloods.map((blood) => (
          <div key={blood._id} className="card">
            <h3>{blood.name}</h3>
            <p>Father's Name: {blood.fatherName}</p>
            <p>City: {blood.city}</p>
            <p>CNIC: {blood.cnic}</p>
            <p>Phone: {blood.phone}</p>
            <p>Blood Type: {blood.bloodType}</p>
            <p>Google Map Link: <a href={blood.googleMapLink} target="_blank" rel="noopener noreferrer">View Location</a></p>
            <p>Type: {blood.type === 'donor' ? 'Donor' : 'Receiver'}</p>
            <button onClick={() => handleDelete(blood._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlood;
