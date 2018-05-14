import React from 'react';

const Currently = props => {
  return (
    <div>
      <p>{props.city}</p>
      <p>Currently: {props.currentTemp}&deg;F</p>
      <p>Humidity: {props.currentHumidity}%</p>
    </div>
  );
};

export default Currently;
