# To-Do Schedule Website - Flow Documentation

## Overview
A simple, clean To-Do Schedule website that allows users to manage tasks with specific dates and times. Built with vanilla HTML, CSS, and JavaScript, with data persistence through LocalStorage.

## Goals
- Provide an intuitive interface for managing daily tasks
- Enable users to view tasks by time period (today, past, future)
- Persist data locally using browser LocalStorage
- Maintain a clean, semantic, and responsive design
- Ensure accessibility and usability

## Pages

### 1. Main Page (index.html)
**Purpose**: Display and manage today's tasks

**Features**:
- Shows all tasks scheduled for today
- Form to add new tasks with:
  - Task name (text input)
  - Date (date picker)
  - Time (time picker)
- Task list displaying: Time | Task | Actions
- Actions available:
  - ✅ Mark as complete/incomplete (toggle)
  - 🗑️ Delete task
- Empty state message: "No tasks for today 🎉"

### 2. Past Page (past.html)
**Purpose**: View all tasks scheduled before today

**Features**:
- Displays all past tasks grouped by date
- Read-only view of historical tasks
- Shows completion status
- Delete functionality available
- Empty state message if no past tasks exist

### 3. Future Page (future.html)
**Purpose**: View and manage all upcoming tasks

**Features**:
- Displays all future tasks grouped by date
- Full task management (check, delete)
- Shows tasks in chronological order
- Empty state message if no future tasks exist

## LocalStorage Format

### Key Pattern
```
todo-YYYY-MM-DD
```
Example: `todo-2025-01-15`

### Value Structure
Each key stores an array of task objects:
```json
[
  {
    "time": "14:00",
    "task": "Meeting with team",
    "done": false
  },
  {
    "time": "16:30",
    "task": "Code review",
    "done": true
  }
]
```

### Data Properties
- **time**: String in HH:MM format (24-hour)
- **task**: String containing task description
- **done**: Boolean indicating completion status

## Design Specifications

### Visual Style
- **Background**: Light, neutral color (#f5f5f5 or similar)
- **Font**: Clean sans-serif (system fonts: Arial, Helvetica, sans-serif)
- **Layout**: Centered content with comfortable padding
- **Spacing**: Generous margins and padding for readability

### Semantic HTML
Required semantic elements:
- `<header>` - Page header with navigation
- `<main>` - Main content area
- `<section>` - Content sections
- `<table>` - Task lists
- `<form>` - Task input form
- `<nav>` - Navigation menu

### Table Styling
- Clean borders
- Alternating row colors for readability
- Proper spacing between cells
- Hover effects for interactivity
- Responsive width

### Responsive Design
- Mobile-friendly layout
- Readable on all screen sizes
- Touch-friendly button sizes
- Proper form input sizing

## Script Behavior

### Core Functions

#### 1. Task Management
- **addTask(date, time, task)**: Add new task to LocalStorage
- **deleteTask(date, index)**: Remove task from LocalStorage
- **toggleTask(date, index)**: Toggle task completion status
- **getTasks(date)**: Retrieve tasks for specific date
- **getAllTasks()**: Retrieve all tasks from LocalStorage

#### 2. Date Utilities
- **getToday()**: Get current date in YYYY-MM-DD format
- **isPast(date)**: Check if date is before today
- **isFuture(date)**: Check if date is after today
- **formatDate(date)**: Format date for display

#### 3. Rendering
- **renderTasks(tasks, date)**: Display tasks in table
- **renderEmptyState()**: Show message when no tasks
- **updateTaskList()**: Refresh task display

#### 4. Event Handlers
- Form submission for adding tasks
- Click handlers for check/delete buttons
- Navigation between pages

### Data Flow

1. **Adding a Task**:
   - User fills form and submits
   - Validate input fields
   - Get existing tasks for that date from LocalStorage
   - Add new task to array
   - Save back to LocalStorage with key `todo-YYYY-MM-DD`
   - Refresh display

2. **Checking a Task**:
   - User clicks check button
   - Retrieve tasks for that date
   - Toggle `done` property
   - Save updated array back to LocalStorage
   - Update UI to reflect change

3. **Deleting a Task**:
   - User clicks delete button
   - Confirm action (optional)
   - Retrieve tasks for that date
   - Remove task from array
   - Save updated array (or remove key if empty)
   - Refresh display

4. **Page Load**:
   - Determine current page (today/past/future)
   - Scan LocalStorage for all `todo-*` keys
   - Filter dates based on page type
   - Sort and group tasks
   - Render task lists

## File Structure

```
to-do-list-claude/
├── index.html          # Main page (today's tasks)
├── past.html           # Past tasks page
├── future.html         # Future tasks page
├── styles.css          # Shared stylesheet
├── app.js              # Main JavaScript file
├── FLOW.md             # This documentation
└── README.md           # Project readme (optional)
```

## Acceptance Criteria

### Functionality
- ✅ Users can add tasks with date and time
- ✅ Tasks are saved to LocalStorage with correct key format
- ✅ Users can mark tasks as complete/incomplete
- ✅ Users can delete tasks
- ✅ Today's tasks display on main page
- ✅ Past tasks display on past page
- ✅ Future tasks display on future page
- ✅ Data persists across browser sessions
- ✅ Empty states show appropriate messages

### Technical
- ✅ Semantic HTML5 elements used throughout
- ✅ Valid HTML structure
- ✅ Clean, maintainable CSS
- ✅ JavaScript follows best practices
- ✅ No external dependencies (vanilla JS)
- ✅ LocalStorage key format: `todo-YYYY-MM-DD`
- ✅ Task object format matches specification

### Design
- ✅ Clean, readable layout
- ✅ Responsive design works on mobile and desktop
- ✅ Consistent styling across all pages
- ✅ Proper spacing and typography
- ✅ Intuitive navigation between pages
- ✅ Visual feedback for interactive elements

### User Experience
- ✅ Forms are easy to use and validated
- ✅ Actions provide immediate visual feedback
- ✅ Navigation is clear and consistent
- ✅ Empty states are informative
- ✅ Task completion status is clearly indicated
- ✅ Time-based sorting is logical and consistent
