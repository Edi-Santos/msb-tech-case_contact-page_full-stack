import React from 'react';
import { PropTypes } from 'prop-types';

function InputMessage({ message, onChange }) {
  return (
    <label htmlFor="message">
      Mensagem
      <textarea
        id="message"
        name="message"
        value={ message }
        onChange={ onChange }
        placeholder="Fale conosco"
      />
    </label>
  );
}

InputMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputMessage;
