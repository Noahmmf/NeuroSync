import { useState } from "react";
import GoalsItems from "./GoalsItems";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { useEffect } from "react";
import './goals.css'

export default function Goals() {
  const dispatch = useDispatch();

  const goals = useSelector((store) => store.goalsReducer);
  const [type, setType] = useState("daily");

  const [goal, setGoal] = useState({
    type: "daily",
    description: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_GOALS" });
    return () => dispatch({ type: `CLEAR_GOALS` });
  }, []);

  const addNewGoal = (event) => {
    event.preventDefault();
    dispatch({ type: "CREATE_GOAL", payload: goal });
    console.log("creating new goal", goal);

    setGoal({
      type: "daily",
      description: "",
    });
  };

  const handleTypeChange = (e) => {
    setGoal({ ...goal, type: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setGoal({ ...goal, description: e.target.value });
  };

  const [daily, setDaily] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [fiveYear, setFiveYear] = useState(false);

  const renderDaily = (e) => {
    setDaily(true);
    setMonthly(false);
    setYearly(false);
    setFiveYear(false);
  };

  const renderMonthly = (e) => {
    setDaily(false);
    setMonthly(true);
    setYearly(false);
    setFiveYear(false);
  };

  const renderYearly = (e) => {
    setDaily(false);
    setMonthly(false);
    setYearly(true);
    setFiveYear(false);
  };

  const renderFiveYear = (e) => {
    setDaily(false);
    setMonthly(false);
    setYearly(false);
    setFiveYear(true);
  };

  if (goals.length === 0) {
    return (
      <>
      <Container style={{backgroundColor:"#D6C4C0ff", padding:'20px', margin:'7px', borderRadius:'2%', display:'-ms-grid'}}>
      <Form className="tester" onSubmit={addNewGoal}>
        <Form.Group as={Row}>
          <Row>
            <Col md={{span:1}} className="align-self-start" sm={2}>
              <Form.Label  sm="2" htmlFor="Type">
                Type :
              </Form.Label>
             </Col>
           <Col className="align-self-start">
              <Form.Select
                value={goal.type}
                onChange={handleTypeChange}
                name="Type"
                id="Type"
                className="mb-3"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="5 Year">5 Year</option>
              </Form.Select>
           </Col>
           
           
             <Col className="align-self-center" sm={{span:6}}>
              <FloatingLabel  label="Description:" htmlFor="description">
                <Form.Control
                  className="mb-3"
                  onChange={handleDescriptionChange}
                  value={goal.description}
                  type="text"
                />
              </FloatingLabel>
             </Col> 
             <Col>
              <Button type="submit">Submit</Button>
             </Col>
          </Row>

          <Col md={{ span: 8, offset: 2 }} className="btn-group">
            <Button onClick={renderDaily}>Daily</Button>{" "}
            <Button onClick={renderMonthly}>Monthly</Button>{" "}
            <Button onClick={renderYearly}>Yearly</Button>{" "}
            <Button onClick={renderFiveYear}>5 Year</Button>
          </Col>
        </Form.Group>
      </Form>
      <Col style={{padding:'6px'}} md={{ span: 8, offset: 2 }}>
        <p>Please enter a goal!</p>
      </Col>
      </Container>
      </>
    );
  }
  return (
    <>
    <Container style={{backgroundColor:"#D6C4C0ff", padding:'20px', margin:'7px', borderRadius:'2%', display:'-ms-grid'}} className="goals">
      <Form className="tester" onSubmit={addNewGoal}>
        <Form.Group as={Row}>
          <Row>
            <Col md={{span:1}} className="align-self-start" sm={2}>
              <Form.Label  sm="2" htmlFor="Type">
                Type :
              </Form.Label>
             </Col>
           <Col className="align-self-start">
              <Form.Select
                value={goal.type}
                onChange={handleTypeChange}
                name="Type"
                id="Type"
                className="mb-3"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="5 Year">5 Year</option>
              </Form.Select>
           </Col>
           
           
             <Col className="align-self-center" sm={{span:6}}>
              <FloatingLabel  label="Description:" htmlFor="description">
                <Form.Control
                  className="mb-3"
                  onChange={handleDescriptionChange}
                  value={goal.description}
                  type="text"
                />
              </FloatingLabel>
             </Col> 
             <Col>
              <Button type="submit">Submit</Button>
             </Col>
          </Row>

          <Col md={{ span: 8, offset: 2 }} className="btn-group">
            <Button onClick={renderDaily}>Daily</Button>{" "}
            <Button onClick={renderMonthly}>Monthly</Button>{" "}
            <Button onClick={renderYearly}>Yearly</Button>{" "}
            <Button onClick={renderFiveYear}>5 Year</Button>
          </Col>
        </Form.Group>
      </Form>
      <Col className="goals-list" style={{padding:'6px'}} md={{ span: 8, offset: 2 }}>
      <ul>
        {goals.map((goal) => (
          <GoalsItems
            daily={daily}
            monthly={monthly}
            yearly={yearly}
            fiveYear={fiveYear}
            key={goal.id}
            goal={goal}
          />
        ))}
      </ul>
      </Col>
      </Container>
    </>
  );
}
