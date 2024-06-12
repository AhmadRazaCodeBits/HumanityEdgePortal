import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdminVolunteer.css';

const AdminVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formField, setFormField] = useState({
    label: '',
    type: 'text',
    options: ''
  });

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/volunteers');
        setVolunteers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVolunteers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/volunteers/${id}`);
      setVolunteers(volunteers.filter(volunteer => volunteer._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldChange = (e) => {
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };

  const handleAddField = () => {
    // Handle logic to add a new field to the form
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const filteredVolunteers = volunteers.filter(volunteer =>
      volunteer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.areaOfInterest.toLowerCase().includes(searchQuery.toLowerCase())
    );

    doc.autoTable({
      head: [['Full Name', 'Email', 'Country', 'City', 'Mobile No', 'Gender', 'Date Of Birth', 'Area Of Interest']],
      body: filteredVolunteers.map(volunteer => [
        volunteer.fullName,
        volunteer.email,
        volunteer.country,
        volunteer.city,
        volunteer.mobileNo,
        volunteer.gender,
        volunteer.dateOfBirth,
        volunteer.areaOfInterest
      ])
    });

    doc.save('volunteers.pdf');
  };

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    volunteer.areaOfInterest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-volunteer">
      <h1>Admin Volunteer</h1>
      <input
        type="text"
        placeholder="Search by city or area of interest"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={generatePDF}>Download PDF</button>
      <div className="volunteer-cards">
        {filteredVolunteers.map(volunteer => (
          <div className="volunteer-card" key={volunteer._id}>
            <h2>{volunteer.fullName}</h2>
            <p>Email: {volunteer.email}</p>
            <p>Country: {volunteer.country}</p>
            <p>City: {volunteer.city}</p>
            <p>Mobile No: {volunteer.mobileNo}</p>
            <p>Gender: {volunteer.gender}</p>
            <p>Date Of Birth: {volunteer.dateOfBirth}</p>
            <p>Area Of Interest: {volunteer.areaOfInterest}</p>
            <button onClick={() => handleDelete(volunteer._id)}>Delete</button>
          </div>
        ))}
      </div>
      {/* <div className="add-field">
        <h2>Add New Field</h2>
        <input
          type="text"
          placeholder="Field Label"
          name="label"
          value={formField.label}
          onChange={handleFieldChange}
        />
        <select name="type" value={formField.type} onChange={handleFieldChange}>
          <option value="text">Text</option>
          <option value="date">Date</option>
          <option value="select">Select</option>
        </select>
        {formField.type === 'select' && (
          <textarea
            placeholder="Options (comma separated)"
            name="options"
            value={formField.options}
            onChange={handleFieldChange}
          />
        )}
        <button onClick={handleAddField}>Add Field</button>
      </div> */}
    </div>
  );
};

export default AdminVolunteer;
