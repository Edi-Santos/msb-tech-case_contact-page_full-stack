import React from 'react';
import { PropTypes } from 'prop-types';

function ButtonSend({ sendOnClick }) {
  return (
    <button type="button" onClick={ sendOnClick }>
      Enviar
    </button>
  );
}

ButtonSend.propTypes = {
  sendOnClick: PropTypes.func.isRequired,
};

export default ButtonSend;
