import React from 'react';
import moment from 'moment';

const Daily = props => {
  return (
    <div className="daily">
      <p>
        <strong>7 Day</strong>
      </p>
      {props.daily.slice(1, 8).map(day => {
        return (
          <div key={day.time}>
            <p>
              {moment.unix(day.time).format('ddd M/D')}
              <br />
              High: {Math.round(day.temperatureHigh)}&deg;F Low:{Math.round(
                day.temperatureLow
              )}&deg;F
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Daily;
