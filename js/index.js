let todos = [];
const $todos = document.querySelector('.todos');

const render = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  let html = '';

  todos.forEach(({ id, content, completed }) => {
    html += `
      <li id="${id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>
    `;
  })

  $todos.innerHTML = html;
};

window.onload = render;