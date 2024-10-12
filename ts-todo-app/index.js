"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = require("readline");
var todos = [];
var nextId = 1;
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function addTodo(title) {
    var todo = {
        id: nextId++,
        title: title,
        completed: false,
        createdAt: new Date(),
    };
    todos.push(todo);
    console.log("Added todo: ".concat(title));
}
function updateTodo(id, completed) {
    var todo = todos.find(function (todo) { return todo.id === id; });
    if (todo) {
        todo.completed = completed;
        console.log("Updated todo ".concat(id, " to completed: ").concat(completed));
    }
    else {
        console.log("Todo with id ".concat(id, " not found."));
    }
}
function deleteTodo(id) {
    var index = todos.findIndex(function (todo) { return todo.id === id; });
    if (index !== -1) {
        todos.splice(index, 1);
        console.log("Deleted todo with id ".concat(id));
    }
    else {
        console.log("Todo with id ".concat(id, " not found."));
    }
}
function listTodos() {
    console.log("Todo List:");
    todos.forEach(function (todo) {
        console.log("ID: ".concat(todo.id, ", Title: ").concat(todo.title, ", Completed: ").concat(todo.completed, ", Created At: ").concat(todo.createdAt));
    });
}
function mainMenu() {
    rl.question("Choose an option:\n1. Add Todo\n2. Update Todo\n3. Delete Todo\n4. List Todos\n5. Exit\n> ", function (choice) {
        switch (choice.trim()) {
            case '1':
                rl.question("Enter the title for the new todo: ", function (title) {
                    addTodo(title);
                    mainMenu();
                });
                break;
            case '2':
                rl.question("Enter the ID of the todo to update: ", function (id) {
                    rl.question("Mark as completed? (yes/no): ", function (answer) {
                        var completed = answer.trim().toLowerCase() === 'yes';
                        updateTodo(Number(id), completed);
                        mainMenu();
                    });
                });
                break;
            case '3':
                rl.question("Enter the ID of the todo to delete: ", function (id) {
                    deleteTodo(Number(id));
                    mainMenu();
                });
                break;
            case '4':
                listTodos();
                mainMenu();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log("Invalid choice. Try again.");
                mainMenu();
        }
    });
}
mainMenu();
