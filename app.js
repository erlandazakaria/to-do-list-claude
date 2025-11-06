// ===========================
// Date Utility Functions
// ===========================

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday() {
    const today = new Date();
    return formatDateToString(today);
}

/**
 * Format a Date object to YYYY-MM-DD string
 */
function formatDateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Check if a date string is in the past
 */
function isPast(dateStr) {
    const today = new Date(getToday());
    const date = new Date(dateStr);
    return date < today;
}

/**
 * Check if a date string is in the future
 */
function isFuture(dateStr) {
    const today = new Date(getToday());
    const date = new Date(dateStr);
    return date > today;
}

/**
 * Format date for display (e.g., "Monday, January 15, 2025")
 */
function formatDateForDisplay(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ===========================
// LocalStorage Functions
// ===========================

/**
 * Get tasks for a specific date
 */
function getTasks(dateStr) {
    const key = `todo-${dateStr}`;
    const tasks = localStorage.getItem(key);
    return tasks ? JSON.parse(tasks) : [];
}

/**
 * Save tasks for a specific date
 */
function saveTasks(dateStr, tasks) {
    const key = `todo-${dateStr}`;
    if (tasks.length === 0) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, JSON.stringify(tasks));
    }
}

/**
 * Get all todo dates from LocalStorage
 */
function getAllTodoDates() {
    const dates = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('todo-')) {
            const date = key.replace('todo-', '');
            dates.push(date);
        }
    }
    return dates.sort();
}

/**
 * Add a new task
 */
function addTask(dateStr, time, task) {
    const tasks = getTasks(dateStr);
    tasks.push({
        time: time,
        task: task,
        done: false
    });
    // Sort tasks by time
    tasks.sort((a, b) => a.time.localeCompare(b.time));
    saveTasks(dateStr, tasks);
}

/**
 * Delete a task
 */
function deleteTask(dateStr, index) {
    const tasks = getTasks(dateStr);
    tasks.splice(index, 1);
    saveTasks(dateStr, tasks);
}

/**
 * Toggle task completion status
 */
function toggleTask(dateStr, index) {
    const tasks = getTasks(dateStr);
    if (tasks[index]) {
        tasks[index].done = !tasks[index].done;
        saveTasks(dateStr, tasks);
    }
}

// ===========================
// Rendering Functions
// ===========================

/**
 * Render tasks in a table
 */
function renderTasksTable(tasks, dateStr) {
    if (tasks.length === 0) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">🎉</div>
                <p>No tasks for this date</p>
            </div>
        `;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Task</th>
                    <th style="text-align: right;">Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    tasks.forEach((task, index) => {
        const rowClass = task.done ? 'completed' : '';
        const checkIcon = task.done ? '✅' : '⬜';
        const checkClass = task.done ? 'completed' : '';

        html += `
            <tr class="${rowClass}">
                <td class="task-time">${task.time}</td>
                <td class="task-text">${escapeHtml(task.task)}</td>
                <td>
                    <div class="task-actions">
                        <button class="btn-check ${checkClass}" onclick="handleToggleTask('${dateStr}', ${index})" title="Toggle completion">
                            ${checkIcon}
                        </button>
                        <button class="btn-delete" onclick="handleDeleteTask('${dateStr}', ${index})" title="Delete task">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    return html;
}

/**
 * Render tasks grouped by date
 */
function renderTasksByDate(dates) {
    if (dates.length === 0) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>No tasks found</p>
            </div>
        `;
    }

    let html = '';
    dates.forEach(dateStr => {
        const tasks = getTasks(dateStr);
        if (tasks.length > 0) {
            html += `
                <div class="date-group">
                    <div class="date-header">${formatDateForDisplay(dateStr)}</div>
                    ${renderTasksTable(tasks, dateStr)}
                </div>
            `;
        }
    });

    return html || `
        <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <p>No tasks found</p>
        </div>
    `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================
// Page-Specific Render Functions
// ===========================

/**
 * Render today's tasks
 */
function renderTodayTasks() {
    const container = document.getElementById('tasksContainer');
    const today = getToday();
    const tasks = getTasks(today);

    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎉</div>
                <p>No tasks for today</p>
            </div>
        `;
    } else {
        container.innerHTML = renderTasksTable(tasks, today);
    }
}

/**
 * Render past tasks
 */
function renderPastTasks() {
    const container = document.getElementById('tasksContainer');
    const allDates = getAllTodoDates();
    const pastDates = allDates.filter(date => isPast(date));

    // Sort in reverse order (most recent first)
    pastDates.reverse();

    container.innerHTML = renderTasksByDate(pastDates);
}

/**
 * Render future tasks
 */
function renderFutureTasks() {
    const container = document.getElementById('tasksContainer');
    const allDates = getAllTodoDates();
    const futureDates = allDates.filter(date => isFuture(date));

    container.innerHTML = renderTasksByDate(futureDates);
}

// ===========================
// Event Handlers
// ===========================

/**
 * Handle form submission
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const taskInput = document.getElementById('taskInput');
            const dateInput = document.getElementById('dateInput');
            const timeInput = document.getElementById('timeInput');

            const task = taskInput.value.trim();
            const date = dateInput.value;
            const time = timeInput.value;

            if (task && date && time) {
                addTask(date, time, task);

                // Clear form
                taskInput.value = '';
                timeInput.value = '';
                dateInput.value = getToday();

                // Refresh display if on today's page
                if (date === getToday()) {
                    renderTodayTasks();
                }

                // Show success message
                showNotification('Task added successfully!');
            }
        });
    }
});

/**
 * Handle task toggle (check/uncheck)
 */
function handleToggleTask(dateStr, index) {
    toggleTask(dateStr, index);

    // Refresh the appropriate view
    if (dateStr === getToday()) {
        renderTodayTasks();
    } else if (isPast(dateStr)) {
        renderPastTasks();
    } else {
        renderFutureTasks();
    }
}

/**
 * Handle task deletion
 */
function handleDeleteTask(dateStr, index) {
    if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(dateStr, index);

        // Refresh the appropriate view
        if (dateStr === getToday()) {
            renderTodayTasks();
        } else if (isPast(dateStr)) {
            renderPastTasks();
        } else {
            renderFutureTasks();
        }

        showNotification('Task deleted');
    }
}

/**
 * Show a temporary notification
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
