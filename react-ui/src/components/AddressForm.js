import React from 'react';

const AddressForm = props => {
  return (
    <form onSubmit={props.handleUserAddress} id="address-form" className="">
      <input
        className="z-depth-3"
        type="text"
        id="address"
        placeholder="Enter a location"
        required
      />
      <input
        type="submit"
        style={{ visibility: 'hidden', position: 'absolute' }}
      />
    </form>
  );
};

export default AddressForm;
