import React from 'react';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';
import Degrees from './Degrees';

const Currently = props => {
  return (
    <div className="currently">
      <h3 className="title">Currently</h3>
      <div className="content">
        <div className="city-date-container">
          {props.city ? (
            <h2 className="city">{props.city}</h2>
          ) : (
            <h2 className="city">{props.formattedAddress}</h2>
          )}

          <div className="date-time-container">
            <p className="date">{moment().format('MMM D')}</p>
            <p className="time">{moment().format('h:mm A')}</p>
          </div>
        </div>
        <WeatherIcon icon={props.icon} />
        <div className="weather-container">
          <p className="current-temp">
            <Degrees temp={props.currently.temperature} toggle={props.toggle} />
          </p>
          <div className="low-high-container">
            <p className="low">
              Low: <Degrees temp={props.currentLow} toggle={props.toggle} />
            </p>
            <p className="high">
              High: <Degrees temp={props.currentHigh} toggle={props.toggle} />
            </p>
          </div>
          <p className="summary">{props.currently.summary}</p>
          <p className="humidity">
            Humidity: {Math.round(props.currently.humidity * 100)}%
          </p>
          <p className="percipitation">
            Precipitation: {Math.round(props.currently.precipProbability * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Currently;
