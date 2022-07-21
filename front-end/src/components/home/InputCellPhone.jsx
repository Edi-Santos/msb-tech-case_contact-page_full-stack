import React from 'react';
import { PropTypes } from 'prop-types';

function InputCellPhone({ cellphone, onChange }) {
  return (
    <label htmlFor="cellphone">
      Celular
      <input
        type="tel"
        id="cellphone"
        name="cellphone"
        value={ cellphone }
        onChange={ onChange }
        placeholder="Ex.: (99) 99999-9999"
      />
    </label>
  );
}

InputCellPhone.propTypes = {
  cellphone: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputCellPhone;
