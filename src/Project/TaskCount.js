import React from "react";
import "./Project.css";

function TaskCount(id, list) {
	let completed = 0;
	let count = 0;

	for (let item of list) {
		if (item.parent_id === id) {
			count = count + 1;
			if (item.completion_status === true) {
				completed = completed + 1;
			}
		}
	}

	let result = count === 0 ? "" : `${completed}/${count}`;

	return (
		<div className = "taskCount">
			<p>{result}</p>
		</div>
	);
}

export default TaskCount;
