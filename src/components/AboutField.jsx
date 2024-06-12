import React from 'react';
import './AboutField.css'

function AboutFiled(props) {
  return (
    <div className="Aboutfiled">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <img src={props.src} alt={props.alt} />
    </div>
  );
}

export default AboutFiled;
