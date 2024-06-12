import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/admin/video">Admin Video</Link></li>
        <li><Link to="/admin/blog">Admin Blog</Link></li>
        {/* <li><Link to="/admin/panel">Admin Panel</Link></li> */}
        <li><Link to="/admin">Admin Campaigns</Link></li>

        <li><Link to="/adminamount">Total Amount Gathered</Link></li>
        <li><Link to="/admin/adminblood">Admin Blood</Link></li>
  
        <li><Link to="/admin/vol">Admin Volunteer</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
