// ***** imports *****

import React, { Component } from "react";
import "./SignIn.css";
import TokenService from "../services/token-service";

// ***** component *****

export class SignIn extends Component {
	constructor(props) {
		this.state = {
			username: {
				value: "",
				touched: false,
			},
			password: {
				value: "",
				touched: false,
			},
			error: null,
		};
	}

	// ***** pre-check *****

	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			TokenService.clearAuthToken();
		}
	}

	// ***** update state *****

	updateUsername(username) {
		this.setState({ username: { value: username, touched: true } });
	}

	updatePassword(password) {
		this.setState({ password: { value: password, touched: true } });
	}

	// ***** validation *****

	validateUsername() {
		let inputUsername = this.state.username.value;
		let space = /\s/g.test(inputUsername);
		if (inputUsername.length === 0) {
			return "Username is required";
		} else if (inputUsername.length < 3) {
			return "Username must be at least 3 characters long";
		} else if (inputUsername.length > 15) {
			return "Username cannot exceed 15 characters";
		} else if (space == true) {
			return "Check username for spaces";
		}
	}

	validatePassword() {
		let inputPassword = this.state.password.value;
		// at least one number, one lowercase and one uppercase letter, one special character
		// at least eight characters that are letters, numbers or the underscore
		let passwordformat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
		let space = /\s/g.test(inputPassword);
		if (!inputPassword.match(passwordformat)) {
			return "Password must contain 1 upper case, lower case, number and special character";
		}
		if (space == true) {
			return "Password cannot have any spaces";
		}
	}

	// ***** API call *****

	handleSignIn = (e) => {
		e.preventDefault();
		// grab values stored in state at time of submission and format them for API call
		const logUser = {
			username: this.state.username.value,
			user_password: this.state.password.value,
		};
		// double check that the values exist before sending
		for (const property in logUser) {
			if (logUser[property] === "") {
				this.setState({
					error: `${property} is not valid`,
				});
			}
		}

		console.log(logUser);
	};

	// ***** helpers *****

	returnLanding() {
		window.location = "/Landing";
	}

	render() {
		return (
			<section className="loginForm">
				<form onSubmit={this.handleSignIn}>
					<p className="existingUser">Sign in to onTrack</p>
					<div className="logUsername">
						<label htmlFor="logUsername">Username:</label>
						<input
							type="username"
							name="loginUsername"
							id="logUsername"
							onChange={(e) => this.updateUsername(e.target.value)}
						/>
					</div>
					<div className="logPass">
						<label htmlFor="logPassword">Password:</label>
						<input
							type="password"
							name="loginPassword"
							id="logPassword"
							onChange={(e) => this.updatePassword(e.target.value)}
						/>
					</div>
					<div>
						<button type="submit" disabled={this.validateUsername() || this.validatePassword()}>
							Login
						</button>
					</div>
					{this.state.error && (
						<div className="error">
							<p>{this.state.error}</p>
						</div>
					)}
					<div>
						<p>Demo: </p>
						<p>U: dunderMifflin</p>
						<p>P: Password1!</p>
						<p>
							New to onTrack?{" "}
							<span className="clickSignUp" onClick={this.returnLanding}>
								Sign up Here.
							</span>
						</p>
					</div>
				</form>
			</section>
		);
	}
}

export default SignIn;
