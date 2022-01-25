import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

class SignIn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      signInEmail: "",
      signInPassword: "",
      user: {},
    };
  }

  onEmailInput = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordInput = (event) => {
    this.setState({ signInPassword: event.target.value });
  };
  loadTasks = (parseRes) => {
    fetch("http://localhost:5000/tasks", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        createdby: this.state.user.id,
      }),
    })
      .then((response) => response.json())
      .then((tasks) => {
        this.props.loadTasks(tasks);
        this.props.updateloggedIn(true);
      });
  };
  onSubmitSignIn = async () => {
    const response = await fetch("http://localhost:5000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    });
    const parseRes = await response.json();
    if (parseRes.user && parseRes.user[0].id) {
      this.setState({ user: parseRes.user[0] });
      this.props.updateloggedIn(true);
      this.loadTasks();
    } else {
      console.log("No login possible");
    }
  };

  handleKeypress = (e) => {
    if (e.keyCode === 13) {
      this.onSubmitSignIn();
    }
  };

  render() {
    return (
      <div className="signIn">
        <h2>Login</h2>
        <div className="input-Container">
          <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
          <input
            onChange={this.onEmailInput}
            type="email"
            id="email"
            name="email"
            placeholder="E-Mail"
          ></input>
        </div>
        <div className="input-Container">
          <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
          <input
            onChange={this.onPasswordInput}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          ></input>
        </div>
        <div className="buttons-signin">
          <button
            className="signInBtn"
            onClick={this.onSubmitSignIn}
            onKeyPress={this.handleKeypress}
          >
            Sign In
          </button>
          <label>
            Not yet registered? <Link to="/register">Sign up!</Link>
          </label>
        </div>
      </div>
    );
  }
}

export default SignIn;
