import React from 'react';

const AddressForm = props => {
  return (
    <div className="row">
      <form
        onSubmit={props.handleUserAddress}
        id="address-form"
        className="col s12"
      >
        <div className="row">
          <div className="input-field col s12">
            <input
              className=""
              type="text"
              id="address"
              placeholder="Enter a location"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
