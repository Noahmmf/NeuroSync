import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import { Form, FloatingLabel } from 'react-bootstrap';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
     <Form.Group>
        <FloatingLabel label="Username:" className="mb-3" controlId="floatingInput" htmlFor="username">
         
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
        <FloatingLabel label=" Password:" className="mb-3" controlId="floatingInput" htmlFor="password">
         
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

export default LoginForm;
