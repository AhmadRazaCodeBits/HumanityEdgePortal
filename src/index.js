import React from 'react';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';

const stripePromise = loadStripe('pk_test_51PLhgYBQRu8GXv2qeVcvzPECifgp1yzXBUpuDjmZQLpMu2na1GtdXSYmYsIX5fAZvQnkCVAoENgKlBLmbeMONkIB00HvrXIIGa');

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      
        <App />
      
    </Elements>
  </React.StrictMode>
);
