import React from 'react';

const Degrees = props => {
  const degreesFormula = temp => {
    return Math.round((temp - 32) * (5 / 9));
  };

  return (
    <span>
      {props.toggle ? Math.round(props.temp) : degreesFormula(props.temp)}&deg;{props.toggle
        ? 'F'
        : 'C'}
    </span>
  );
};

export default Degrees;
