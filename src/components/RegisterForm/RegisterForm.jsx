import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, FloatingLabel } from 'react-bootstrap';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Form.Group>
        <FloatingLabel className="mb-3" label=" Username:" controlId="floatingInput" htmlFor="username">
         
          <Form.Control
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel className="mb-3" label=" Password:" controlId="floatingInput" htmlFor="password">
         
          <Form.Control
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <Form.Control className="btn btn_asLink btn btn-primary" type="submit" name="submit" value="Register" />
      </Form.Group>
    </Form>
  );
}

export default RegisterForm;
