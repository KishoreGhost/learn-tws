interface Todo{
    id: number;
    title: string;
    completed: boolean;
    createdAt?: Date;
}

const todos: Todo[] = [];

function addTodo(todo: Todo) {}