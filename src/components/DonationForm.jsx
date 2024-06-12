import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './DonationForm.css';  // Import the CSS file

const DonationForm = ({ onDonationSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [collected, setCollected] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      try {
        const response = await axios.get(`http://localhost:5000/api/campaigns/category/${category}`);
        setCollected(response.data.collected);
      } catch (error) {
        console.error('Error fetching collected amount:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentIntentResponse = await axios.post('http://localhost:5000/api/donations', {
        amount: Number(amount),
        category: selectedCategory,
      });

      const clientSecret = paymentIntentResponse.data.clientSecret;
      if (!clientSecret) {
        throw new Error('Missing client secret from payment intent response');
      }

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Donor',
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Donation successful!');
        if (onDonationSuccess && typeof onDonationSuccess === 'function') {
          onDonationSuccess(selectedCategory, Number(amount)); // Update the collected amount dynamically
        }
        setSelectedCategory('');
        setAmount('');
      }
    } catch (error) {
      console.error('Error making donation:', error);
      alert(`Donation failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Collected Amount: Rs.{collected}</label>
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Card Details</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button type="submit" disabled={!stripe || !elements}>
        Donate
      </button>
    </form>
  );
};

export default DonationForm;
