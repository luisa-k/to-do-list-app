import React from "react";
import { Link } from "react-router-dom";

class ChangeTask extends React.Component {
  constructor(props) {
    super();
    this.state = {
      description: props.description,
      duedate: "",
    };
  }

  onDescriptionInput = (event) => {
    this.setState({ description: event.target.value });
  };

  onDueDateInput = (event) => {
    this.setState({ duedate: event.target.value });
  };

  onChangeTask = () => {
    fetch("http://localhost:5000/changetask", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: this.props.id,
        description: this.state.description,
        duedate: this.state.duedate,
      }),
    }).then((response) => response.json());
  };

  render() {
    return (
      <div>
        <h2>Change your task</h2>
        <br></br>
        <br></br>
        <label htmlFor="todo">Change the description:</label>
        <br></br>
        <input
          onChange={this.onDescriptionInput}
          type="text"
          id="todo"
          name="todo"
          value={this.state.description}
        ></input>
        <br></br>
        <label htmlFor="duedate">Change the date:</label>
        <br></br>
        <input
          onChange={this.onDueDateInput}
          type="date"
          id="duedate"
          name="duedate"
          value={this.state.duedate}
        ></input>
        <br></br>
        <br></br>
        <Link to="/">
          <button onClick={this.onChangeTask}>Change task</button>
        </Link>
        <br></br>
        <Link to="/">
          <button>Return to list</button>
        </Link>
      </div>
    );
  }
}

export default ChangeTask;
