import React, { Component } from 'react';
import axios from 'axios';

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
    this.toggleTemp = this.toggleTemp.bind(this);

    this.state = {
      error: '',
      lat: '',
      lng: '',
      currentTemp: '',
      currentHumidity: '',
      city: '',
      hasResults: false,
      formattedAddress: '',
      toggle: true
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
            lng: res.results[0].geometry.location.lng,
            city: res.results[0].formatted_address
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

  toggleTemp() {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));

    console.log(this.state.toggle);
  }

  render() {
    let appClassName = this.state.hasResults ? 'App-mobile-home' : '';
    return (
      <div className={`App ${appClassName}`}>
        {this.state.hasResults ? (
          <div className="main">
            <div className="nav">
              <Header />
              <div className="address-toggle-container">
                <AddressForm handleUserAddress={this.handleUserAddress} />
                <div
                  className={this.state.toggle ? 'switch cel' : 'switch'}
                  onClick={this.toggleTemp}
                >
                  <div className="toggle">
                    <p>{this.state.toggle ? 'F' : 'C'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results">
              <Currently
                currently={this.state.currently}
                city={this.state.city}
                currentTemp={this.state.currentTemp}
                currentHumidity={this.state.currentHumidity}
                currentHigh={this.state.currentHigh}
                currentLow={this.state.currentLow}
                icon={this.state.icon}
                formattedAddress={this.state.formattedAddress}
                toggle={this.state.toggle}
              />
              <div className="forecast">
                <Daily daily={this.state.daily} toggle={this.state.toggle} />
                <Hourly hourly={this.state.hourly} toggle={this.state.toggle} />
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
