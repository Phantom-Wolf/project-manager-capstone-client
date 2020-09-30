import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Task from "./Task";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<Task />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
