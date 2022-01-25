import React from "react";
import "./Tasks.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faEdit,
  faSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

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

  loadTasks = () => {
    fetch("http://localhost:5000/tasks", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        createdby: this.props.user.id,
      }),
    })
      .then((response) => response.json())
      .then((tasks) => {
        this.props.loadTasks(tasks);
        this.props.updateloggedIn(true);
      });
  };

  componentDidMount = () => {
    this.loadTasks();
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

  onMarkAsDone = (tasksId, taskDone) => {
    fetch("http://localhost:5000/changetask", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: tasksId,
        done: !taskDone,
      }),
    })
      .then((response) => response.json())
      .then(() => this.props.fetchTasks());
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
        {`Hi ${this.props.user.name}! Here are your tasks :)`}
        <br></br>
        <br></br>
        <div>
          {this.props.tasks.map((tasks, i) => (
            <li key={i}>
              <div className="card" width="50%">
                <div className="card-data" id={`card-data-${tasks.id}`}>
                  {tasks.done ? (
                    <>
                      <p className="card-elements">{tasks.description}</p>
                      <p className="card-elements">{`Due Date: ${this.getDate(
                        tasks.duedate
                      )}`}</p>
                      <p className="card-elements">{`Time: ${tasks.time}`}</p>
                    </>
                  ) : (
                    <>
                      <p>{tasks.description}</p>
                      <p>{`Due Date: ${this.getDate(tasks.duedate)}`}</p>
                      <p>{`Time: ${tasks.time}`}</p>
                    </>
                  )}
                </div>
                <div className="Buttons-task">
                  <Link to="/changetask">
                    <button
                      className="editBtn"
                      onClick={() => {
                        this.props.loadOneTask(tasks);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </button>
                  </Link>
                  <button
                    className="checkBtn"
                    id={`button-done-${tasks.id}`}
                    onClick={() => {
                      this.onMarkAsDone(tasks.id, tasks.done);
                    }}
                  >
                    {" "}
                    {tasks.done ? (
                      <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon>
                    )}
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => {
                      this.onDeleteTask(tasks.id, tasks.createdby);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                  </button>
                </div>
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
