import React from 'react';
// import moment from 'moment';
import Day from './Day';

const Daily = props => {
  return (
    <div className="daily">
      <h3 className="title">5 Day</h3>
      <div className="results">
        {props.daily.slice(1, 6).map(day => {
          return (
            <Day
              key={day.time}
              time={day.time}
              temperatureHigh={day.temperatureHigh}
              temperatureLow={day.temperatureLow}
              icon={day.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Daily;
