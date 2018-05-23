import React from 'react';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';
import Degrees from './Degrees';

const Hour = props => {
  return (
    <div className="hour">
      <div className="time-container">
        <p className="time-hour">{moment.unix(props.time).format('h')}</p>
        <p className="time-period">{moment.unix(props.time).format('a')}</p>
      </div>
      <WeatherIcon icon={props.icon} />
      <p className="temperature">
        <Degrees temp={props.temperature} toggle={props.toggle} />
      </p>
    </div>
  );
};

export default Hour;
