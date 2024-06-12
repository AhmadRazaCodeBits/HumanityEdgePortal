import React from 'react';
import BloodForm from'./BloodForm';
import AdminBlood from'./AdminBlood';
import Campaign from './Campaign';
function Compains() {
  return (
    <>
   
    <div>
        
      <h2>Recent Running Campaigns</h2>
      <Campaign />
      {/* <BloodForm type="donor" />
      <BloodForm type="receiver" /> */}
     <AdminBlood />
    </div>
    </>
  );
}

export default Compains;
