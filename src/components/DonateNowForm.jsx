import React from 'react';
import './DonateNowForm.css';
import Inputfield from './Inputfield';
import DonateNowbutton from './DonateNowbutton';

function DonateNowForm(props) {
  return (
   <div className="form">
    <h1>{props.title}</h1>
    <div className="ZakatcalculatorButton">
       {/* Use the onClick handler to trigger the goToZakatCalculator function */}
       <Inputfield/>
       <DonateNowbutton title= "Donate Now" />
       
       </div>
   </div>
  );
}

export default DonateNowForm;
