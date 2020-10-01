// ***** imports *****

import React, { Component } from "react";
import TokenService from "../services/token-service";
import "./Landing.css";

// ***** component *****

export class Landing extends Component {
	// ***** pre-load *****

	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			TokenService.clearAuthToken();
		}
	}

	render() {
		return <div></div>;
	}
}

export default Landing;
