# To-Do Schedule Website

A simple, clean To-Do Schedule website built with HTML, CSS, and vanilla JavaScript. Manage your tasks with specific dates and times, with data persistence using LocalStorage.

## Features

- **Today's Tasks**: View and manage tasks scheduled for today
- **Past Tasks**: Review all completed and incomplete past tasks
- **Future Tasks**: Plan ahead with upcoming tasks
- **LocalStorage**: All data saved locally in your browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean UI**: Minimal, intuitive interface with semantic HTML

## How to Use

1. Open `index.html` in your web browser
2. Add a new task by filling in the form:
   - Enter task description
   - Select date
   - Choose time
3. Click "Add Task" to save
4. Use the ✅ button to mark tasks as complete/incomplete
5. Use the 🗑️ button to delete tasks
6. Navigate between Today, Past, and Future pages using the navigation menu

## File Structure

```
to-do-list-claude/
├── index.html          # Main page (today's tasks)
├── past.html           # Past tasks page
├── future.html         # Future tasks page
├── styles.css          # Shared stylesheet
├── app.js              # Main JavaScript file
├── FLOW.md             # Detailed documentation
└── README.md           # This file
```

## LocalStorage Format

Tasks are stored with keys in the format `todo-YYYY-MM-DD`. Each key contains an array of task objects:

```json
[
  {
    "time": "14:00",
    "task": "Meeting with team",
    "done": false
  }
]
```

## Technical Details

- **No dependencies**: Pure vanilla JavaScript
- **Semantic HTML5**: Proper use of header, main, section, nav, table elements
- **Responsive CSS**: Mobile-first design approach
- **LocalStorage API**: Persistent data storage

## Browser Compatibility

Works on all modern browsers that support:
- HTML5
- CSS3
- ES6 JavaScript
- LocalStorage API

## Documentation

See `FLOW.md` for detailed documentation including:
- Project overview and goals
- Page specifications
- LocalStorage format details
- Design specifications
- Script behavior and functions
- Acceptance criteria