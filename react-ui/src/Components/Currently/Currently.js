import React from 'react';

const Currently = props => {
  return (
    <div className="currently">
      <p>
        <strong>{props.city}</strong>
      </p>
      <p>Currently: {props.currentTemp}&deg;F</p>
      <p>Humidity: {props.currentHumidity}%</p>
    </div>
  );
};

export default Currently;
