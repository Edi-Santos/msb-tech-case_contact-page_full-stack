import React, { useState } from 'react';
import InputName from './InputName';

function Form() {
  const [inputs, setInputs] = useState({
    name: '',
  });

  const onChange = ({ target }) => {
    const { name, value } = target;

    setInputs(() => ({
      [name]: value,
    }));
  };

  const { name } = inputs;

  return (
    <main>
      <h2>Entre em contato enviando um email através do formulário</h2>
      <form>
        <InputName name={ name } onChange={ onChange } />
      </form>
    </main>
  );
}

export default Form;
