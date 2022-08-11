const todoList = document.querySelector('.todo-list js-todo-list');

fetch('/todo')
  .then((res) => {
    console.log(res)
    console.log(res.json())
    return res.json();
  })
  .then((data) => {
    // console.log(data);
    const tasksArr = data;
    tasksArr.forEach((obj) => {
      const taskListItem = document.createElement('li');
      taskListItem.appendChild(document.createTextNode(`${obj.task}`));
      todoList.appendChild(taskListItem);
    })
  });