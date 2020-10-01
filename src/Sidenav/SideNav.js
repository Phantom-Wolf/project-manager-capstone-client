// ***** imports *****

import React, { Component } from 'react'
import "./SideNav.css"
import { NavLink } from "react-router-dom";
import config from "../config";

// ***** component *****

export class SideNav extends Component {
    constructor(props) {
        this.state = {
            projects = [],
            contributor_projects = [],
            error = null
        }
    }

    // ***** pre-load *****

    componentDidMount() {
        // fetch projects from DB
        // fetch contributor projects from DB
    }

    // ***** populate projects *****

    populateProjects = () => {
        let htmlOutput1 = "";
        let htmlOutput2 = "";

        htmlOutput1 = (
                <ul className = "projectListUL">
                    {this.state.projects.map((project) => {
                        <li key = {project.id}>
                            <NavLink to = {`/Project/${project.id}`} className = "navProjectTitle">
                                <p>
                                    {project.title}
                                </p>
                            </NavLink>
                        </li>
                    })}
                </ul>
        )

        htmlOutput2 = (
            <ul className = "contributorProjectListUL">
                {this.state.contributor_projects.map((project) => {
                    <li key = {project.id}>
                        <NavLink to = {`/Project/${project.id}`} className = "navProjectTitle">
                            <p>
                                {project.title}**
                            </p>
                        </NavLink>
                    </li>
                })}
            </ul>
        )

        return  <div className = "projectList">
                    <h3>Projects</h3> 
                        {htmlOutput1}
                        {htmlOutput2}
                        <NavLink
                            onClick = {this.logout}
                            to={`/Landing`}
                            className="logout"
                            style={{
                                display: this.state.isToggle || window.innerWidth > 1100 ? "block" : "none",
                            }}
                        >
                            <h3>Sign Out</h3>
                        </NavLink>
                </div>
    }


    // ***** helpers *****

    logout = () => {
		TokenService.clearAuthToken();
	};



    render() {
        return (
            <section className = "SideNav">
                {this.populateProjects}
            </section>
        )
    }
}

export default SideNav
