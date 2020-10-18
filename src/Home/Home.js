// ***** imports *****

import React, { Component } from "react";
import "./Home.css";
import SideNav from "../Sidenav/SideNav";

// ***** component *****

export class Home extends Component {
	// ***** rendering *****

	render() {
		return (
			<div className="homeBody">
				<SideNav />
				<div className="homeMain"></div>
			</div>
		);
	}
}

export default Home;
