import React from 'react';
// import moment from 'moment';
import Day from './Day';

const Daily = props => {
  return (
    <div className="daily">
      <p>
        <strong>5 Day</strong>
      </p>
      {props.daily.slice(1, 6).map(day => {
        return (
          <Day
            key={day.time}
            time={day.time}
            temperatureHigh={day.temperatureHigh}
            temperatureLow={day.temperatureLow}
          />
        );
      })}
    </div>
  );
};

export default Daily;
