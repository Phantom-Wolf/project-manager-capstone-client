import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SideNav from "./SideNav";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<SideNav />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
