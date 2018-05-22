import React from 'react';
import locationIcon from '../images/location.png';

const AddressForm = props => {
  return (
    <form onSubmit={props.handleUserAddress} id="address-form" className="">
      <input type="text" id="address" placeholder="Enter a location" required />
      <button className="address-submit" type="submit">
        <img className="location-icon" src={locationIcon} />
      </button>
    </form>
  );
};

export default AddressForm;
