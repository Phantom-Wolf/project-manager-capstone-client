import React, { Component } from "react";
import "./Task.css";
import config from "../config";
import TokenService from "../services/token-service";
import SideNav from "../Sidenav/SideNav";

export class Task extends Component {
	state = {
		data: "",
		name: "",
		task: {},
		notes: [],
		err: null,
		color: "",
		completion_status: false,
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

		const { taskList, project_name, project_id, task, route } = this.props.location.state;

		this.setState({
			task: task,
			completion_status: task.completion_status,
		});

		let reqBody = { parent_id: task.id };
		console.log("reqBody", reqBody);

		fetch(`${config.API_ENDPOINT}/api/${route}/getNotes`, {
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

		fetch(`${config.API_ENDPOINT}/api/Users/id`, {
			method: "GET",
			headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
		})
			.then((Res) => {
				if (!Res.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				return Res.json();
			})
			.then((response) => {
				this.setState({
					data: response.id,
					name: response.username,
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
    }
    
    renderCompletionText() {
        let completion_status = this.props.location.state.task.completion_status

        let count = 0
        let completed = 0
        let list = this.props.location.state.taskList

        for (let item of list) {
            if (item.parent_id === this.props.location.state.task.id) {
                count = count + 1;
                if (item.completion_status === true) {
                    completed = completed + 1;
                }
            }
        }

        console.log(completed, count)

        let htmlOutput;

        if (completion_status === true) {
            htmlOutput = (
                <div className = "completionStatus">
                    <h4>This task has been completed!</h4>
                </div>
            )
        } else if (count === 0) {
            htmlOutput = (
                <div className = "completionStatus">
                    <p></p>
                </div>
            )
        }


    }

	render() {
		let color = this.state.color;
		return (
			<div className="taskBody">
				<SideNav />
				<section>
					<header>
						<h2>{this.props.location.state.project_name}</h2>
					</header>

					<h3 className="taskName" style={{ background: color }}>
                        {this.props.location.state.task ? `${this.props.location.state.task.title}` : ""}
                        {this.renderCompletionText()}
					</h3>
				</section>
			</div>
		);
	}
}

export default Task;
