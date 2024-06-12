import React,{ useState } from 'react';
import './Inputfield.css'

function Inputfield() {
  
    // State to manage the value of the input field
const [inputValue, setInputValue] = useState('');

// Event handler to update the input value as the user types
const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

return (
  <>
    {/* Input field with value bound to inputValue state and onChange event handler */}
    <input 
      type="Number" 
      value={inputValue} 
      onChange={handleInputChange} 
      placeholder="Enter Your Amount..." 
    />
    {/* Displaying the current value of the input field */}
  </>
  );
}

export default Inputfield;
