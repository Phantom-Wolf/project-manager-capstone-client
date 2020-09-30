import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Signin from "./Signin";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<Signin />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
