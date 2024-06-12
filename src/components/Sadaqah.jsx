import React from 'react';
import './Zakat.css'
import sadaqah from '../images/sadaqah.jpeg';
import AboutField from './AboutField';
import BannerImage from './BannerImage';
import DonateNowForm from './DonateNowForm';



function Sadaqah() {
  
 

  return (
    <>
    <div>
     
      <BannerImage  src={"https://ideogram.ai/assets/image/lossless/response/l0n9heV9RqWFnulyH4DDkQ"} alt={sadaqah} />
    <div className="zakat-form">
      <DonateNowForm title="Donate Now"/>
    
    </div>
    <AboutField
        title="About Sadaqah"
        content="
         Sadaqah, derived from the Arabic word for 'charity', is a voluntary act of giving for the sake of Allah. Unlike Zakat, which is obligatory, Sadaqah is given freely at any time and in any amount, making it accessible for everyone to participate in. It encompasses a broad spectrum of good deeds, from monetary donations to acts of kindness and compassion. The primary purpose of Sadaqah is to alleviate the suffering of others, provide for the needy, and promote social solidarity. It can be used to support various causes, such as feeding the hungry, helping the poor, and providing educational resources. By giving Sadaqah, individuals can purify their wealth, express gratitude for their blessings, and gain spiritual rewards, while also making a tangible impact on the lives of those who are struggling."
        src={"https://ideogram.ai/assets/image/lossless/response/l0n9heV9RqWFnulyH4DDkQ"} // Pass the image source as a prop
        alt="Zakat Image" // Pass the alt text as a prop
      />
     
    </div>
    </>
  );
}

export default Sadaqah;
