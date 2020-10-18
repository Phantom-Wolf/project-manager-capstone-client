import config from "../config";
import TokenService from "../services/token-service";

const ProjectApiService = {
	grabProject(id) {
		return fetch(`${config.API_ENDPOINT}/api/projects/${id}`, {
			method: "GET",
			headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
		}).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()));
	},

	grabTasks(id, path) {
		return fetch(`${config.API_ENDPOINT}/api/${path}/getAll`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(id),
		}).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()));
	},

	postTask(path, newTask) {
		fetch(`${config.API_ENDPOINT}/api/${path}`, {
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
				console.log("response data", data);
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	},

	deleteProject(id) {
		fetch(`${config.API_ENDPOINT}/api/projects/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
	}
};

export default ProjectApiService;
