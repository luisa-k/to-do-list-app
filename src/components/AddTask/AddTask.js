import React from "react";
import { Link } from "react-router-dom";

class AddTask extends React.Component {
  constructor(props) {
    super();
    this.state = {
      description: "",
      duedate: "",
      time: "",
    };
  }

  onDescriptionInput = (event) => {
    this.setState({ description: event.target.value });
  };

  onDueDateInput = (event) => {
    this.setState({ duedate: event.target.value });
  };

  onTimeInput = (event) => {
    this.setState({ time: event.target.value });
  };

  onSubmitAddTask = () => {
    fetch("http://localhost:5000/addtask", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        description: this.state.description,
        duedate: this.state.duedate,
        time: this.state.time,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        fetch("http://localhost:5000/tasks", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            createdby: user.createdby,
          }),
        })
          .then((response) => response.json())
          .then((tasks) => {
            this.props.loadTasks(tasks);
          });
      });
  };

  render() {
    return (
      <div>
        <label htmlFor="todo">To Do:</label>
        <br></br>
        <input
          onChange={this.onDescriptionInput}
          type="text"
          id="todo"
          name="todo"
        ></input>
        <br></br>
        <label htmlFor="duedate">Due Date:</label>
        <br></br>
        <input
          onChange={this.onDueDateInput}
          type="date"
          id="duedate"
          name="duedate"
        ></input>
        <br></br>
        <label htmlFor="todo">Time:</label>
        <br></br>
        <input
          onChange={this.onTimeInput}
          type="time"
          id="time"
          name="time"
        ></input>
        <br></br>
        <br></br>
        <Link to="/tasks">
          <button onClick={this.onSubmitAddTask}>Add task</button>
        </Link>
        <Link to="/tasks">
          <button>Don't add anything</button>
        </Link>
      </div>
    );
  }
}

export default AddTask;
