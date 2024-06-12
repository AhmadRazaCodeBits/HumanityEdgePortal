import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminVol.css';

const AdminVol = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/volunteers');
      setVolunteers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/volunteers/${id}`);
      fetchVolunteers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/volunteers/search?city=${searchCity}`);
      setVolunteers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async (filter = {}) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/volunteers/download`, {
        params: filter,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'volunteers.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-vol">
      <h1>Admin Volunteer Management</h1>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={() => handleDownload()}>Download All</button>
        <button onClick={() => handleDownload({ city: searchCity })}>Download Search Results</button>
      </div>
      <div className="volunteer-cards">
        {volunteers.map((volunteer) => (
          <div key={volunteer._id} className="card">
            <h3>{volunteer.fullName}</h3>
            <p>Email: {volunteer.email}</p>
            <p>Country: {volunteer.country}</p>
            <p>City: {volunteer.city}</p>
            <p>Mobile No: {volunteer.mobileNo}</p>
            <p>Gender: {volunteer.gender}</p>
            <p>Date Of Birth: {new Date(volunteer.dateOfBirth).toLocaleDateString()}</p>
            <p>Area Of Interest: {volunteer.areaOfInterest}</p>
            <button onClick={() => handleDelete(volunteer._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVol;
