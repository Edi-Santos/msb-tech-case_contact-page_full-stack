import React, { useState } from 'react';
import InputCellPhone from './InputCellPhone';
import InputEmail from './InputEmail';
import InputName from './InputName';

function Form() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    cellphone: '',
  });

  const onChange = ({ target }) => {
    const { name, value } = target;

    setInputs(() => ({
      ...inputs,
      [name]: value,
    }));
  };

  const { name, email, cellphone } = inputs;

  return (
    <main>
      <h2>Entre em contato enviando um email através do formulário</h2>
      <form>
        <InputName name={ name } onChange={ onChange } />
        <InputEmail email={ email } onChange={ onChange } />
        <InputCellPhone cellphone={ cellphone } onChange={ onChange } />
      </form>
    </main>
  );
}

export default Form;
