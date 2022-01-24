import React from "react";
import "./Tasks.css";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  getDate = (date) => {
    let parseDate = new Date(date);
    var options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return parseDate.toLocaleString("en-US", options);
  };

  onDeleteTask = (id, createdby) => {
    fetch("http://localhost:5000/deletetask", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        fetch("http://localhost:5000/tasks", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            createdby: createdby,
          }),
        })
          .then((response) => response.json())
          .then((tasks) => {
            this.props.loadTasks(tasks);
          });
      });
  };

  logout = (e) => {
    e.preventDefault();
    document.cookie =
      "webtoken =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    this.props.updateloggedIn(false);
  };

  render() {
    return (
      <div>
        {`Hi ${this.props.name}! Here are your tasks :)`}
        <br></br>
        <br></br>
        <div>
          {this.props.tasks.map((tasks, i) => (
            <li key={i}>
              <div className="card" width="50%">
                {tasks.description}
                <br></br>
                {`Due Date: ${this.getDate(tasks.duedate)}`}
                <br></br>
                {`Time: ${tasks.time}`}
                <br></br>
                <Link to="/changetask">
                  <button
                    onClick={() => {
                      this.props.loadOneTask(tasks);
                    }}
                  >
                    Change
                  </button>
                </Link>
                <br></br>
                <button
                  onClick={() => {
                    this.onDeleteTask(tasks.id, tasks.createdby);
                  }}
                >
                  Delete
                </button>
              </div>
              <br></br>
            </li>
          ))}
        </div>
        <Link to="/addtask">
          <button>Add Task</button>
        </Link>
        <div>
          <button onClick={(e) => this.logout(e)}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Tasks;
