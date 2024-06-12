import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminVideo from './AdminVideo';
import AdminBlog from './AdminBlog';
// import AdminPanel from '../Admin/AdminPanel';
import Admin from '../components/Admin';

// import AdminVolunteer from '../components/AdminVolunteer';
import AdminVol from '../components/AdminVol';
import './AdminUser.css';
import AdminAmount from './AdminAmount';
import AdminBlood from '../components/AdminBlood';


const AdminUser = () => {
  return (
    
      <div className="admin-user">
       <Sidebar />
        <div className="content">
          <Routes>
          
            <Route path="/admin/video" element={<AdminVideo />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/adminblood" element={<AdminBlood />} />
            <Route path="/admin/vol" element={<AdminVol />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminamount" element={<AdminAmount />} />
          </Routes>
        </div>
      </div>
    
  );
};

export default AdminUser;
