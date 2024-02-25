import { useState } from "react";
import TasksItems from "./TaskItems";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Tasks.css";

export default function Tasks() {
  const dispatch = useDispatch();

  const tasks = useSelector((store) => store.tasksReducer);

  const [task, setTask] = useState({
    task_details: "",
    is_complete: false,
  });

  console.log("this is what I am sending", task);

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

  

  if (tasks.length === 0) {
    return (
      <>
        <form onSubmit={addNewTask}>
          <label htmlFor="description">Description:</label>
          <input
            onChange={handleDescriptionChange}
            required
            value={task.task_details}
            placeholder="Task Description"
            type="text"
          />
          <button type="submit">Submit</button>
        </form>
        <h3>Tasks List</h3>
        <p>Please enter a task!</p>
      </>
    );
  }
  return (
    <>
      <form onSubmit={addNewTask}>
        <label htmlFor="description">Description:</label>
        <input
          onChange={handleDescriptionChange}
          required
          value={task.task_details}
          placeholder="Task Description"
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Tasks List</h3>
      <ul>
        {tasks.map((task) => (
          <TasksItems key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
}
