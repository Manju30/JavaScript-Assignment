const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '08-06-2022',
},
{
  name: 'wash clothes',
  dueDate: '21-07-2023',
}];

renderTodoList();

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  todoList.push({
    name : name, 
    dueDate : dueDate});
  inputElement.value = '';
  renderTodoList();
  saveLocalStorage();
}

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach((todoObject, index) => {
    const name = todoObject.name;
    const dueDate = todoObject.dueDate;
    const html = `
    <div>${name} </div>
    <div>${dueDate}</div>
    <button class="delete-todo-button js-delete-todo-button">Delete</button>
  `
    todoListHTML += html;
  })
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((value, index) => {
    value.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
      saveLocalStorage();
    });
  });
};

//above method using for loop
  // for(let i = 0; i < todoList.length; i++){
  //   const todoObject = todoList[i];
  //   const name = todoObject.name;
  //   const dueDate = todoObject.dueDate;
  //   const html = `
  //   <div>${name} </div>
  //   <div>${dueDate}</div>
  //   <button class="delete-todo-button" onclick="
  //   todoList.splice(${i}, 1);
  //   renderTodoList();
  //   saveLocalStorage();
  //   ">Delete</button>
  // `
  //   todoListHTML += html;
  // }
 

function saveLocalStorage(){
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
