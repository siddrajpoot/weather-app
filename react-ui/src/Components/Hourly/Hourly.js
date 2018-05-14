import React from 'react';
import moment from 'moment';

const Hourly = props => {
  return (
    <div className="hourly">
      <p>
        <strong>Hourly</strong>
      </p>
      {props.hourly.slice(0, 12).map(hour => {
        return (
          <div key={hour.time}>
            <p>
              {moment.unix(hour.time).format('h a')},{' '}
              {Math.floor(hour.temperature)}&deg;F
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Hourly;
