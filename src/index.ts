interface Todo {
    text: string;
    completed: boolean;

}


const todoinput = document.getElementById("todoinput") as HTMLInputElement;
const list = document.getElementById("todolist") as HTMLUListElement
const form = document.querySelector("form") as HTMLFormElement

const todos: Todo[] = getToDos()
todos.forEach(createToDoElement)

function getToDos():Todo[] {
    const data = localStorage.getItem("todos")
    if (data === null) return [];
    return JSON.parse(data)
}

function updateTodos () {
    localStorage.setItem("todos", JSON.stringify(todos))
}


function handleSubmit(e: SubmitEvent) {
  e.preventDefault()
    const newTodo:Todo = {
        text: todoinput.value,
        completed: false
    }
    createToDoElement(newTodo)
    todos.push(newTodo)
    updateTodos()
    todoinput.value = ""
}

function handleDelete(todo: Todo) {
    const index = todos.indexOf(todo)
    console.log(index);
    if (index > -1) {
        todos.splice(index, 1)
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    
}

function handleEdit(todo: Todo, span: HTMLSpanElement) {
    const newText = prompt("Edit todo:", todo.text);

    if (newText && newText.trim() !== "") {
        todo.text = newText;

       
        span.innerText = newText;

        updateTodos();
    }
    
}


function createToDoElement(todo: Todo) {
   const newLI = document.createElement("LI");
    const checkbox = document.createElement("input")
    const deleteBtn = document.createElement("button")
    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"
    checkbox.type = "checkbox"
    checkbox.checked = todo.completed
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked
        updateTodos()
        
    })
    deleteBtn.addEventListener("click", () => {
        handleDelete(todo)
        newLI.remove()
    })
   
    const span = document.createElement("span");
    span.innerText = todo.text;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;
    editInput.style.display = "none";


    editBtn.addEventListener("click", () => {
    span.style.display = "none";
    editInput.style.display = "inline";

    editInput.value = todo.text; 
    editInput.focus();
});

editInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        if (editInput.value.trim() !== "") {
            todo.text = editInput.value;

            span.innerText = editInput.value;

            updateTodos();
        }

        span.style.display = "inline";
        editInput.style.display = "none";
    }
});

        newLI.append(span);
    newLI.append(editInput);
    newLI.append(checkbox)
    list.append(newLI)
    deleteBtn.innerText = "Delete"
    newLI.append(editBtn)
    newLI.append(deleteBtn)
}
console.log(todos);

form?.addEventListener("submit", handleSubmit)



