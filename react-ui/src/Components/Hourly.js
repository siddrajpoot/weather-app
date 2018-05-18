import React from 'react';

import Hour from './Hour';

const Hourly = props => {
  return (
    <div className="hourly">
      <p>
        <strong>Hourly</strong>
      </p>
      {props.hourly.slice(1, 14).map(hour => {
        return (
          <Hour
            key={hour.time}
            time={hour.time}
            temperature={hour.temperature}
          />
        );
      })}
    </div>
  );
};

export default Hourly;

// <div key={hour.time}>
//             <p>
//               {moment.unix(hour.time).format('h a')},{' '}
//               {Math.floor(hour.temperature)}&deg;F
//             </p>
//           </div>
