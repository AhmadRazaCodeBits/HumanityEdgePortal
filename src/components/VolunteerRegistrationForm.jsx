import React, { useState } from 'react';
import axios from 'axios';
import './VolunteerRegistrationForm.css';

const VolunteerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    city: '',
    mobileNo: '',
    gender: '',
    dateOfBirth: '',
    areaOfInterest: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/volunteers', formData);
      setMessage('Form submitted successfully');
      setTimeout(() => {
        setMessage('');
        window.location.reload(); // Refresh the page
      }, 3000); // Clear the message and refresh after 3 seconds
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message === 'Volunteer with this email already exists') {
        setMessage('Volunteer with this email already exists');
      } else {
        setMessage('Form submission failed');
      }
      setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
    }
  };

  return (
    <div className="volunteer-registration">
      <h1>Volunteer Registration</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Country:</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />

        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />

        <label>Mobile No:</label>
        <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Date Of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

        <label>Area Of Interest:</label>
        <select name="areaOfInterest" value={formData.areaOfInterest} onChange={handleChange} required>
          <option value="">Select Area of Interest</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="environment">Environment</option>
          <option value="community">Community Service</option>
          <option value="emergency">Emergency Services</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerRegistrationForm;
