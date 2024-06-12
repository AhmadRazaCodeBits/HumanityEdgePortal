import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './AdminAmount.css'; // Import the CSS file for styling

const AdminAmount = () => {
  const [stats, setStats] = useState({});
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/donations');
        calculateStats(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  const calculateStats = (donations) => {
    const stats = {
      total: 0,
      categoryTotals: {},
      lastDay: 0,
      lastWeek: 0,
      lastMonth: 0
    };

    const now = new Date();
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    donations.forEach(donation => {
      const date = new Date(donation.date);
      const amount = donation.amount;

      stats.total += amount;

      if (!stats.categoryTotals[donation.category]) {
        stats.categoryTotals[donation.category] = 0;
      }
      stats.categoryTotals[donation.category] += amount;

      if (date > oneDayAgo) {
        stats.lastDay += amount;
      }
      if (date > oneWeekAgo) {
        stats.lastWeek += amount;
      }
      if (date > oneMonthAgo) {
        stats.lastMonth += amount;
      }
    });

    setStats(stats);
  };

  useEffect(() => {
    if (Object.keys(stats).length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy the existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(stats.categoryTotals),
          datasets: [{
            label: 'Donations by Category',
            data: Object.values(stats.categoryTotals),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stats]);

  return (
    <div className="admin-amount-container">
      <h1>Admin Amount Page</h1>
      <p>Total collected: Rs.{stats.total}</p>
      <p>Last day: Rs.{stats.lastDay}</p>
      <p>Last week: Rs.{stats.lastWeek}</p>
      <p>Last month: Rs.{stats.lastMonth}</p>

      <div className="chart-container">
        <canvas ref={chartRef} id="categoryChart"></canvas>
      </div>
    </div>
  );
};

export default AdminAmount;
