let todos = [];
let navState = 'all';
// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $completeAll = document.querySelector('.checkbox');
const $removeAll = document.querySelector('.btn');
const $nav = document.querySelector('.nav');

// render
const render = () => {
  const _todos = todos.filter(todo => navState === 'all' ? true : navState === 'active' ? !todo.completed : todo.completed);
  let html = '';

  _todos.forEach(({ id, content, completed }) => {
    html += `
      <li id="${id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>
    `;
  })

  $todos.innerHTML = html;

  document.querySelector('.completed-todos').innerHTML = _todos.filter(todo => todo.completed).length;
  document.querySelector('.active-todos').innerHTML = _todos.filter(todo => !todo.completed).length;
};

const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];
  todos.sort((todo1, todo2) => todo2.id - todo1.id);

  render()
};

const generateId = () => !todos.length ? 1 : Math.max(...todos.map(todo => todo.id)) + 1;

const addTodo = (content) => {
  todos = [{id: generateId(), content, completed: false}, ...todos];
  render();
};

const toggleCompleted = (id) => {
  todos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);

  render();
};

const removeTodo = (id) => {
  todos = todos.filter(todo => todo.id !== id);

  render();
};

const completeAll = (completed) => {
  todos = todos.map(todo => ({...todo, completed: completed}));

  render();
};

const removeAll = () => {
  todos = todos.filter(todo => !todo.completed);

  render();
};

const changeNav = (id) => {
  [...$nav.children].forEach($navItem => {
    $navItem.classList.toggle('active', $navItem.id === id);
  });
  navState = id;
  render();
}

// Events
window.onload = getTodos;

$input.onkeyup = ({target, keyCode}) => {
  const content = target.value.trim();
  if(keyCode !== 13 || content === '') return;
  target.value = '';

  addTodo(content);
}

$todos.onchange = ({target}) => {
  const id = +target.parentNode.id;
  toggleCompleted(id);
};

$todos.onclick = ({target}) => {
  if(!target.classList.contains('remove-todo')) return;
  const id = +target.parentNode.id;
  removeTodo(id);
};

$completeAll.onchange = ({target}) => {
  const completed = target.checked;
  completeAll(completed);
};

$removeAll.onclick = ({target}) => {
  removeAll();
};

$nav.onclick = ({target}) => {
  if(target.classList.contains('nav')) return;
  changeNav(target.id);
};