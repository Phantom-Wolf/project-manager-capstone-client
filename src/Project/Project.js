// ***** imports *****

import React, { Component, useEffect } from "react";
import "./Project.css";
import ProjectApiService from "../services/project-api-service";
import config from "../config";
import TokenService from "../services/token-service";
import SideNav from "../Sidenav/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Project extends Component {
	state = {
		project: "",
		project_id: "",
		parentTask: [],
		taskOne: [],
		taskTwo: [],
		taskThree: [],
		error: null,
		newTask: "",
	};

	static defaultProps = {
		match: {
			params: {},
		},
	};

	// ***** load/reload API call *****

	handleReload = (project_id) => {
		ProjectApiService.grabProject(project_id)
			.then((data) => {
				this.setState({
					project: data,
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});

		const taskList = ["parentTask", "taskOne", "taskTwo", "taskThree"];

		for (let i = 0; i < taskList.length; i++) {
			console.log(taskList[i]);

			let taskPackage = { project_id: parseInt(project_id) };
			console.log(taskPackage);
			fetch(`${config.API_ENDPOINT}/api/${taskList[i]}/getAll`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
				body: JSON.stringify(taskPackage),
			})
				.then((response) => {
					if (!response.ok) {
						throw response;
					}

					return response.json();
				})
				.then((data) => {
					console.log("completed task:", taskList[i]);
					if (data.totalItems === 0) {
						this.setState({
							[taskList[i]]: [],
						});
					}
					this.setState({
						[taskList[i]]: data,
					});
				})
				.catch((err) => {
					this.setState({
						error: err.message,
					});
				});

			this.setState({
				project_id: project_id,
			});
		}
	};

	componentWillReceiveProps(newProps) {
		let project_id = newProps.match.params.project_id;

		this.handleReload(project_id);
	}

	componentWillMount() {
		let project_id = this.props.match.params.project_id;

		this.handleReload(project_id);
	}

	// ***** update state *****

	updateNewTask(task) {
		this.setState({
			newTask: task,
		});
	}

	// ***** helpers *****

	setPath(data) {
		let route;
		switch (parseInt(data)) {
			case 0:
				route = "parentTask";
				break;
			case 1:
				route = "taskOne";
				break;
			case 2:
				route = "taskTwo";
				break;
			case 3:
				route = "taskThree";
				break;
			default:
				this.setState({ error: "Route Error" });
		}
		return route;
	}

	// ***** new task API *****

	handleSubmit = (e) => {
		e.preventDefault();
		const data = {};

		const formData = new FormData(e.target);

		for (let value of formData) {
			data[value[0]] = value[1];
		}

		let newTask = {
			project_id: this.state.project_id,
			title: data.newTaskName,
			task_level: data.level,
			completion_status: false,
		};

		if (parseInt(data.level) !== 0) {
			newTask.parent_id = data.parent;
		}

		let route = this.setPath(data.level);

		fetch(`${config.API_ENDPOINT}/api/${route}`, {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw response;
				}
				return response.json();
			})
			.then((data) => {
				this.setState({
					[route]: this.state[route].concat(data),
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	};

	// ***** delete task *****

	handleDelete(id, lvl) {
		console.log(id, lvl);

		let route = this.setPath(lvl);

		console.log(route);

		fetch(`${config.API_ENDPOINT}/api/${route}/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw response;
				}

				this.setState({
					[route]: this.state[route].filter((task) => task.id !== id),
				});
				return response.json();
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	}

	render() {
		let meta = this.props.match.params.project_id;
		console.log(meta);
		return (
			<div className="projectBody">
				<SideNav />
				<section>
					<header>
						<div className="projectName">
							<h2>{this.state.project.project_name}</h2>
							<FontAwesomeIcon icon="plus-square" className="headerPlus" />
							<FontAwesomeIcon icon="trash" className="headerTrash" />
							<form
								className="newProjectFormParent"
								onSubmit={this.handleSubmit}
								// style={{ display: "none" }}
							>
								<input
									name="newTaskName"
									type="text"
									required
									id="newProjectInput"
									onChange={(e) => this.updateNewTask(e.target.value)}
								></input>
								<input name="level" value="0" hidden />
								<input name="parent" value="null" hidden />
								<button type="submit">
									<FontAwesomeIcon icon="plus-square" />
								</button>
							</form>
						</div>
					</header>
					<ul className="parentListUl">
						{this.state.parentTask.map((task) => {
							return (
								<li key={task.id}>
									<div className="taskGroup lvlZero">
										<h4>{task.title} </h4>
										<FontAwesomeIcon
											icon="trash"
											className="trashIcon"
											onClick={() => this.handleDelete(task.id, task.task_level)}
										/>
									</div>
									<ul>
										<li>
											<div className="taskGroup lvlOne">
												<form className="newProjectForm" onSubmit={this.handleSubmit}>
													<input
														name="newTaskName"
														type="text"
														required
														id="newProjectInput"
														onChange={(e) => this.updateNewTask(e.target.value)}
													></input>
													<input name="level" value={task.task_level + 1} hidden />
													<input name="parent" value={task.id} hidden />
													<button type="submit">
														<FontAwesomeIcon icon="plus-square" />
													</button>
												</form>
											</div>
										</li>
										{this.state.taskOne.map((task1) => {
											if (task1.parent_id === task.id) {
												return (
													<li key={task1.id}>
														<div className="taskGroup lvlOne">
															<h4>{task1.title}</h4>

															<FontAwesomeIcon
																icon="trash"
																className="trashIcon"
																onClick={() => this.handleDelete(task1.id, task1.task_level)}
															/>
														</div>
														<ul>
															<li>
																<div className="taskGroup lvlTwo">
																	<form className="newProjectForm" onSubmit={this.handleSubmit}>
																		<input
																			name="newTaskName"
																			type="text"
																			required
																			id="newProjectInput"
																			onChange={(e) => this.updateNewTask(e.target.value)}
																		></input>
																		<input name="level" value={task1.task_level + 1} hidden />
																		<input name="parent" value={task1.id} hidden />
																		<button type="submit">
																			<FontAwesomeIcon icon="plus-square" />
																		</button>
																	</form>
																</div>
															</li>
															{this.state.taskTwo.map((task2) => {
																if (task2.parent_id === task1.id) {
																	return (
																		<li key={task2.id}>
																			<div className="taskGroup lvlTwo">
																				<h4>{task2.title}</h4>

																				<FontAwesomeIcon
																					icon="trash"
																					className="trashIcon"
																					onClick={() =>
																						this.handleDelete(task2.id, task2.task_level)
																					}
																				/>
																			</div>
																			<ul>
																				<li>
																					<div className="taskGroup lvlThree">
																						<form
																							className="newProjectForm"
																							onSubmit={this.handleSubmit}
																						>
																							<input
																								name="newTaskName"
																								type="text"
																								required
																								id="newProjectInput"
																								onChange={(e) => this.updateNewTask(e.target.value)}
																							></input>
																							<input
																								name="level"
																								value={task2.task_level + 1}
																								hidden
																							/>
																							<input name="parent" value={task2.id} hidden />
																							<button type="submit">
																								<FontAwesomeIcon icon="plus-square" />
																							</button>
																						</form>
																					</div>
																				</li>
																				{this.state.taskThree.map((task3) => {
																					if (task3.parent_id === task2.id) {
																						return (
																							<li key={task3.id}>
																								<div className="taskGroup lvlThree">
																									<h4>{task3.title}</h4>
																									<FontAwesomeIcon
																										icon="trash"
																										className="trashIcon"
																										onClick={() =>
																											this.handleDelete(task3.id, task3.task_level)
																										}
																									/>
																								</div>
																							</li>
																						);
																					}
																				})}
																			</ul>
																		</li>
																	);
																}
															})}
														</ul>
													</li>
												);
											}
										})}
									</ul>
								</li>
							);
						})}
					</ul>
				</section>
			</div>
		);
	}
}

export default Project;
