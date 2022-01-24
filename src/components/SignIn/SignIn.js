import React from "react";
import { Link } from "react-router-dom";

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
        <label htmlFor="email">Email: </label>
        <br></br>
        <input
          onChange={this.onEmailInput}
          type="email"
          id="email"
          name="email"
        ></input>
        <br></br>
        <label htmlFor="password">Password: </label>
        <br></br>
        <input
          onChange={this.onPasswordInput}
          type="password"
          id="password"
          name="password"
        ></input>
        <br></br>
        <br></br>
        <Link to="/tasks">
          <button
            onClick={this.onSubmitSignIn}
            onKeyPress={this.handleKeypress}
          >
            Sign In
          </button>
        </Link>
        <br></br>
        <br></br>
        <label>Not yet registered? </label>
        <Link to="/register">
          <button>Sign up!</button>
        </Link>
      </div>
    );
  }
}

export default SignIn;
