import React from 'react';

const AddressForm = props => {
  return (
    <div>
      <form onSubmit={props.handleUserAddress} id="address-form">
        <input type="text" id="address" placeholder="Address" required />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddressForm;
