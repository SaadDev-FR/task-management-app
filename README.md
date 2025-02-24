## Setup and Running the Application

## Prerequisites
Before setting up the project, ensure you have:

Node.js (LTS version recommended)
Angular CLI installed globally (npm install -g @angular/cli)

## Installation Steps
1.Clone the repository:
git clone https://github.com/SaadDev-FR/task-management-app.git
2.npm install  
3.ng serve  
4.Open http://localhost:4200/ in your browser.

## Features Implemented
1.Task List
Displays tasks using *ngFor with async pipe.
## Each task has:
Title (clickable to navigate to details)
Edit button (opens modal)
Delete button (removes task)
Uses RxJS Observables (tasks$) to keep data updated.

## Task Details Page
Fetches and displays a task’s details.
Uses ActivatedRoute to get task ID from the URL.
Includes a "Back" button to return to the task list.

## Task Form (Create/Edit Modal)
Opens when clicking Create New Task or Edit button.
Uses Reactive Forms for validation.
Fields:
Title (Required)
Description (Required)
Status (Dropdown: Pending/Completed)
Due Date (Date Picker)
Shows "Create" or "Update" button dynamically based on editing mode.

## API Integration

Uses HttpClient to fetch, create, update, and delete tasks.
Implements proper API calls in task-service.service.ts.

## State Management with RxJS
Uses Material Card, Button, Icon, Form Fields, and Select Dropdown for a modern UI.
Implements MatDialog Modal for task creation and editing.

## Event Handling
Click on task title → Navigates to task details page.
Click on Edit → Opens modal to edit the task.
Click on Delete → Deletes the task.
Submit the form → Creates or updates the task.

## Cypress Tests (End-to-End)
Clicks "Edit" button and opens modal.
Fills the form with new data.
Clicks "Update" button and checks if the task is updated.

## Jasmine & Karma Unit Tests
Tests for TaskDetailComponent,TaskListComponent to verify:
Task fetching works correctly.
Clicking Back button navigates properly.

## API Endpoints Used
Method	Endpoint	  Description
GET	  /api/tasks	  Fetch all tasks
GET	  /api/tasks/:id  Fetch task by ID
POST	/api/tasks	  Create a new task
PUT	   /api/tasks/:id	   Update a task
DELETE	/api/tasks/:id	Delete a task

## Reactive Programming with RxJS
BehaviorSubject is used to manage task state dynamically.
Async Pipe is used to update the UI without manual subscriptions.

## Form Validation with Reactive Forms
Required Fields: Title, Description, Due Date.
Dropdown Validation: Ensures only valid statuses (Pending/Completed) are selected.

## NgRx Store for Global State Management
Single source of truth for task data.
Optimized performance by reducing redundant API calls.
Predictable state updates via actions and reducers.
Implementation:
Actions: loadTasks, addTask, updateTask, deleteTask.
Reducers: Updates the store based on dispatched actions.
Selectors: Retrieves task data efficiently.



