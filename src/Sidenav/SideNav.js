// ***** imports *****

import React, { Component } from "react";
import "./SideNav.css";
import { NavLink, Link } from "react-router-dom";
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
		activeProject: null,
		toggleBars: false,
	};

	// ***** pre-load *****

	componentDidMount() {
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
			})
			.catch((err) => {});

		window.onresize = () => {
			if (window.innerWidth > 1100) {
				this.setState({
					toggleBars: true,
				});
			}
		};

		if (window.location.pathname === "/Home") {
			this.setState({
				toggleBars: true,
			});
		}
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

	setActive(id) {
		this.setState();
	}

	// ***** project submission API *****

	handleNewProjectSubmit = (e) => {
		e.preventDefault();
		let newProject = { project_name: this.state.new_project.value };

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
				this.setState({
					projects: this.state.projects.concat(data),
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});

		e.target.reset();
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

	handleDisplay = () => {
		this.setState({
			toggleBars: !this.state.toggleBars,
		});
	};

	openProject = (id) => {
		window.location = `/Project/${id}`;
	};

	// ***** rendering *****

	render() {
		return (
			<div className="projectList">
				<FontAwesomeIcon icon="bars" className="barsIcon" onClick={this.handleDisplay} />
				<div
					className={
						this.state.toggleBars === true || window.innerWidth > 1100 ? "showNav" : "hideNav"
					}
				>
					<header>
						<h3>Projects</h3>
					</header>
					<div className="addProject">
						<p className="addProjectButton" onClick={this.Toggle}>
							+ New Project
						</p>
						<form
							className="sideNavForm"
							style={{
								display: this.state.new_project.toggle ? "block" : "none",
							}}
							onSubmit={this.handleNewProjectSubmit}
						>
							<input
								name="new-project-input"
								type="text"
								required
								className="sideNavInput"
								onChange={(e) => this.updateNewProject(e.target.value)}
							></input>
							<button type="submit">Add</button>
						</form>
					</div>

					<ul className="projectListUL">
						{this.state.projects.map((project) => {
							return (
								<li key={project.id}>
									<Link to={`/Project/${project.id}`} className="navProjectTitle">
										<FontAwesomeIcon icon="folder-open" className="treeIcon" />
										<p className="projectLinkName">{project.project_name}</p>
									</Link>
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
						<h3 className="logoutName">Sign Out</h3>
					</NavLink>
				</div>
			</div>
		);
	}
}

export default SideNav;
