const form = document.querySelector("form");
const todoName = document.querySelector("input");

const todoListContainer = document.querySelector(".todo-list");

const todoList = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = createTodoItem();

  todoList.push(todo);

  clearInput(todoName);

  renderTodoList();
});

const renderTodoList = () => {
  console.log("todoList", todoList);
  let todoElemnts = "";

  todoList.forEach((todo) => {
    const todoItemNameClassName = todo.isDone ? "active" : "";

    let todoItemName = "";

    if (todo.isDone) {
      todoItemName = `<span class=${todoItemNameClassName}>${todo.name}</span>`;
    } else {
      todoItemName = `<span>${todo.name}</span>`;
    }

    todoElemnts += `<li data-id=${todo.id}>
            ${todoItemName}
            <button data-done>Done</button>
            <button data-delete>Delete</button>
        </li>`;
  });

  todoListContainer.innerHTML = todoElemnts;
};

const clearInput = (input) => {
  input.value = "";
};

renderTodoList();

const createTodoItem = () => {
  return {
    id: todoList.length,
    name: todoName.value,
    isDone: false,
  };
};

todoListContainer.addEventListener("click", (e) => {
  const parentId = +e.target.parentNode.dataset.id;

  if (e.target.closest("[data-done]")) {
    toggleDoneTodo(parentId);
  }

  if (e.target.closest("[data-delete]")) {
    deleteTodo(parentId);
  }
});

const deleteTodo = (id) => {
  const elementIndex = todoList.findIndex((todo) => {
    return todo.id === id;
  });

  todoList.splice(elementIndex, 1);

  renderTodoList();
};

const toggleDoneTodo = (id) => {
  const element = todoList.find((todo) => {
    return todo.id === id;
  });

  element.isDone = !element.isDone;

  renderTodoList();
};
