import readline from 'readline';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt?: Date;
}

const todos: Todo[] = [];
let nextId = 1;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function addTodo(title: string): void {
    const todo: Todo = {
        id: nextId++,
        title,
        completed: false,
        createdAt: new Date(),
    };
    todos.push(todo);
    console.log(`Added todo: ${title}`);
}

function updateTodo(id: number, completed: boolean): void {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = completed;
        console.log(`Updated todo ${id} to completed: ${completed}`);
    } else {
        console.log(`Todo with id ${id} not found.`);
    }
}

function deleteTodo(id: number): void {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        console.log(`Deleted todo with id ${id}`);
    } else {
        console.log(`Todo with id ${id} not found.`);
    }
}

function listTodos(): void {
    console.log("Todo List:");
    todos.forEach(todo => {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Completed: ${todo.completed}, Created At: ${todo.createdAt}`);
    });
}

function mainMenu() {
    rl.question(
        `Choose an option:
1. Add Todo
2. Update Todo
3. Delete Todo
4. List Todos
5. Exit
> `,
        (choice) => {
            switch (choice.trim()) {
                case '1':
                    rl.question("Enter the title for the new todo: ", (title) => {
                        addTodo(title);
                        mainMenu();
                    });
                    break;
                case '2':
                    rl.question("Enter the ID of the todo to update: ", (id) => {
                        rl.question("Mark as completed? (yes/no): ", (answer) => {
                            const completed = answer.trim().toLowerCase() === 'yes';
                            updateTodo(Number(id), completed);
                            mainMenu();
                        });
                    });
                    break;
                case '3':
                    rl.question("Enter the ID of the todo to delete: ", (id) => {
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
        }
    );
}

mainMenu();
