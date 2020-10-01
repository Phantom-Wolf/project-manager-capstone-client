# Capstone Project Title: Project Manager
Complete any project more easily with a simple, organized structure and completion system.

## 1. Working Prototype
You can access a working prototype of the React app here: (no link yet)
and Node app here: (no link yet)


## 2. User Stories
This app is for two types of users: a visitor and a logged-in user

#### Landing Page
* as a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it

* as a visitor
* I should be able see and interact with a register form
* so that I can become a registered user

* as a registered user
* I want to be able to easily find where to login
* so that I know where to be directed

#### Sign In Page
* as a registered user
* I should be able to consistently login with my username and password
* so that I can access my account

* as a registered user
* I should know if I put in incorrect login credentials
* so that I know to correct them

#### Dashboard
* as a registered user
* I should see where my projects are and how to create one
* so that I know how to navigate the use of the app

* as a registered user
* I should see a navigation bar of all my projects
* so that I can access my created projects/ collaboration projects

* as a registered user
* I should be able to click a collaboartion button to add another user to my project
* so that we can work as a team on a project

* as a registered user
* I should be able to see all of my existing collaborators in my navigation side bar
* so that I can track who has access to my project


#### Projects Page
* as a registered user
* I should see atleast the project title node
* to know that I properly created a project

* as a registered user
* I should be able to click on project node to create a sub-node (with a title)
* so that I can begin breaking down my project into manageable parts

* as a registered user
* I should be able to click on a sub-node to create yet a more nested sub-node within that sub-node
* to further yet break down my project

* as a registered user
* I should be able to click a delete button on each node
* to delete the node I do not want, with a cascading effect

* as a registered user
* I should be able to click a completion button, node should turn green
* so that I can more easily visiualize my project completion status

* as a registered user
* I should be able to click a button that closes that nodes children nodes
* to save space and clutter

* as a registered user
* I should be able to click on a notes button to open that node in a separate page
* so that I can add notes to that task as needed



## 3. Functionality
The app's functionality includes:
* Every User has the ability to create an account

## 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver

### 5. Wireframes


## 6. Front-end Structure - React Components Map


## 7. Back-end Structure - Business Objects

* work in progress, subject to change

* users: (registered users)
    * id (PK)
    * username
    * user_email
    * user_password
    * pending

* projects: (created projects)
    * id (PK)
    * name
    * originator (user_id) (FK)

* contributor: (relationship between project originator, their project and allowing a contributor to help)
    * id (PK)
    * project_id (FK)
    * contributor_id (user_id) (FK)

* tasksParent: (created tasks connected to project tree relationship)
    * id (PK)
    * project_id (FK)
    * title
    * completion_status

* tasksLvlOne: (created tasks connected to project tree relationship)
    * id (PK)
    * project_id (FK)
    * title
    * parent (FK) (tasksParent_id)
    * completion_status

* tasksLvlTwo: (created tasks connected to project tree relationship)
    * id (PK)
    * project_id (FK)
    * title
    * parent (FK) (tasksLvlOne_id)
    * completion_status

* tasksLvlThree: (created tasks connected to project tree relationship)
    * id (PK)
    * project_id (FK)
    * title
    * parent (FK) (tasksLvlTwo_id)
    * completion_status

* tasksLvlFour: (created tasks connected to project tree relationship)
    * id (PK)
    * project_id (FK)
    * title
    * parent (FK) (tasksLvlThree_id)
    * completion_status

* tasksLvlFive: (created tasks connected to project tree relationship)
    * id (PK)
    * project_id (FK)
    * title
    * parent (FK) (tasksLvlFour_id)
    * completion_status


* notes: (notes added to each individual task)
    * id (PK)
    * task_id (FK)
    * user_id (FK)
    * content
    * date_created


## 8. API Documentation




## Screenshots 




## How to run it
Use command line to navigate into the project folder and run the following in terminal

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test