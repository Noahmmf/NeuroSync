import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import Calendar from '../Calendar/Calendar';
import Tasks from '../Tasks/Task'
import './Dashboard.css'

//bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Dashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const household = useSelector(store => store.householdReducer[0]);

  // console.log("household:", household[0].name);


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <Container>
        <Col>
        <Row className="calendar" >

          < Calendar />
        </Row>
        <Row>
        < Tasks />
        </Row>
        </Col>
        <Col>
        </Col>
      </Container>
      <Container>
        
      </Container>
      
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
