import React from 'react';
import submitIcon from '../images/arrow.png';

const AddressForm = props => {
  return (
    <form onSubmit={props.handleUserAddress} id="address-form" className="">
      <input type="text" id="address" placeholder="Enter a location" required />
      <button className="address-submit" type="submit">
        <img className="location-icon" src={submitIcon} alt="location-icon" />
      </button>
    </form>
  );
};

export default AddressForm;
