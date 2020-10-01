import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-style-icons";


library.add(faBars,faCodeBranch);

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<App />
		</React.StrictMode>
		,
	</BrowserRouter>,
	document.getElementById("root")
);


