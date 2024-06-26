import React from "react";
import { useSelector } from "react-redux";
import Calendar from "../Calendar/Calendar";
import Tasks from "../Tasks/Task";
import "./Dashboard.css";
import Goals from "../Goals/Goals";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const household = useSelector((store) => store.householdReducer[0]);

  // console.log("household:", household[0].name);

  return (
    <div className="container">
      <h2>
        Welcome, {user.username}!
      </h2>

      <Container minbreakpoint='sm' breakpoints={['xl','lg', 'md']}>
        <Row className="justify-content-md-center">
          <Goals />
        </Row>
      </Container>
      <Container>
        <Row>
          <Col  style={{backgroundColor:'#8693A4ff', height:'760px', borderRadius:'3%', padding:'20px', display:'flex'}}>
          <Tasks />
          </Col>
          <Col md={{ span: 7}} >
          <Calendar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
