import React from 'react';

const Currently = props => {
  return (
    <div className="currently">
      <p>
        <strong>{props.city}</strong>
      </p>
      <p>Currently: {Math.round(props.currentTemp)}&deg;F</p>
      <p>Humidity: {Math.round(props.currentHumidity)}%</p>
      <p>
        High: {Math.round(props.currentHigh)}&deg;F Low:{Math.round(
          props.currentLow
        )}&deg;F
      </p>
    </div>
  );
};

export default Currently;
