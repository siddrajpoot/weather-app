import React from 'react';

const AddressForm = props => {
  return (
    <form onSubmit={props.handleUserAddress} id="address-form" className="">
      <input
        className=""
        type="text"
        id="address"
        placeholder="Enter a location"
        required
      />
    </form>
  );
};

export default AddressForm;
