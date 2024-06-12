import React from 'react';
import './BannerImage.css';

function BannerImage(bannerimage) {
  return (
   <div className="BAnnerimage">
    <img src={bannerimage.src} alt={bannerimage.alt} />
   </div>
  );
}

export default BannerImage;
