import React from 'react';
import BloodForm from './BloodForm';

function BloodDonation() {
  return (
    <div>
      <h2>blood donation</h2>
      
      <BloodForm type="donor" />
      <BloodForm type="receiver" />
 
      
      
    </div>
  );
}

export default BloodDonation;
