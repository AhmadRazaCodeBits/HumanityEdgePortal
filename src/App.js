import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Import your Home component
import IslamicGiving from './components/IslamicGiving';
import Sadaqah from './components/Sadaqah';
import Zakat from './components/Zakat';
import Compains from './components/Compains';
import GirlsMarriage from './components/GirlsMarriage';
import Scholarships from './components/Scholarships';
import Volunteer from './components/Volunteer';
import Blogs from './components/Blogs';
import Media from './components/Media';
import AdminPanel from './Admin/AdminPanel';
import ZakatCalculator from './components/ZakatCalculator';
import Campaign from './components/Campaign';
import Admin from './components/Admin';
import Navbar from './components/Navbar'; 
import UperNavbar from './components/UperNavbar';
import BlogPost from './pages/BlogPost';
import DonationForm from './components/DonationForm';
import AdminUser from './pages/AdminUser';
import AdminVideo from './pages/AdminVideo';
import AdminBlog from './pages/AdminBlog';
import AdminVolunteer from './components/AdminVolunteer';
import AdminVol from './components/AdminVol';
import AdminAmount from './pages/AdminAmount';
import AdminBlood from './components/AdminBlood';
import BloodDonation from './components/BloodDonation';
import Footer from './components/Footer';


function App() {
  return (
    <>
      
      <Router>
      
        <div>
        <UperNavbar />
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Render Home component at the root */}
            <Route path="/islamic-giving" element={<IslamicGiving />} />
            <Route path="/sadaqah" element={<Sadaqah />} />
            <Route path="/zakat" element={<Zakat />} />
            <Route path="/compains" element={<Compains />} />
            <Route path="/admin/adminblood" element={<AdminBlood />} />
            <Route path="/orphan-girls-marriage" element={<GirlsMarriage />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/media" element={<Media />} />
            <Route path="/zakatcalculator" element={<ZakatCalculator />} />
            {/* <Route path="/admin" component={AdminPanel} /> */}
            <Route path="/admin/panel" element={<AdminPanel />} />
            <Route path="/compaingn" element={<Campaign />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blood-donation" element={<BloodDonation/>} />
            <Route path="/blogpost/:id" element={<BlogPost />} />
            <Route path="/donation-form" element={<DonationForm/>} />
            <Route path="/AdminUser" element={<AdminUser/>} />
            <Route path="/admin/volunteer" element={<AdminVolunteer />} />
            <Route path="/admin/vol" element={<AdminVol />} /> 
            <Route path="/admin/video" element={<AdminVideo />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/adminamount" element={<AdminAmount />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;