const todoList = document.querySelector('#todo');
// console.log(todoList)

fetch('/todo/ls')
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    const tasksArr = Object.values(data);
    const fakeArr = Object.values(tasksArr);
    const realArr = fakeArr[0]

    for (let i = 0; i < realArr.length; i++) {
      const taskListItem = document.createElement('li');
      taskListItem.appendChild(document.createTextNode(`${realArr[i].task}`));
      todoList.appendChild(taskListItem);
    }

  });