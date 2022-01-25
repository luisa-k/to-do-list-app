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
  BrowserRouter,
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
                  <AddTask user={this.state.user} />
                </Route>
                <Route exact path="/register">
                  <Register
                    loadUser={this.loadUser}
                    updateloggedIn={this.updateloggedIn}
                  />
                </Route>
                <Route path="/changetask">
                  <ChangeTask
                    loadUser={this.loadUser}
                    id={this.state.taskID}
                    createdby={this.state.createdby}
                    duedate={this.state.duedate}
                    description={this.state.description}
                  />
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
