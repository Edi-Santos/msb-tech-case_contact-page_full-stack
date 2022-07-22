import React, { useState } from 'react';

import ButtonSend from './ButtonSend';
import InputCellPhone from './InputCellPhone';
import InputEmail from './InputEmail';
import InputMessage from './InputMessage';
import InputName from './InputName';

import getIp from '../../services/getIpClient';
import contactRequest from '../../services/contactAPI';

function Form() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    cellphone: '',
    message: '',
    ip: '',
  });

  const onChange = ({ target }) => {
    const { name, value } = target;

    setInputs(() => ({
      ...inputs,
      [name]: value,
    }));
  };

  const onClick = async () => {
    const catchedIp = await getIp();

    setInputs(() => ({
      ...inputs,
      ip: catchedIp.ip,
    }));

    const localUrl = 'http://localhost:3001/contact';
    const method = 'POST';
    const headers = {
      'Content-type': 'application/json',
    };
    const body = { ...inputs };

    const sendToBD = await contactRequest(
      localUrl, method, headers, JSON.stringify(body),
    );

    alert(sendToBD.message);
  };

  const { name, email, cellphone, message } = inputs;

  return (
    <main>
      <h2>Entre em contato enviando um email através do formulário</h2>
      <form>
        <InputName name={ name } onChange={ onChange } />
        <InputEmail email={ email } onChange={ onChange } />
        <InputCellPhone cellphone={ cellphone } onChange={ onChange } />
        <InputMessage message={ message } onChange={ onChange } />
      </form>
      <ButtonSend sendOnClick={ onClick } />
    </main>
  );
}

export default Form;
