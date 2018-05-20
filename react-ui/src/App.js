import React, { Component } from 'react';
import axios from 'axios';

import logo from './images/Asset-3.png';

import AddressForm from './components/AddressForm';
import Currently from './components/Currently';
import Hourly from './components/Hourly';
import Daily from './components/Daily';
import 'materialize-css/dist/css/materialize.min.css';
import 'normalize.css';
import './styles/styles.css';

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
      city: ''
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
    console.log('test');
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
          currentTemp: res.data.currently.temperature,
          currentHumidity: res.data.currently.humidity * 100,
          currentHigh: res.data.daily.data[0].temperatureHigh,
          currentLow: res.data.daily.data[0].temperatureLow,
          hourly: res.data.hourly.data,
          daily: res.data.daily.data
        }));
      });
  }

  render() {
    return (
      <div className="App App--intro">
        <div className="container">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="header">
                <img className="logo" src={logo} alt="logo" />
                <h1 className="title">weather</h1>
              </div>
              <p className="subtitle">A clean weather app.</p>
              <AddressForm handleUserAddress={this.handleUserAddress} />
            </div>
            {this.state.currentTemp && (
              <div className="main">
                <Currently
                  city={this.state.city}
                  currentTemp={this.state.currentTemp}
                  currentHumidity={this.state.currentHumidity}
                  currentHigh={this.state.currentHigh}
                  currentLow={this.state.currentLow}
                />
                <Hourly hourly={this.state.hourly} />
                <Daily daily={this.state.daily} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
