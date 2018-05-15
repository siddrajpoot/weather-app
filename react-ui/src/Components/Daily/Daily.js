import React from 'react';
import moment from 'moment';

const Daily = props => {
  return (
    <div className="daily">
      <p>
        <strong>5 Day</strong>
      </p>
      {props.daily.slice(1, 6).map(day => {
        return (
          <div key={day.time}>
            <p>
              {moment.unix(day.time1).format('dddd MMM Do')}
              <br />
              High: {Math.round(day.temperatureHigh)}&deg;F Low:{' '}
              {Math.round(day.temperatureLow)}&deg;F
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Daily;
