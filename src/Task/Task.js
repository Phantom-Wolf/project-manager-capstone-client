import React, { Component } from "react";
import "./Task.css";
import config from "../config";
import TokenService from "../services/token-service";
import SideNav from "../Sidenav/SideNav";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskApiService from "./TaskService";

export class Task extends Component {
	state = {
		data: "",
		name: "",
		task: {},
		notes: [],
		err: null,
		color: "",
		completion_status: false,
		toggleNote: false,
		addNoteValue: "",
	};

	static defaultProps = {
		match: {
			params: {},
		},
	};

	// ***** preload API *****

	componentDidMount() {
		let taskRoute = this.props.location.state.route;

		let color;

		switch (taskRoute) {
			case "parentTask":
				color = "rgb(115, 27, 27)";
				break;
			case "taskOne":
				color = "rgb(156, 70, 30)";
				break;
			case "taskTwo":
				color = "rgb(228, 150, 0)";
				break;
			case "taskThree":
				color = "rgb(51, 75, 56)";
				break;
			default:
				color = "rgb(39, 90, 92)";
		}

		this.setState({
			color: color,
		});

		const {
			parentTask,
			taskOne,
			taskTwo,
			taskThree,
			project_name,
			project_id,
			task,
			route,
			route2,
			route3,
		} = this.props.location.state;

		this.setState({
			task: task,
			completion_status: task.completion_status,
		});

		let reqBody = { parent_id: task.id };

		let notePath = TaskApiService.getNewRoute(route);

		fetch(`${config.API_ENDPOINT}/api/${notePath}/getAll`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(reqBody),
		})
			.then((response) => {
				if (!response.ok) {
					throw response;
				}
				return response.json();
			})
			.then((data) => {
				this.setState({
					notes: this.state.notes.concat(data),
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});

		// fetch(`${config.API_ENDPOINT}/api/Users/id`, {
		// 	method: "GET",
		// 	headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
		// })
		// 	.then((Res) => {
		// 		if (!Res.ok) {
		// 			throw new Error("Something went wrong, please try again later.");
		// 		}
		// 		return Res.json();
		// 	})
		// 	.then((response) => {
		// 		this.setState({
		// 			data: response.id,
		// 			name: response.username,
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		this.setState({
		// 			error: err.message,
		// 		});
		// 	});

		let stateData = {
			project_id: task.project_id,
			parent_id: task.parent_id,
			title: task.title,
			task_level: task.task_level,
			completion_status: !task.completion_status,
		};

		let checkId = task.id;
		let list = this.props.location.state[route3];

		let elem = TaskApiService.getCheck(checkId, list);

		if (task.completion_status === true && elem.count > 0 && elem.completed !== elem.count) {
			TaskApiService.updateTaskComplete(route, task.id, stateData)
				.then((TaskRes) => {
					if (!TaskRes.ok) {
						throw new Error("Something went wrong, please try again later.");
					}
					this.setState({
						task: {
							...this.props.location.state.task,
							completion_status: !this.props.location.state.task.completion_status,
						},
					});
				})
				.catch((err) => {
					this.setState({
						err: err.message,
					});
				});
		}
	}

	renderCompletionText() {
		let completion_status = this.state.task.completion_status;
		let list = this.props.location.state[this.props.location.state.route3];
		let elem = TaskApiService.getCheck(this.props.location.state.task.id, list);

		let htmlOutput;

		if (elem.count > 0 && elem.completed === elem.count && completion_status !== true) {
			htmlOutput = (
				<div className="completionStatus">
					<h4>
						All connected sub-tasks have been completed!
						<br />
						Do you feel ready to consider this task completed?
						<span className="actionSpan">
							<FontAwesomeIcon
								icon="square"
								className="completeSquareIcon"
								onClick={() => this.handleUpdate()}
							/>
						</span>
					</h4>
				</div>
			);
		} else if (completion_status === true) {
			htmlOutput = (
				<div className="completionStatus">
					<h4>
						This task has been completed!
						<span className="actionSpan">
							<FontAwesomeIcon
								icon="check-square"
								className="completeSquareIcon"
								onClick={() => this.handleUpdate()}
							/>
						</span>
					</h4>
				</div>
			);
		} else if (elem.count === 0) {
			htmlOutput = (
				<div className="completionStatus">
					<h4>
						Have you completed this task?
						<span className="actionSpan">
							<FontAwesomeIcon
								icon="square"
								className="completeSquareIcon"
								onClick={() => this.handleUpdate()}
							/>
						</span>
					</h4>
				</div>
			);
		} else if (elem.completed < elem.count) {
			htmlOutput = (
				<div className="completionStatus">
					<h4>
						You have {elem.count - elem.completed} more{" "}
						{elem.count - elem.completed === 1 ? "sub-task" : "sub-tasks"} to complete until this
						task is considered complete.
					</h4>
				</div>
			);
		}

		return htmlOutput;
	}

	handleUpdate() {
		let { route, task } = this.props.location.state;

		let newTask = this.state.task;

		let stateData = {
			project_id: newTask.project_id,
			parent_id: newTask.parent_id,
			title: newTask.title,
			task_level: newTask.task_level,
			completion_status: !newTask.completion_status,
		};

		TaskApiService.updateTaskComplete(route, task.id, stateData)
			.then((TaskRes) => {
				if (!TaskRes.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				this.setState({
					task: { ...this.state.task, completion_status: !this.state.task.completion_status },
				});
			})
			.catch((err) => {
				this.setState({
					err: err.message,
				});
			});
	}

	toggleNoteOn = () => {
		this.setState({
			toggleNote: !this.state.toggleNote,
		});
	};

	toggleNoteOff = () => {
		this.setState({
			toggleNote: false,
		});
	};

	updateNoteValue(note) {
		this.setState({
			addNoteValue: note,
		});
	}

	handleNoteSubmit = (e) => {
		e.preventDefault();
		const data = {};

		const formData = new FormData(e.target);

		for (let value of formData) {
			data[value[0]] = value[1];
		}

		let stateData = {
			parent_id: this.props.location.state.task.id,
			note: data.note,
			date_created: new Date(),
		};

		console.log(TokenService.getAuthToken());

		TaskApiService.postNote(this.props.location.state.route, stateData)
			.then((response) => {
				if (!response.ok) {
					throw response;
				}
				return response.json();
			})
			.then((data) => {
				this.setState({
					notes: this.state.notes.concat(data),
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});

		e.target.reset();

		console.log(stateData);
	};

	handDeleteNote(id) {
		let route = TaskApiService.getNewRoute(this.props.location.state.route);

		TaskApiService.deleteNote(route, id)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Something went wrong, please try again later.");
                }
                this.setState({
                    notes: this.state.notes.filter(note => note.id !== id)
                })
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	}

	render() {
		let color = this.state.task.completion_status ? "rgb(3, 153, 15)" : this.state.color;
		return (
			<div className="taskBody">
				<SideNav />
				<section>
					<NavLink
						to={`/Project/${this.props.location.state.project_id}`}
						className="projectReturn"
					>
						<header>
							<h2>{this.props.location.state.project_name}</h2>
						</header>
					</NavLink>

					<h3 className="taskName" style={{ background: color }}>
						{this.props.location.state.task ? `${this.props.location.state.task.title}` : ""}
					</h3>
					{this.renderCompletionText()}

					<div className="taskNotes">
						<div className="noteHeader">
							<p className="noteHeaderText">Notes:</p>
							<p className="addNoteText" onClick={this.toggleNoteOn}>
								Add Note
								<span className="actionSpan">
									<FontAwesomeIcon icon="plus-square" className="completeSquareIcon" />
								</span>
							</p>
						</div>

						<ul>
							<li className={`notes ${this.state.toggleNote ? "" : "hide"}`}>
								<form className="noteForm" onSubmit={this.handleNoteSubmit}>
									<textarea
										name="note"
										required
										onChange={(e) => this.updateNoteValue(e.target.value)}
									/>

									<div className="noteFormActions">
										<FontAwesomeIcon
											icon="ban"
											className="noteIconCancel"
											onClick={this.toggleNoteOff}
										/>
										<button type="submit">
											<FontAwesomeIcon icon="plus-square" className="noteIconAdd" />
										</button>
									</div>
								</form>
							</li>
							{this.state.notes.map((note) => {
								return (
									<li className="notes">
										<div className="innerNoteTop">
											<p className="pp">
												Date: {new Date(note.date_created).toLocaleDateString()}
												<span className="noteSpan">
													<FontAwesomeIcon
														icon="trash"
														className="noteIconDelete"
														onClick={() => this.handDeleteNote(note.id)}
													/>
												</span>
											</p>
										</div>
										<div className="innerNoteBottom">
											<p>{note.note}</p>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</section>
			</div>
		);
	}
}

export default Task;
