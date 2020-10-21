import config from "../config";
import TokenService from "../services/token-service";

const TaskApiService = {
	updateTaskComplete(route, id, stateData) {
		return fetch(`${config.API_ENDPOINT}/api/${route}/${id}`, {
			method: "PATCH",
			body: JSON.stringify(stateData),
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
	postNote(route, stateData) {
		let newRoute;

		switch (route) {
			case "parentTask":
				newRoute = "parentNote";
				break;
			case "taskOne":
				newRoute = "noteOne";
				break;
			case "taskTwo":
				newRoute = "noteTwo";
				break;
			case "taskThree":
				newRoute = "noteThree";
				break;
			default:
				newRoute = "";
		}

		return fetch(`${config.API_ENDPOINT}/api/${newRoute}`, {
			method: "POST",
			body: JSON.stringify(stateData),
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		});
    },
    
    deleteNote(route,id) {
       return  fetch(`${config.API_ENDPOINT}/api/${route}/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
    },

	getCheck(id, list) {
		let count = 0;
		let completed = 0;

		for (let item of list) {
			if (item.parent_id === id) {
				count = count + 1;
				if (item.completion_status === true) {
					completed = completed + 1;
				}
			}
		}

		let responseObject = { count, completed };
		return responseObject;
	},

	getNewRoute(route) {
		let newRoute;

		switch (route) {
			case "parentTask":
				newRoute = "parentNote";
				break;
			case "taskOne":
				newRoute = "noteOne";
				break;
			case "taskTwo":
				newRoute = "noteTwo";
				break;
			case "taskThree":
				newRoute = "noteThree";
				break;
			default:
				newRoute = "";
		}

		return newRoute;
	},
};

export default TaskApiService;
