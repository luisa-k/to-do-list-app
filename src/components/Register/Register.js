import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    };
  }

  onNameInput = (event) => {
    this.setState({ registerName: event.target.value });
  };

  onEmailInput = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onPasswordInput = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  onSubmitRegister = async () => {
    const response = await fetch("http://localhost:5000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      }),
    });
    const parseRes = await response.json();
    if (parseRes.user[0]) {
      this.props.loadUser(parseRes.user[0]);
      this.props.updateloggedIn(true);
    } else {
      console.log("No registering possible");
    }
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
        <div className="input-Container">
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          <input
            onChange={this.onNameInput}
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
          ></input>
        </div>
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
          <button className="signInBtn" onClick={this.onSubmitRegister}>
            Register
          </button>
        </div>
        <div>
          <label>
            Already registered? <Link to="/">Sign in!</Link>
          </label>
        </div>
      </div>
    );
  }
}

export default Register;
