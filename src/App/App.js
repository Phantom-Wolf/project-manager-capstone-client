// imports

import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import Signin from "../Signin/Signin";
import Home from "../Home/Home";
import Landing from "../Landing/Landing";
import Project from "../Project/Project";
import Task from "../Task/Task";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";

// component
export class App extends Component {
	constructor() {
		state = {};
	}

	// routing
	renderMainRoutes() {
		return (
			<Switch>
				<PrivateRoute exact path="/" component={Landing} />
				<PublicOnlyRoute path="/Landing" component={Landing} />
				<PublicOnlyRoute path="/SignIn" component={Signin} />
				<PrivateRoute path="/Home" component={Home} />
				<PrivateRoute path="/Task/:task_id" component={Task} />
				<PrivateRoute path="/Project/:project_id" component={Project} />
			</Switch>
		);
	}

	render() {
		return (
			<div className="App">
				<main>{this.renderMainRoutes()}</main>
			</div>
		);
	}
}

export default App;
