import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClock,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

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
        });
      });
  };

  render() {
    return (
      <div>
        <h2>Add Task</h2>
        <div className="input-Container">
          <FontAwesomeIcon icon={faStickyNote}></FontAwesomeIcon>
          <input
            onChange={this.onDescriptionInput}
            type="text"
            id="todo"
            name="todo"
            placeholder="Write your to do here"
          ></input>
        </div>
        <div className="input-Container">
          <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>
          <input
            onChange={this.onDueDateInput}
            type="date"
            id="duedate"
            name="duedate"
          ></input>
        </div>
        <div className="input-Container">
          <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
          <input
            onChange={this.onTimeInput}
            type="time"
            id="time"
            name="time"
          ></input>
        </div>
        <div className="buttons-signin">
          <Link to="/">
            <button className="signInBtn" onClick={this.onSubmitAddTask}>
              Add task
            </button>
          </Link>
        </div>
        <Link to="/">Don't add anything</Link>
      </div>
    );
  }
}

export default AddTask;
