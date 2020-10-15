// ***** imports *****

import React, { Component } from "react";
import TokenService from "../services/token-service";
import "./Landing.css";
import Register from "../Register/Register";

// ***** component *****

export class Landing extends Component {
	// ***** pre-load *****

	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			TokenService.clearAuthToken();
		}
	}

	// ***** rendering *****

	render() {
		return (
			<section className="landingBody">
				<header>
					<h1>Proje<span className = "headerX">X</span></h1>
					<Register />
				</header>
			</section>
		);
	}
}

export default Landing;
