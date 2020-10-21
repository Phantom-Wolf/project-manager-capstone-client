import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../src/App/App";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faBars,
	faCodeBranch,
	faPlusSquare,
	faTrash,
	faChevronRight,
	faWindowClose,
	faSquare,
	faCheckSquare,
	faBan,
	faProjectDiagram,
	faFolderOpen,
	faFolder
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faBars,
	faCodeBranch,
	faPlusSquare,
	faTrash,
	faChevronRight,
	faWindowClose,
	faSquare,
	faCheckSquare,
	faBan,
	faProjectDiagram,
	faFolderOpen,
	faFolder
);

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById("root")
);
