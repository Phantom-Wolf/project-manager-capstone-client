// ***** imports *****

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Project.css";
import ProjectApiService from "../services/project-api-service";
import config from "../config";
import TokenService from "../services/token-service";
import SideNav from "../Sidenav/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskCount from "./TaskCount";

export class Project extends Component {
	state = {
		project: {},
		project_id: "",
		parentTask: [],
		taskOne: [],
		taskTwo: [],
		taskThree: [],
		toggle: false,
		activeIdZero: [],
		activeIdOne: [],
		activeIdTwo: [],
		showIdZero: [],
		showIdOne: [],
		showIdTwo: [],
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
			

			let taskPackage = { project_id: parseInt(project_id) };
			
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

	updateActive(id, lvl) {
		let route;
		let route2;
		switch (parseInt(lvl)) {
			case 0:
				route = "activeIdZero";
				route2 = "showIdZero";
				break;
			case 1:
				route = "activeIdOne";
				route2 = "showIdOne";
				break;
			case 2:
				route = "activeIdTwo";
				route2 = "showIdTwo";
				break;
			default:
				this.setState({ error: "Route Error" });
		}

		let currentList1 = [...this.state[route]];
		let currentList2 = [...this.state[route2]];
		let check = currentList1.includes(id);
		let newAddition = [id];

		if (!check) {
			this.setState({
				[route]: currentList1.concat(newAddition),
				[route2]: currentList2.concat(newAddition),
			});
		} else {
			this.setState({
				[route]: currentList1.filter((task) => task !== id),
			});
		}
	}

	updateShow(id, lvl) {
		let route;
		switch (parseInt(lvl)) {
			case 0:
				route = "showIdZero";
				break;
			case 1:
				route = "showIdOne";
				break;
			case 2:
				route = "showIdTwo";
				break;
			default:
				this.setState({ error: "Route Error" });
		}

		let currentList = [...this.state[route]];
		let check = currentList.includes(id);
		let newAddition = [id];

		if (!check) {
			this.setState({
				[route]: currentList.concat(newAddition),
			});
		} else {
			this.setState({
				[route]: currentList.filter((task) => task !== id),
			});
		}
	}

	updateToggle = () => {
		this.setState({
			toggle: !this.state.toggle,
		});
	};

	// ***** accordian/ conditional show helpers *****

	checkActive(id, lvl) {
		let route;

		switch (parseInt(lvl)) {
			case 0:
				route = "activeIdZero";
				break;
			case 1:
				route = "activeIdOne";
				break;
			case 2:
				route = "activeIdTwo";
				break;
			default:
				this.setState({ error: "Route Error" });
		}
		let currentList = [...this.state[route]];
		let check = currentList.includes(id);

		return check ? "active" : "";
	}

	checkShow(id, lvl, add) {
		let route;
		switch (parseInt(lvl)) {
			case 0:
				route = "showIdZero";
				break;
			case 1:
				route = "showIdOne";
				break;
			case 2:
				route = "showIdTwo";
				break;
			default:
				this.setState({ error: "Route Error" });
		}
		let currentList = [...this.state[route]];
		let check = currentList.includes(id);

		return check ? `${add}` : "";
	}

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

	// ***** action api services *****

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

		e.target.reset();
	};

