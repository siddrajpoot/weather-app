import React from 'react';

const Currently = props => {
  return (
    <div className="currently">
      <p>
        <strong>{props.city}</strong>
      </p>
      <p>Currently: {props.currentTemp}&deg;F</p>
      <p>Humidity: {props.currentHumidity}%</p>
      <p>
        High: {Math.round(props.currentHigh)}&deg;F Low:{Math.round(
          props.currentLow
        )}&deg;F
      </p>
    </div>
  );
};

export default Currently;
