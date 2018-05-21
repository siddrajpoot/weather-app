import React from 'react';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const Day = props => {
  return (
    <div className="day-container">
      <p className="day">{moment.unix(props.time).format('ddd')}</p>
      <p className="date">{moment.unix(props.time).format('M/D')}</p>
      <WeatherIcon icon={props.icon} />
      <p className="temperature">{Math.round(props.temperatureHigh)}&deg;F</p>
    </div>
  );
};

export default Day;
