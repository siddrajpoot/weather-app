import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import AddressForm from './Components/AddressForm/AddressForm';
import Currently from './Components/Currently/Currently';
import Hourly from './Components/Hourly/Hourly';
import Daily from './Components/Daily/Daily';
import './App.css';

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

    // axios
    //   .get('/api/geocode', {
    //     params: {
    //       userAddress
    //     }
    //   })
    //   .then(res => {
    //     let results = res.data.results;
    //     console.log('Geocode:', results);

    //     let storableLocation = {};
    //     for (var ac = 0; ac < results[0].address_components.length; ac++) {
    //       var component = results[0].address_components[ac];

    //       if (
    //         component.types.includes('sublocality') ||
    //         component.types.includes('locality')
    //       ) {
    //         storableLocation.city = component.long_name;
    //       } else if (component.types.includes('administrative_area_level_1')) {
    //         storableLocation.state = component.short_name;
    //       } else if (component.types.includes('country')) {
    //         storableLocation.country = component.long_name;
    //         storableLocation.registered_country_iso_code = component.short_name;
    //       }
    //     }

    //     if (storableLocation.city && storableLocation.state) {
    //       this.setState(() => ({
    //         city: `${storableLocation.city}, ${storableLocation.state}`
    //       }));
    //     }

    //     userLat = results[0].geometry.location.lat;
    //     userLng = results[0].geometry.location.lng;
    //     axios
    //       .get('/api/darksky', {
    //         params: {
    //           lat: userLat,
    //           lng: userLng
    //         }
    //       })
    //       .then(res => {
    //         console.log('Darksky:', res.data);
    //         this.setState(() => ({
    //           currentTemp: Math.round(res.data.currently.temperature),
    //           currentHumidity: res.data.currently.humidity * 100,
    //           hourly: res.data.hourly.data,
    //           daily: res.data.daily.data
    //         }));
    //       });

    //     console.log(storableLocation);
    //   });

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
          currentTemp: Math.round(res.data.currently.temperature),
          currentHumidity: res.data.currently.humidity * 100,
          hourly: res.data.hourly.data,
          daily: res.data.daily.data
        }));
      });
  }

  render() {
    return (
      <div className="App">
        <AddressForm handleUserAddress={this.handleUserAddress} />
        {this.state.currentTemp && (
          <div className="main">
            <Currently
              city={this.state.city}
              currentTemp={this.state.currentTemp}
              currentHumidity={this.state.currentHumidity}
            />
            <Hourly hourly={this.state.hourly} />
            <Daily daily={this.state.daily} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
