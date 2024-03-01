import { useState } from "react";
import TasksItems from "./TaskItems";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Tasks.css";
import { useEffect } from "react";

import { Button } from "react-bootstrap";
import { Form, FloatingLabel, Container, Row, Col } from "react-bootstrap";

export default function Tasks() {
  const dispatch = useDispatch();

  const tasks = useSelector((store) => store.tasksReducer);

  const [task, setTask] = useState({
    task_details: "",
    is_complete: false,
  });

  const addNewTask = (event) => {
    event.preventDefault();
    dispatch({ type: "CREATE_TASK", payload: task });
    console.log("creating new task", task);

    setTask({
      task_details: "",
      is_complete: false,
    });
  };

  const handleDescriptionChange = (e) => {
    setTask({ ...task, task_details: e.target.value });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_TASKS" });
    return () => dispatch({ type: `CLEAR_TASKS` });
  }, []);

  if (tasks.length === 0) {
    return (
      <>
        <div className="tasks">
          <Form onSubmit={addNewTask}>
            <FloatingLabel label="Task Description" htmlFor="description">
              <Form.Control
                className="mb-3"
                onChange={handleDescriptionChange}
                required
                value={task.task_details}
                placeholder="Task Description"
                type="text"
              />
            </FloatingLabel>
            <Button type="submit">Submit</Button>
          </Form>
          <h3>Tasks List</h3>
          <p>Please enter a task!</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ height: 500, width: 400 }} className="tasks">
        <Container style={{backgroundColor:'#8693A4ff', height:'760px', borderRadius:'3%', padding:'20px'}}>
          <Row>
            <Form className="mb-3" onSubmit={addNewTask}>
              <Col>
                <FloatingLabel label="Task Description" htmlFor="description">
                  <Form.Control
                    className="mb-3"
                    onChange={handleDescriptionChange}
                    required
                    value={task.task_details}
                    placeholder="Task Description"
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <Button size="md" className="submit-button" type="submit">
                  Submit
                </Button>
              </Col>
            </Form>
          </Row>
          <h3>Tasks List</h3>
          <ul>
            {tasks.map((task) => (
              <TasksItems key={task.id} task={task} />
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
