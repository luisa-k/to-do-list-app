import React from "react";
import "./Tasks.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faEdit,
  faPlus,
  faSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

class Tasks extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tasks: [],
    };
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
        this.sortTasks(tasks);
        this.props.updateloggedIn(true);
      });
  };

  sortTasks = (data) => {
    const sortbyDate = data.sort((a, b) => {
      const aDate = new Date(a.duedate);
      const bDate = new Date(b.duedate);
      return aDate - bDate;
    });

    const sortbyTime = sortbyDate.sort((a, b) => {
      const aDate = new Date(a.duedate);
      const bDate = new Date(b.duedate);
      if (aDate.toString() === bDate.toString()) {
        return 1;
      } else {
        return 0;
      }
    });

    console.log(sortbyTime);

    this.setState({
      tasks: sortbyTime,
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
            this.loadTasks(tasks);
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
      .then(() => this.loadTasks());
  };

  render() {
    return (
      <div>
        <h2>Hi {this.props.user.name}! Here are your tasks:</h2>
        <div className="AddTaskButton">
          <Link to="/addtask">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </Link>
        </div>
        <div>
          {this.state.tasks.map((tasks, i) => (
            <li key={i}>
              <div className="card-container">
                <div className="card" width="50%">
                  <div className="card-data" id={`card-data-${tasks.id}`}>
                    {tasks.done ? (
                      <>
                        <p className="card-elements" id="card-description">
                          {tasks.description}
                        </p>
                        <p className="card-elements">{`${this.getDate(
                          tasks.duedate
                        )} at ${tasks.time}`}</p>
                      </>
                    ) : (
                      <>
                        <p id="card-description">{tasks.description}</p>
                        <p>{`${this.getDate(tasks.duedate)} at ${
                          tasks.time
                        }`}</p>
                      </>
                    )}
                  </div>
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
      </div>
    );
  }
}

export default Tasks;
