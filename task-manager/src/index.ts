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
  
    // Add a new task with user inputs
    addTaskWithUserInput(): void {
      const id = this.generateId();
      const title = prompt("Enter task title:");
      const description = prompt("Enter task description (optional):");
      const priority = prompt("Enter task priority (Low, Medium, High):") as "Low" | "Medium" | "High";
      const dueDateInput = prompt("Enter due date (yyyy-mm-dd):");
      const dueDate = dueDateInput ? new Date(dueDateInput) : new Date();
      const status = prompt("Enter task status (Pending, Completed):") as "Pending" | "Completed";
      const category = prompt("Enter task category:");
  
      if (title && priority && status && category) {
        const task: Task = {
          id,
          title,
          description: description || undefined,
          priority,
          dueDate,
          status,
          category,
        };
        this.tasks.push(task);
        this.saveTasks();
        console.log("Task added successfully!");
      } else {
        console.log("Invalid input. Task not added.");
      }
    }
  
    // Generate a unique ID for each task
    private generateId(): number {
      return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
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
  
  // Adding a new task using user inputs
  taskManager.addTaskWithUserInput();
  
  // Listing tasks
  taskManager.listTasks();
  