	handleDelete(id, lvl) {
		let route = this.setPath(lvl);

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

	handleDeleteProject = () => {
		let id = this.state.project_id;

		fetch(`${config.API_ENDPOINT}/api/projects/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				window.location = "/Home";
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	};	
	
	// ***** new task form *****
	
	renderForm(lvl, parent) {
		let outputHTML = "";
		outputHTML = (
			<form className="newProjectForm" onSubmit={this.handleSubmit}>
				<input
					name="newTaskName"
					type="text"
					required
					className="newProjectInput"
					onChange={(e) => this.updateNewTask(e.target.value)}
				></input>
				<input name="level" value={lvl} hidden />
				<input name="parent" value={parent} hidden />
				<button className="formButton" type="submit">
					Add Task
				</button>
			</form>
		);

		return outputHTML;
	}

	render() {

		return (
			<div className="projectBody">
				<SideNav />
				<section>
					<header>
						<div className="projectName">
							<h2>
								<FontAwesomeIcon icon="folder-open" className="treeIcon" />
								{this.state.project.project_name}
							</h2>
							<FontAwesomeIcon
								icon={this.state.toggle ? "window-close" : "plus-square"}
								className="headerPlus"
								onClick={this.updateToggle}
								style={{ color: "whitesmoke" }}
							/>
							<FontAwesomeIcon
								icon="trash"
								className="headerTrash"
								onClick={this.handleDeleteProject}
							/>
						</div>
					</header>

					{/* start of Projects nesting Ul list */}
					<ul className={`parentListUl`}>
						{/* form to add parentTask tasks to Project*/}
						<li className={`addForm ${this.state.toggle ? "active" : ""}`}>
							<div className="taskGroup lvlProject">
								<form className="newProjectForm" onSubmit={this.handleSubmit}>
									<input
										name="newTaskName"
										type="text"
										required
										className="newProjectInput"
										onChange={(e) => this.updateNewTask(e.target.value)}
									></input>
									<input name="level" value="0" hidden />
									<input name="parent" value="null" hidden />
									<button className="formButton" type="submit">
										Add Task
									</button>
								</form>
							</div>
						</li>
						{this.state.parentTask.map((task) => {
							// ********************************* parent tasks *********************************
							return (
								<li key={task.id}>
									<div
										className={`taskGroup  ${
											task.completion_status === true ? "completedColor" : "lvlZero"
										}`}
									>
										{/* parentTask link & title */}
										<NavLink
											to={{
												pathname: `/Task/${task.id}`,
												state: {
													route: "parentTask",
													route2: "parentTask",
													route3: "taskOne",
													parentTask: this.state.parentTask,
													taskOne: this.state.taskOne,
													taskTwo: this.state.taskTwo,
													taskThree: this.state.taskThree,
													project_id: this.state.project_id,
													project_name: this.state.project.project_name,
													task: task,
												},
											}}
											className="taskTitle"
										>
											<h4>{task.title} </h4>
										</NavLink>

										{TaskCount(task.id, this.state.taskOne)}

										{/* parentTask action buttons */}
										<FontAwesomeIcon
											icon={
												this.state.activeIdZero.includes(task.id) ? "window-close" : "plus-square"
											}
											className="plusIcon"
											onClick={() => this.updateActive(task.id, task.task_level)}
										/>
										<FontAwesomeIcon
											icon="trash"
											className="trashIcon"
											onClick={() => this.handleDelete(task.id, task.task_level)}
										/>
										<FontAwesomeIcon
											icon="chevron-right"
											className={`chevronIcon ${this.checkShow(
												task.id,
												task.task_level,
												"rotate"
											)}`}
											onClick={() => this.updateShow(task.id, task.task_level)}
										/>
									</div>

									{/* start of parentTask nesting Ul list */}
									<ul className={`currentUl ${this.checkShow(task.id, task.task_level, "show")}`}>
										{/* form to add taskOne tasks to parentTask Ul*/}
										<li className={`addForm ${this.checkActive(task.id, task.task_level)}`}>
											<div className="taskGroup lvlOne">
												{this.renderForm(task.task_level + 1, task.id)}
											</div>
										</li>

										{this.state.taskOne.map((task1) => {
											if (task1.parent_id === task.id) {
												// ********************************* taskOne tasks *********************************
												return (
													<li key={task1.id}>
														<div
															className={`taskGroup  ${
																task1.completion_status === true ? "completedColor" : "lvlOne"
															}`}
														>
															{/* taskOne link & title */}
															<NavLink
																to={{
																	pathname: `/Task/${task1.id}`,
																	state: {
																		route: "taskOne",
																		route2: "parentTask",
																		route3: "taskTwo",
																		parentTask: this.state.parentTask,
																		taskOne: this.state.taskOne,
																		taskTwo: this.state.taskTwo,
																		taskThree: this.state.taskThree,
																		project_id: this.state.project_id,
																		project_name: this.state.project.project_name,
																		task: task1,
																	},
																}}
																className="taskTitle"
															>
																<h4>{task1.title} </h4>
															</NavLink>

															{TaskCount(task1.id, this.state.taskTwo)}

															{/* taskOne action buttons */}
															<FontAwesomeIcon
																icon={
																	this.state.activeIdOne.includes(task1.id)
																		? "window-close"
																		: "plus-square"
																}
																className="plusIcon"
																onClick={() => this.updateActive(task1.id, task1.task_level)}
															/>
															<FontAwesomeIcon
																icon="trash"
																className="trashIcon"
																onClick={() => this.handleDelete(task1.id, task1.task_level)}
															/>
															<FontAwesomeIcon
																icon="chevron-right"
																className={`chevronIcon ${this.checkShow(
																	task1.id,
																	task1.task_level,
																	"rotate"
																)}`}
																onClick={() => this.updateShow(task1.id, task1.task_level)}
															/>
														</div>

														{/* start of taskOnes nesting Ul list */}
														<ul
															className={`currentUl ${this.checkShow(
																task1.id,
																task1.task_level,
																"show"
															)}`}
														>
															{/* form to add taskTwo tasks to taskOne Ul*/}
															<li
																className={`addForm ${this.checkActive(
																	task1.id,
																	task1.task_level
																)}`}
															>
																<div className="taskGroup lvlTwo">
																	{this.renderForm(task1.task_level + 1, task1.id)}
																</div>
															</li>
															{this.state.taskTwo.map((task2) => {
																if (task2.parent_id === task1.id) {
																	// ********************************* taskTwo tasks *********************************
																	return (
																		<li key={task2.id}>
																			<div
																				className={`taskGroup  ${
																					task2.completion_status === true
																						? "completedColor"
																						: "lvlTwo"
																				}`}
																			>
																				{/* taskTwo link & title */}
																				<NavLink
																					to={{
																						pathname: `/Task/${task2.id}`,
																						state: {
																							route: "taskTwo",
																							route2: "taskOne",
																							route3: "taskThree",
																							parentTask: this.state.parentTask,
																							taskOne: this.state.taskOne,
																							taskTwo: this.state.taskTwo,
																							taskThree: this.state.taskThree,
																							project_id: this.state.project_id,
																							project_name: this.state.project.project_name,
																							task: task2,
																						},
																					}}
																					className="taskTitle"
																				>
																					<h4>{task2.title} </h4>
																				</NavLink>

																				{TaskCount(task2.id, this.state.taskThree)}

																				{/* taskTwo action buttons */}
																				<FontAwesomeIcon
																					icon={
																						this.state.activeIdTwo.includes(task2.id)
																							? "window-close"
																							: "plus-square"
																					}
																					className="plusIcon"
																					onClick={() =>
																						this.updateActive(task2.id, task2.task_level)
																					}
																				/>
																				<FontAwesomeIcon
																					icon="trash"
																					className="trashIcon"
																					onClick={() =>
																						this.handleDelete(task2.id, task2.task_level)
																					}
																				/>
																				<FontAwesomeIcon
																					icon="chevron-right"
																					className={`chevronIcon ${this.checkShow(
																						task2.id,
																						task2.task_level,
																						"rotate"
																					)}`}
																					onClick={() =>
																						this.updateShow(task2.id, task2.task_level)
																					}
																				/>
																			</div>

																			{/* start of taskTwos nesting Ul list */}
																			<ul
																				className={`currentUl ${this.checkShow(
																					task2.id,
																					task2.task_level,
																					"show"
																				)}`}
																			>
																				{/* form to add taskThree tasks to taskTwo Ul*/}
																				<li
																					className={`addForm ${this.checkActive(
																						task2.id,
																						task2.task_level
																					)}`}
																				>
																					<div
																						className={`taskGroup  ${
																							task1.completion_status === true
																								? "completedColor"
																								: "lvlThree"
																						}`}
																					>
																						{this.renderForm(task2.task_level + 1, task2.id)}
																					</div>
																				</li>
																				{this.state.taskThree.map((task3) => {
																					if (task3.parent_id === task2.id) {
																						// ********************************* taskThree tasks *********************************
																						return (
																							<li key={task3.id}>
																								<div
																									className={`taskGroup  ${
																										task3.completion_status === true
																											? "completedColor"
																											: "lvlThree"
																									}`}
																								>
																									{/* taskThree link & title */}
																									<NavLink
																										to={{
																											pathname: `/Task/${task3.id}`,
																											state: {
																												route: "taskThree",
																												route2: "taskTwo",
																												route3: "taskThree",
																												parentTask: this.state.parentTask,
																												taskOne: this.state.taskOne,
																												taskTwo: this.state.taskTwo,
																												taskThree: this.state.taskThree,
																												project_id: this.state.project_id,
																												project_name: this.state.project
																													.project_name,
																												task: task3,
																											},
																										}}
																										className="taskTitle"
																									>
																										<h4>{task3.title} </h4>
																									</NavLink>

																									{/* taskThree action button */}
																									<FontAwesomeIcon
																										icon="trash"
																										className="trashIconEnd"
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
