import React from 'react';

import Hour from './Hour';

const Hourly = props => {
  return (
    <div className="hourly">
      <h3 className="title">10 Hour</h3>
      <div className="results">
        {props.hourly.slice(1, 11).map(hour => {
          return (
            <Hour
              key={hour.time}
              time={hour.time}
              temperature={hour.temperature}
              icon={hour.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hourly;
