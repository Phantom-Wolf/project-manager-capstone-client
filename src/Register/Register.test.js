import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Register from "./Register";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<Register />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
