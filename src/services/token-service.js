import config from "../config";

const TokenService = {
	saveAuthToken(token) {
		window.localStorage.setItem(config.TOKEN_KEY, token);
	},
	getAuthToken() {
		return window.localStorage.getItem(config.TOKEN_KEY);
	},
	clearAuthToken() {
		window.localStorage.removeItem(config.TOKEN_KEY);
	},
	hasAuthToken() {
		return !!TokenService.getAuthToken();
	},
	makeBasicAuthToken(user_email, user_password) {
		return window.btoa(`${user_email}:${user_password}`);
	},
};

export default TokenService;
