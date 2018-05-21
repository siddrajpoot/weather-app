import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import 'normalize.css';
import 'materialize-css/dist/css/materialize.min.css';
import '../styles/styles.css';

import Header from './Header';
import AddressForm from './AddressForm';
import Currently from './Currently';
import Hourly from './Hourly';
import Daily from './Daily';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleUserAddress = this.handleUserAddress.bind(this);

    this.state = {
      error: '',
      lat: '',
      lng: '',
      currentTemp: '',
      currentHumidity: '',
      city: '',
      hasResults: false
    };
  }

  componentDidMount() {}

  handleUserAddress(e) {
    e.preventDefault();

    let userAddress = document.getElementById('address').value.trim();

    console.log(userAddress);

    this.getGeocode(userAddress).then(() => {
      this.getDarkSky();
    });

    document.getElementById('address-form').reset();
  }

  getGeocode(userAddress) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/geocode', {
          params: {
            userAddress
          }
        })
        .then(res => {
          res = res.data;
          console.log(res);
          this.setState(() => ({
            lat: res.results[0].geometry.location.lat,
            lng: res.results[0].geometry.location.lng
          }));

          this.getCityFromGeocode(res.results);
          resolve();
        });
    });
  }

  getCityFromGeocode(results) {
    let storableLocation = {};
    for (var ac = 0; ac < results[0].address_components.length; ac++) {
      var component = results[0].address_components[ac];

      if (
        component.types.includes('sublocality') ||
        component.types.includes('locality')
      ) {
        storableLocation.city = component.long_name;
      } else if (component.types.includes('administrative_area_level_1')) {
        storableLocation.state = component.short_name;
      } else if (component.types.includes('country')) {
        storableLocation.country = component.long_name;
        storableLocation.registered_country_iso_code = component.short_name;
      }
    }

    if (storableLocation.city && storableLocation.state) {
      this.setState(() => ({
        city: `${storableLocation.city}, ${storableLocation.state}`
      }));
    }
  }

  getDarkSky(lat, lng) {
    axios
      .get('/api/darksky', {
        params: { lat: this.state.lat, lng: this.state.lng }
      })
      .then(res => {
        console.log('Darksky:', res.data);
        this.setState(() => ({
          currently: res.data.currently,
          icon: res.data.currently.icon,
          summary: res.data.currently.summary,
          currentHigh: res.data.daily.data[0].temperatureHigh,
          currentLow: res.data.daily.data[0].temperatureLow,
          hourly: res.data.hourly.data,
          daily: res.data.daily.data,
          hasResults: true
        }));
      });
  }

  updateTime() {
    setInterval(() => {
      return moment().format('h:mm:ss a');
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {this.state.hasResults ? (
          <div className="main">
            <div className="nav">
              <Header />
            </div>
            <div className="results">
              <Currently
                currently={this.state.currently}
                city={this.state.city}
                currentTemp={this.state.currentTemp}
                currentHumidity={this.state.currentHumidity}
                currentHigh={this.state.currentHigh}
                currentLow={this.state.currentLow}
                updateTime={this.updateTime}
                summary
                icon={this.state.icon}
              />
              <div className="forecast">
                <Daily daily={this.state.daily} />
                <Hourly hourly={this.state.hourly} />
              </div>
            </div>
          </div>
        ) : (
          <div className="App--intro">
            <Header />
            <p className="subtitle">a clean weather app</p>
            <AddressForm handleUserAddress={this.handleUserAddress} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
