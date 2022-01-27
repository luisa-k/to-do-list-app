import React from "react";
import { Link } from "react-router-dom";
import config from "../..config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClock,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

class ChangeTask extends React.Component {
  constructor(props) {
    super();
    this.state = {
      description: props.description,
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

  onChangeTask = () => {
    fetch(`${config.url}/changetask`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: this.props.id,
        description: this.state.description,
        duedate: this.state.duedate,
        time: this.state.time,
      }),
    }).then((response) => response.json());
  };

  render() {
    return (
      <div>
        <h2>Change your task</h2>
        <div className="input-Container">
          <FontAwesomeIcon icon={faStickyNote}></FontAwesomeIcon>
          <input
            onChange={this.onDescriptionInput}
            type="text"
            id="todo"
            name="todo"
            value={this.state.description}
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
            <button className="signInBtn" onClick={this.onChangeTask}>
              Change task
            </button>
          </Link>
          <Link to="/">Return to list</Link>
        </div>
      </div>
    );
  }
}

export default ChangeTask;
