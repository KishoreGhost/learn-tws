"use strict";
class TaskManager {
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }
    // Add a new task
    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }
    // Delete a task by ID
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }
    // Update a task by ID
    updateTask(id, updatedTask) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = Object.assign(Object.assign({}, this.tasks[taskIndex]), updatedTask);
            this.saveTasks();
        }
    }
    // List all tasks
    listTasks() {
        this.tasks.forEach(task => {
            console.log(`${task.id}: ${task.title} - ${task.status} (Priority: ${task.priority}, Category: ${task.category})`);
        });
    }
    // Save tasks to local storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    // Load tasks from local storage
    loadTasks() {
        const tasksFromStorage = localStorage.getItem('tasks');
        if (tasksFromStorage) {
            this.tasks = JSON.parse(tasksFromStorage);
        }
    }
}
// Create an instance of TaskManager
const taskManager = new TaskManager();
// Adding a new task
taskManager.addTask({
    id: 1,
    title: 'Complete TypeScript project',
    description: 'Finish the task manager project with local storage',
    priority: 'High',
    dueDate: new Date('2024-12-31'),
    status: 'Pending',
    category: 'Work',
});
// Listing tasks
taskManager.listTasks();
