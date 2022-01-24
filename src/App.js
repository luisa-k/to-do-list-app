import "./App.css";
import React, { Component } from "react";
import SignIn from "./components/SignIn/SignIn";
import Logo from "./components/Logo/Logo";
import Register from "./components/Register/Register";
import Tasks from "./components/Tasks/Tasks";
import ChangeTask from "./components/ChangeTask/ChangeTask";
import AddTask from "./components/AddTask/AddTask";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      path: "signin",
      id: "",
      name: "",
      email: "",
      joined: "",
      tasks: [],
      taskID: "",
      description: "",
      createdby: "",
      duedate: "",
      loggedIn: false,
      user: "",
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
    });
  };

  loadTasks = (data) => {
    data.sort((a, b) => {
      const aDate = new Date(a.date + " " + a.time);
      const bDate = new Date(b.date + " " + b.time);

      return bDate.getTime() - aDate.getTime();
    });
    this.setState({
      tasks: data,
    });
  };

  loadOneTask = (data) => {
    this.setState({
      taskID: data.id,
      createdby: data.createdby,
      description: data.description,
      duedate: data.duedate,
    });
  };

  updateloggedIn = (update) => {
    this.setState({ loggedIn: update });
  };

  isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/verify", {
        method: "GET",
        credentials: "include",
      });

      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.answer === true) {
        this.loadUser(parseRes.user);
        fetch("http://localhost:5000/tasks", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            createdby: parseRes.user.id,
          }),
        })
          .then((response) => response.json())
          .then((tasks) => {
            this.loadTasks(tasks);
            this.updateloggedIn(true);
          });
      } else {
        console.log("No login possible");
        this.setState({
          loggedIn: false,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  componentDidMount = () => {
    this.isAuth();
  };

  render() {
    console.log(this.state.loggedIn);
    return (
      <Router>
        <div className="App">
          <Logo />
          {!this.state.loggedIn ? (
            <SignIn
              loadUser={this.loadUser}
              loadTasks={this.loadTasks}
              updateloggedIn={this.updateloggedIn}
            />
          ) : (
            <BrowserRouter>
              <Switch>
                <Route path="/addtask">
                  <AddTask loadTasks={this.loadTasks} user={this.state.user} />
                </Route>
                <Route exact path="/register">
                  <Register
                    loadUser={this.loadUser}
                    loadTasks={this.loadTasks}
                    updateloggedIn={this.updateloggedIn}
                  />
                </Route>
                <Route path="/tasks">
                  <Tasks
                    loadTasks={this.loadTasks}
                    loadOneTask={this.loadOneTask}
                    name={this.state.user.name}
                    tasks={this.state.tasks}
                    updateloggedIn={this.updateloggedIn}
                  />
                </Route>
                <Route path="/changetask">
                  <ChangeTask
                    loadUser={this.loadUser}
                    loadTasks={this.loadTasks}
                    id={this.state.taskID}
                    createdby={this.state.createdby}
                    duedate={this.state.duedate}
                    description={this.state.description}
                  />
                </Route>
              </Switch>
            </BrowserRouter>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
