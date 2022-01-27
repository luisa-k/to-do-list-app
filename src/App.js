import "./App.css";
import React, { Component } from "react";
import SignIn from "./components/SignIn/SignIn";
import Logo from "./components/Logo/Logo";
import config from "../..config";
import Register from "./components/Register/Register";
import Tasks from "./components/Tasks/Tasks";
import ChangeTask from "./components/ChangeTask/ChangeTask";
import AddTask from "./components/AddTask/AddTask";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      joined: "",
      tasks: [],
      taskID: "",
      description: "",
      createdby: "",
      duedate: "",
      time: "",
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

  loadOneTask = (data) => {
    this.setState({
      taskID: data.id,
      createdby: data.createdby,
      description: data.description,
      duedate: data.duedate,
      time: data.time,
    });
  };

  updateloggedIn = (update) => {
    this.setState({ loggedIn: update });
  };

  isAuth = async () => {
    try {
      const response = await fetch(`${config.url}/verify`, {
        method: "GET",
        credentials: "include",
      });
      const parseRes = await response.json();
      if (parseRes.answer === true) {
        this.loadUser(parseRes.user);
        this.updateloggedIn(true);
      } else {
        console.log("No login possible");
        this.updateloggedIn(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  componentDidMount = () => {
    this.isAuth();
  };

  logout = (e) => {
    e.preventDefault();
    document.cookie =
      "webtoken =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    this.updateloggedIn(false);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="ButtonLogout">
            {this.state.loggedIn ? (
              <div onClick={(e) => this.logout(e)}>
                <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Sign out
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <Logo />
          <div className="AppContainer">
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  {!this.state.loggedIn ? (
                    <SignIn
                      loadUser={this.loadUser}
                      updateloggedIn={this.updateloggedIn}
                    />
                  ) : (
                    <Tasks
                      user={this.state.user}
                      tasks={this.state.tasks}
                      updateloggedIn={this.updateloggedIn}
                      loadOneTask={this.loadOneTask}
                    />
                  )}
                </Route>
                <Route path="/addtask">
                  {!this.state.loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <AddTask user={this.state.user} />
                  )}
                </Route>
                <Route exact path="/register">
                  {this.state.loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Register
                      loadUser={this.loadUser}
                      updateloggedIn={this.updateloggedIn}
                    />
                  )}
                </Route>
                <Route path="/changetask">
                  {!this.state.loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <ChangeTask
                      loadUser={this.loadUser}
                      id={this.state.taskID}
                      createdby={this.state.createdby}
                      duedate={this.state.duedate}
                      description={this.state.description}
                    />
                  )}
                </Route>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
