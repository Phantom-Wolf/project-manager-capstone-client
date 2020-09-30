import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Landing from "./Landing";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<Landing />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
