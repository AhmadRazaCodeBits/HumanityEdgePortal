import React from 'react';
import './Home.css'
import charity from '../images/heroimage.png'; 
import BannerImage from './BannerImage';
import Campaign from './Campaign';
import BlogPage from '../pages/BlogPage';



function Home() {
  return (
    <div>
        <BannerImage  src={charity} alt={charity} />
       <Campaign />
       <BlogPage />
    </div>
  );
}

export default Home;
