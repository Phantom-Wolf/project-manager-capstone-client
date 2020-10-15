// ***** imports *****

import React, { Component } from "react";
import "./SignIn.css";
import TokenService from "../services/token-service";
import config from "../config";

// ***** component *****

export class SignIn extends Component {
	state = {
		user_email: {
			value: "",
			touched: false,
		},
		password: {
			value: "",
			touched: false,
		},
		error: null,
	};

	// ***** pre-check *****

	componentWillMount() {
		// check here is not working (changed from did mount to will mount)
		if (TokenService.hasAuthToken()) {
			TokenService.clearAuthToken();
		}
	}

	// ***** update state *****

	updateEmail(email) {
		this.setState({ user_email: { value: email, touched: true } });
	}

	updatePassword(password) {
		this.setState({ password: { value: password, touched: true } });
	}

	// ***** validation *****

	validateEmail() {
		let inputEmail = this.state.user_email.value;
		let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (inputEmail.length === 0) {
			return "Email is required";
		} else if (!inputEmail.match(mailformat)) {
			return "Invalid Email Address";
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
		if (space === true) {
			return "Password cannot have any spaces";
		}
	}

	// ***** API call *****

	handleSignIn = (e) => {
		e.preventDefault();

		const data = {};

		const formData = new FormData(e.target);

		for (let value of formData) {
			data[value[0]] = value[1];
		}

		let { loginEmail, loginPassword } = data;
		if (this.validateEmail(loginEmail) === "") {
			this.setState({
				error: "email is not valid",
			});
		}
		if (this.validatePassword(loginPassword) === "") {
			this.setState({
				error: "password is not valid",
			});
		}

		let stateData = {
			user_email: data.loginEmail,
			user_password: data.loginPassword,
		};

		console.log(stateData);

		this.setState({ error: null });
		fetch(`${config.API_ENDPOINT}/api/auth/login`, {
			method: "POST",
			body: JSON.stringify(stateData),
			headers: {
				"content-type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw response;
				}
				return response.json();
			})

			.then((data) => {
				TokenService.saveAuthToken(data.authToken);

				if (data.totalItems === 0) {
					throw new Error("No data found");
				}
				window.location = "/Home";
			})
			.catch((error) => {
				try {
					error.json().then((body) => {
						this.setState({
							error: body.error,
						});
					});
				} catch (e) {
					this.setState({
						error: error,
					});
				}
			});
	};

	// ***** helpers *****

	returnLanding() {
		window.location = "/Landing";
	}

	// ***** rendering *****

	render() {
		return (
			<section className="loginForm">
				<form onSubmit={this.handleSignIn}>
					<p className="existingUser">Sign in to onTrack</p>
					<div className="logEmail">
						<label htmlFor="logEmail">Email:</label>
						<input
							type="email"
							name="loginEmail"
							id="logEmail"
							onChange={(e) => this.updateEmail(e.target.value)}
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
						<button type="submit" disabled={this.validateEmail() || this.validatePassword()}>
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
						<p>E: dunder@outlook.com</p>
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
