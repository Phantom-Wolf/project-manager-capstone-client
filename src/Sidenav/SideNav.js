// ***** imports *****

import React, { Component } from "react";
import "./SideNav.css";
import { NavLink } from "react-router-dom";
import TokenService from "../services/token-service";
import config from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ***** component *****

export class SideNav extends Component {
	state = {
		projects: [],
		contributor_projects: [],
		error: null,
		new_project: {
			value: null,
			toggle: false,
		},
	};

	// ***** pre-load *****

	componentWillMount() {
		// fetch projects from DB

		fetch(`${config.API_ENDPOINT}/api/projects`, {
			method: "GET",
			headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
		})
			.then((projectRes) => {
				if (!projectRes.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				return projectRes.json();
			})
			.then((response) => {
				this.setState({
					projects: response,
				});

				// contributor call

				fetch(`${config.API_ENDPOINT}/api/contributor`, {
					method: "GET",
					headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
				})
					.then((contributorRes) => {
						if (!contributorRes.ok) {
							throw new Error("Something went wrong, please try again later.");
						}
						return contributorRes.json();
					})
					.then((response) => {
						this.setState({
							contributor_projects: response,
						});
					})
					.catch((err) => {});
			})
			.catch((err) => {});
		// fetch contributor projects from DB
	}

	// ***** update state *****

	updateNewProject(newProject) {
		this.setState({
			new_project: {
				value: newProject,
				toggle: this.state.new_project.toggle,
			},
		});
	}

	// ***** project submission API *****

	handleNewProjectSubmit = () => {
		let newProject = { project_name: this.state.new_project.value };

		console.log("new Project", newProject);

		fetch(`${config.API_ENDPOINT}/api/projects`, {
			method: "POST",
			body: JSON.stringify(newProject),
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				// ... convert it to json
				return response.json();
			})
			.then((data) => {
				// check if there are no results
				if (data.totalItems === 0) {
					throw new Error("No data found");
				}
				console.log("data", data);
				this.setState({
					projects: this.state.projects.concat(data),
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	};


	// ***** helpers *****

	logout = () => {
		TokenService.clearAuthToken();
	};

	Toggle = () => {
		this.setState({
			new_project: {
				value: this.state.new_project.value,
				toggle: !this.state.new_project.toggle,
			},
		});
	};

	openProject = (id) => {
		window.location = `/Project/${id}`
	}

	// ***** rendering *****

	render() {
		// return <section className="SideNav">{this.populateProjects()}</section>;

		return (
			<div className="projectList">
				<h3>Projects</h3>
				<div className="addProject">
					<p className="addProjectButton" onClick={this.Toggle}>
						New Project
					</p>
					<form
						className="newProjectForm"
						style={{
							display: this.state.new_project.toggle ? "block" : "none",
						}}
					>
						<input
							name="new-project-input"
							type="text"
							required
							id="newProjectInput"
							onChange={(e) => this.updateNewProject(e.target.value)}
						></input>
						<FontAwesomeIcon icon="plus-square" onClick={this.handleNewProjectSubmit} />
					</form>
				</div>

				<ul className="projectListUL">
					{this.state.projects.map((project) => {
						return (
							<li key={project.id}>
								<NavLink to={`/Project/${project.id}`} className="navProjectTitle">
									<p>{project.project_name}</p>
								</NavLink>
							</li>
						);
					})}
				</ul>
				<ul className="contributorProjectListUL">
					{this.state.contributor_projects.map((project) => {
						return (
							<li key={project.id}>
								<NavLink to={`/Project/${project.id}`} className="navProjectTitle">
									<p>{project.project_name}**</p>
								</NavLink>
							</li>
						);
					})}
				</ul>

				<NavLink
					onClick={this.logout}
					to={`/Landing`}
					className="logout"
					// style={{
					// 	display: this.state.isToggle || window.innerWidth > 1100 ? "block" : "none",
					// }}
				>
					<h3>Sign Out</h3>
				</NavLink>
			</div>
		);
	}
}

export default SideNav;
