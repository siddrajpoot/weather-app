import React, { Component } from 'react';
import axios from 'axios';

import AddressForm from './Components/AddressForm/AddressForm';
import Currently from './Components/Currently/Currently';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleUserAddress = this.handleUserAddress.bind(this);

    this.state = {
      error: '',
      lat: '',
      lng: '',
      currentTemp: ''
    };
  }

  handleUserAddress(e) {
    e.preventDefault();

    let userAddress = document.getElementById('address').value.trim();
    let userLat, userLng;

    axios
      .get('/api/geocode', {
        params: {
          userAddress
        }
      })
      .then(res => {
        console.log('Geocode:', res.data);
        if (res.data.status === 'OK') {
          userLat = res.data.results[0].geometry.location.lat;
          userLng = res.data.results[0].geometry.location.lng;

          axios
            .get('/api/darksky', {
              params: {
                lat: userLat,
                lng: userLng
              }
            })
            .then(res => {
              console.log('Darksky:', res.data);
              this.setState(() => ({
                currentTemp: Math.round(res.data.currently.temperature)
              }));
            });
        }
      });

    document.getElementById('address-form').reset();
  }

  render() {
    return (
      <div className="App">
        <AddressForm handleUserAddress={this.handleUserAddress} />
        {this.state.lat && <p>Lat: {this.state.lat}</p>}
        {this.state.lng && <p>Lng: {this.state.lng}</p>}
        <br />
        {this.state.currentTemp && <Currently temp={this.state.currentTemp} />}
      </div>
    );
  }
}

export default App;
