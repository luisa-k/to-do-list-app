import React from 'react';
import {
    Link
} from "react-router-dom";

class SignIn extends React.Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailInput = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordInput = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = async () => {
        const response = await fetch('http://localhost:5000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        const parseRes = await response.json();
        localStorage.setItem("token", parseRes.token);
        if (parseRes.user[0].id) {
            this.props.loadUser(parseRes.user[0])
            fetch('http://localhost:5000/tasks', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    createdby: parseRes.user[0].id,
                })
            })
                .then(response => response.json())
                .then(tasks => {
                    this.props.loadTasks(tasks);
                    this.props.updateloggedIn(true);
                })
        } else {
            console.log('No login possible')
        }
}

    handleKeypress = (e) => { if (e.keyCode === 13) { this.onSubmitSignIn(); } };

    render() {
        return (
            <div>
                <label htmlFor="email">Email: </label><br></br>
                <input onChange={this.onEmailInput} type="text" id="email" name="email"></input><br></br>
                <label htmlFor="password">Password: </label><br></br>
                <input onChange={this.onPasswordInput} type="password" id="password" name="password"></input><br></br><br></br>
                <button onClick={this.onSubmitSignIn} onKeyPress={this.handleKeypress}>Sign In</button><br></br><br></br>
                <label>Not yet registered? </label>
                <Link to="/register">
                    <button>Sign up!</button>
                </Link>
            </div>
        )
    }
}

export default SignIn;