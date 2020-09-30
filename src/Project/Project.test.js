import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Project from "./Project";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<Project />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
