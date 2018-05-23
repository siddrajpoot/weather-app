import React from 'react';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';
import Degrees from './Degrees';

const Day = props => {
  return (
    <div className="day-container">
      <p className="day">{moment.unix(props.time).format('ddd')}</p>
      <p className="date">{moment.unix(props.time).format('M/D')}</p>
      <WeatherIcon icon={props.icon} />
      <p className="temperature">
        <Degrees toggle={props.toggle} temp={props.temperatureHigh} />
      </p>
    </div>
  );
};

export default Day;
