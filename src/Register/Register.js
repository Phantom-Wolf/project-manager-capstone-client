// imports
import React, { Component } from "react";
import ValidateForm from "../ValidateForm/ValidateForm";
import config from "../config";
import "./Register.css";

// component
export class Register extends Component {
	constructor(props) {
		state = {
			username: {
				value: "",
				touched: false,
			},
			email: {
				value: "",
				touched: false,
			},
			password: {
				value: "",
				touched: false,
			},
			confirmPassword: {
				value: "",
				touched: false,
			},
			error: null,
			success: null,
		};
	}

	// state update

	updateUsername(username) {
		this.setState({ username: { value: username, touched: true } });
	}

	updateEmail(email) {
		this.setState({ email: { value: email, touched: true } });
	}

	updatePassword(password) {
		this.setState({ password: { value: password, touched: true } });
	}

	updateConfirmPassword(confirmPassword) {
		this.setState({ confirmPassword: { value: confirmPassword, touched: true } });
	}

	// validation

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

	validateEmail() {
		let inputEmail = this.state.email.value;
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
		if (!inputPassword.match(passwordformat)) {
			return "Password must contain 1 upper case, lower case, number and special character";
		}
	}

	validateConfirmPassword() {
		let originalPassword = this.state.password.value;
		let confirmPassword = this.state.confirmPassword.value;
		if (originalPassword !== confirmPassword) {
			return "Passwords to not match";
		}
	}

	// API call

	handleRegister = (e) => {
		e.preventDefault();

		console.log("submitted");
	};

	// helpers

	goToSignin() {
		window.location = "/SignIn";
	}

	render() {
		return (
			<section className="signUpForm">
				<form id="registerForm" onSubmit={this.handleRegister}>
					<h2 className="signUpHeader">Sign Up</h2>
					<div>
						<p>
							Existing User?{" "}
							<span className="clickSignIn" onClick={this.goToSignin}>
								Sign in Here.
							</span>
						</p>
					</div>
					<div>
						<label htmlFor="registerUsername">Username:</label>
						<input
							type="text"
							name="user_name"
							id="signupUsername"
							onChange={(e) => this.updateUsername(e.target.value)}
						/>
						{this.state.username.touched && (
							<ValidateForm className="validateMessage" message={this.validateUsername()} />
						)}
					</div>
					<div>
						<label htmlFor="registerEmail">Email:</label>
						<input
							type="email"
							name="user_email"
							id="signupEmail"
							onChange={(e) => this.updateEmail(e.target.value)}
						/>
						{this.state.email.touched && (
							<ValidateForm className="validateMessage" message={this.validateEmail()} />
						)}
					</div>
					<div>
						<label htmlFor="signupPassword">Password:</label>
						<input
							type="password"
							name="user_password"
							id="signupPassword"
							onChange={(e) => this.updatePassword(e.target.value)}
						/>
						{this.state.password.touched && (
							<ValidateForm className="validateMessage" message={this.validatePassword()} />
						)}
					</div>
					<div>
						<label htmlFor="confirmPass">Confirm Password:</label>
						<input
							type="password"
							id="confirmPass"
							name="confirm_password"
							onChange={(e) => this.updateConfirmPassword(e.target.value)}
						/>
						{this.state.confirmPassword.touched && (
							<ValidateForm className="validateMessage" message={this.validateConfirmPassword()} />
						)}
					</div>
					<div>
						<button
							type="submit"
							disabled={
								this.validateUsername() ||
								this.validateEmail() ||
								this.validatePassword() ||
								this.validateConfirmPassword()
							}
						>
							Sign Up
						</button>
					</div>
				</form>
				{this.state.error && (
					<div>
						<p className="error-message">{this.state.error}</p>
					</div>
				)}
				{this.state.success && (
					<div>
						<p className="success-message">{this.state.success}</p>
					</div>
				)}
			</section>
		);
	}
}

export default Register;