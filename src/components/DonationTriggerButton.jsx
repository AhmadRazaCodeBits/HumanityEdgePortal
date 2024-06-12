import React, { useState } from 'react';
import DonationForm from './DonationForm';

const DonationTriggerButton = ({ title, onDonationSuccess }) => {
  const [showForm, setShowForm] = useState(false);

  const handleDonationSuccess = (category, amount) => {
    onDonationSuccess(amount); // Pass amount to parent component
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>{title}</button>
      {showForm && <DonationForm onDonationSuccess={handleDonationSuccess} />}
    </div>
  );
};

export default DonationTriggerButton;
