import React from 'react';
import moment from 'moment';

const Day = props => {
  return (
    <div>
      <p>
        {moment.unix(props.time).format('ddd M/D')}
        <br />
        High: {Math.round(props.temperatureHigh)}&deg;F Low:{Math.round(
          props.temperatureLow
        )}&deg;F
      </p>
    </div>
  );
};

export default Day;
