
import './Zakat.css';
import zakatbanner from '../images/zakat banner.png';
import BannerImage from './BannerImage';
import DonateNowForm from './DonateNowForm';

import DonateNowbutton from './DonateNowbutton';
import AboutFiled from './AboutField';

function Zakat() {
  return (
    <>
      <div>
        {/* <UperNavbar />
        <Navbar /> */}
        <BannerImage src={zakatbanner} alt="Zakat Banner" />
        <div className="zakat-form">
          <DonateNowForm title="Donate Zakat" />
          <h2>Calculate Zakat Now</h2>
          <DonateNowbutton title="Zakat Calculator" />
          
        </div>
        <AboutFiled
          title="About Zakat"
          content={<><p><strong>Zakat</strong>, a fundamental tenet of Islam, is the obligatory giving of alms to those in need, serving as a pillar of both spiritual and communal responsibility. Literally translating to "<strong>purification</strong>" or "<strong>growth</strong>," Zakat requires Muslims possessing wealth above a specified threshold, known as the Nisab, to annually donate a portion, typically 2.5%, of their assets to designated categories of recipients, including the poor, debt-ridden, travelers, and others facing financial adversity. Beyond its material impact, Zakat holds profound spiritual significance, viewed as a means of cleansing one's wealth and reaffirming the transient nature of worldly possessions. It fosters social justice by redistributing wealth, cultivating empathy, and nurturing solidarity within Muslim communities. Ultimately, Zakat stands as a tangible manifestation of compassion, generosity, and communal welfare, embodying the core values of Islam and reinforcing the imperative of caring for the less fortunate.</p>
          </> }
          src={zakatbanner} 
          alt="Zakat Image" 
        />
      </div>
    </>
  );
}

export default Zakat;
