import React, { useState } from 'react';
import axios from 'axios';
import './BloodForm.css';

const BloodForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    city: '',
    cnic: '',
    phone: '',
    bloodType: '',
    googleMapLink: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bloods', { ...formData, type });
      alert('Submission Successful');
      setFormData({
        name: '',
        fatherName: '',
        city: '',
        cnic: '',
        phone: '',
        bloodType: '',
        googleMapLink: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="blood-form-container">
      <h2>{type === 'donor' ? 'Donate Blood' : 'Request Blood'}</h2>
      <form onSubmit={handleSubmit} className="blood-form">
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Father's Name</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>CNIC</label>
          <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Blood Type</label>
          <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} required />
        </div>
        <div>
          <label>Google Map Link</label>
          <input type="text" name="googleMapLink" value={formData.googleMapLink} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BloodForm;
