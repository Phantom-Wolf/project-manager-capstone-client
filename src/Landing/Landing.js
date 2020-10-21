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
					<h1>
						Proje<span className="headerX">X</span>
					</h1>
				</header>
				<p className="appStory"> A complex project is less daunting and easier to manage when it can be broken
				down into smaller parts. <br/>You can do that and more with Projex, a straightforward web application
				that makes every project manageable.</p>
				<Register />
			</section>
		);
	}
}

export default Landing;
