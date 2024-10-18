interface Task {
  id: number;
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
  status: "Pending" | "Completed";
  category: string;
}


class TaskManager {
    private tasks: Task[] = [];

    constructor() {
        this.loadTasks();
    }

    // Add a new task
    addTask(task: Task): void {
        this.tasks.push(task);
        this.saveTasks();
    }

    // Delete a task by ID
    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    // Update a task by ID
    updateTask(id: number, updatedTask: Partial<Task>): void {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
            this.saveTasks();
        }
    }

    // List all tasks
    listTasks(): void {
        this.tasks.forEach(task => {
            console.log(`${task.id}: ${task.title} - ${task.status} (Priority: ${task.priority}, Category: ${task.category})`);
        });
    }

    // Save tasks to local storage
    private saveTasks(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Load tasks from local storage
    private loadTasks(): void {
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


