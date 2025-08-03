import React from 'react';

const Toggle = ({ handlePaste }) => {

  return (
    <div >
      <label className="switch" onClick={handlePaste}>
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Toggle;