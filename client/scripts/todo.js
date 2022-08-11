// const secrets = document.querySelector('#secrets');

fetch('/todo')
  .then((res) => console.log(res))
  // .then((data) => {
  //   console.log(data);
    // const users = data.users;
    // users.forEach((user) => {
    //   const userListItem = document.createElement('li');
    //   userListItem.appendChild(document.createTextNode(`${user.username}: ${user.password}`));
    //   secrets.appendChild(userListItem);
    // });
  // });
