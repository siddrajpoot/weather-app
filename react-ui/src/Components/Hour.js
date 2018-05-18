import React from 'react';
import moment from 'moment';

const Hour = props => {
  return (
    <div>
      <p>
        {moment.unix(props.time).format('h a')}, {Math.floor(props.temperature)}&deg;F
      </p>
    </div>
  );
};

export default Hour;
