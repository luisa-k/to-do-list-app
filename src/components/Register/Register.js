import React from 'react';
import {
    Link
} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameInput = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmailInput = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordInput = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = async () => {
        const response = await fetch('http://localhost:5000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        const parseRes = await response.json();
        localStorage.setItem("token", parseRes.token);
        if (parseRes.user[0]) {
            this.props.loadUser(parseRes.user[0]);
            this.props.updateloggedIn(true);
        } else {
            console.log('No registering possible')
        }
    }

    render() {
        return (
            <div>
                <label htmlFor="name">Name: </label><br></br>
                <input onChange={this.onNameInput} type="text" id="name" name="name"></input><br></br>
                <label htmlFor="email">Email: </label><br></br>
                <input onChange={this.onEmailInput} type="text" id="email" name="email"></input><br></br>
                <label htmlFor="password">Password: </label><br></br>
                <input onChange={this.onPasswordInput} type="text" id="password" name="password"></input><br></br><br></br>
                <button onClick={this.onSubmitRegister}>Register</button><br></br><br></br>
                <label>Already registered? </label>
                <Link to="/">
                    <button>Sign in!</button>
                </Link>
            </div>
        )
    }
}

export default Register;