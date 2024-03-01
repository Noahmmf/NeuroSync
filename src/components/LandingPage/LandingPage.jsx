import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import { Button } from 'react-bootstrap';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
        <p>NueroSync is your go-to app for staying on top of things - 
          made with your unique brain in mind. It's simple: our app helps
           you sync up life's bits and pieces without the overwhelm. Share 
           calendars to keep everyone on the same page, sprinkle your day with 
           upbeat vibes, and tackle goals and tasks together or solo, turning dreams 
           into reality. Plus, our task list is super easy to use, keeping daily to-dos 
           clear and manageable. Ready to make life smoother? Join us now!</p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <Button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
