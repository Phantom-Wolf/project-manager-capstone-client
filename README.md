# Capstone Project Title

ProjeX: Complete any project more easily with a simple, organized structure and completion system.

## 1. Working Prototype

You can access a working prototype of the React app here: https://project-manager-capstone-client.vercel.app/Landing
and Github: https://github.com/Phantom-Wolf/project-manager-capstone-client

## 2. User Stories

This app is for two types of users: a visitor and a logged-in user

#### Landing Page

- as a visitor
- I want to understand what I can do with this app (or sign up, or log in)
- so I can decide if I want to use it

- as a visitor
- I should be able see and interact with a register form
- so that I can become a registered user

- as a registered user
- I want to be able to easily find where to login
- so that I know where to be directed

#### Sign In Page

- as a registered user
- I should be able to consistently login with my username and password
- so that I can access my account

- as a registered user
- I should know if I put in incorrect login credentials
- so that I know to correct them

#### Dashboard

- as a registered user
- I should see where my projects are and how to create one
- so that I know how to navigate the use of the app

- as a registered user
- I should see a navigation bar of all my projects
- so that I can access my created projects/ collaboration projects

- as a registered user
- I should be able to click a collaboartion button to add another user to my project
- so that we can work as a team on a project

- as a registered user
- I should be able to see all of my existing collaborators in my navigation side bar
- so that I can track who has access to my project

#### Projects Page

- as a registered user
- I should see atleast the project title node
- to know that I properly created a project

- as a registered user
- I should be able to click on project node to create a sub-node (with a title)
- so that I can begin breaking down my project into manageable parts

- as a registered user
- I should be able to click on a sub-node to create yet a more nested sub-node within that sub-node
- to further yet break down my project

- as a registered user
- I should be able to click a delete button on each node
- to delete the node I do not want, with a cascading effect

- as a registered user
- I should be able to click a completion button, node should turn green
- so that I can more easily visiualize my project completion status

- as a registered user
- I should be able to click a button that closes that nodes children nodes
- to save space and clutter

- as a registered user
- I should be able to click on a notes button to open that node in a separate page
- so that I can add notes to that task as needed

## 3. Functionality

The app's functionality includes:

- Every User has the ability to create an account

## 4. Technology

- Front-End: HTML5, CSS3, JavaScript ES6, React
- Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
- Development Environment: Heroku, DBeaver

## 5. Back-end Structure - Business Objects

- work in progress, subject to change

- users: (registered users)

  - id (PK)
  - username
  - user_email
  - user_password
  - pending

- projects: (created projects)

  - id (PK)
  - name
  - user_id (FK)

- parentTask: (created tasks connected to project tree relationship)

  - id (PK)
  - project_id (FK)
  - title
  - completion_status

- parentNote: (created notes connected to task tree relationship)

  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

- taskOne: (created tasks connected to project tree relationship)

  - id (PK)
  - project_id (FK)
  - title
  - parent_id (FK) (tasksParent_id)
  - completion_status

- noteOne: (created notes connected to task tree relationship)

  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

- taskTwo: (created tasks connected to project tree relationship)

  - id (PK)
  - project_id (FK)
  - title
  - parent_id (FK) (taskOne_id)
  - completion_status

- noteTwo: (created notes connected to task tree relationship)

  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

- taskThree: (created tasks connected to project tree relationship)

  - id (PK)
  - project_id (FK)
  - title
  - parent_id (FK) (taskTwo_id)
  - completion_status

- noteThree: (created notes connected to task tree relationship)
  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

## 6. API Documentation

#### Users

post, /api/users/, new user data

    request:
    {
      username: String,
      user_email: String,
      user_password: String
    }

    response: [
    {
      username: String,
      user_email: String,
      user_password: String
    }
    ]

get, /api/users/:id, get user

    request:
    {
      user_id: id
    }

    response: [
    {
      username: String,
      user_email: String,
      user_password: String
    }
    ]

#### Auth

post, /api/auth/login, user credentials for login

    request:
    {
      user_email: String,
      user_password: String
    }

    response: webToken

#### Project

get, /api/projects, get all projects by user id

    response: [
    {
      id: id,
      project_name: String,
      user_id: id
    }
    ]

post, /api/projects, insert project

    request:
    {
      project_name: String,
      user_id: id
    }

    response: [
    {
      id: id,
      project_name: String,
      user_id: id
    }
    ]

get, /api/projects/:project_id, get project by id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_name: String,
      user_id: id
    }
    ]

delete, /api/projects/:project_id, delete project by id

    request:
    {
      project_id: id
    }

    response: 204

#### ParentTask

post, /api/parentTask/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/parentTask, insert task

    request:
    {
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/parentTask/:parentTask_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/parentTask/:parentTask_id, update task by id

    request:
    {
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/aprentTask/:parentTask_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### ParentNote

post, /api/parentNote/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/parentNote, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/parentNote/:parentNote_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

#### taskOne

post, /api/taskOne/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/taskOne, insert task

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/taskOne/:taskOne_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/taskOne/:taskOne_id, update task by id

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/taskOne/:taskOne_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### noteOne

post, /api/noteOne/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/noteOne, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/noteOne/:noteOne_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

#### taskTwo

post, /api/taskTwo/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/taskTwo, insert task

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/taskTwo/:taskTwo_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/taskTwo/:taskTwo_id, update task by id

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/taskTwo/:taskTwo_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### noteTwo

post, /api/noteTwo/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/noteTwo, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/noteTwo/:noteTwo_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

#### taskThree

post, /api/taskThree/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/taskThree, insert task

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/taskThree/:taskThree_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/taskThree/:taskThree_id, update task by id

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/taskThree/:taskThree_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### noteThree

post, /api/noteThree/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/noteThree, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/noteThree/:noteThree_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

## Screenshots

Landing/Register Page
:-------------------------:
![Landing/Register Page](/github-images/Landing.png)
Signin Page
![Signin Page](/github-images/Signin.png)
Home
![Home](/github-images/Home.png)
Project
![Project](/github-images/Project.png)
Task
![Task](/github-images/Task.png)

## Responsive

App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

- add contributor functionality

## How to run it

Use command line to navigate into the project folder and run the following in terminal

### Local React scripts

- To install the react project ===> npm install
- To run react (on port 3000) ===> npm start
- To run tests ===> npm run test

### Local Node scripts

- To install the node project ===> npm install
- To migrate the database ===> npm run migrate -- 1
- To run Node server (on port 8000) ===> npm run dev
- To run tests ===> npm run test
