let todos = [];
let navState = 'all';

// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $completeAll = document.querySelector('.checkbox');
const $removeAll = document.querySelector('.btn');
const $nav = document.querySelector('.nav');

// render
const render = data => {
  todos = data;
  const _todos = todos.filter(todo => (navState === 'all' ? true : navState === 'active' ? !todo.completed : todo.completed));
  let html = '';

  _todos.forEach(({ id, content, completed }) => {
    html += `
      <li id="${id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>
    `;
  });

  $todos.innerHTML = html;

  document.querySelector('.completed-todos').innerHTML = _todos.filter(todo => todo.completed).length;
  document.querySelector('.active-todos').innerHTML = _todos.filter(todo => !todo.completed).length;
};

const ajax = (() => {
  const req = (method, url, fn, payload) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200 || xhr.status === 201) {
        fn(JSON.parse(xhr.response));
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  };

  return {
    get(url, fn) {
      req('get', url, fn);
    },
    post(url, fn, payload) {
      req('post', url, fn, payload);
    },
    patch(url, fn, payload) {
      req('patch', url, fn, payload);
    },
    delete(url, fn) {
      req('delete', url, fn);
    }
  };
})();

const getTodos = () => {
  ajax.get('/todos', render);
};

const generateId = () => (!todos.length ? 1 : Math.max(...todos.map(todo => todo.id)) + 1);

const addTodo = content => {
  ajax.post('/todos', render, { id: generateId(), content, completed: false });
};

const toggleCompleted = id => {
  const completed = !todos.find(todo => todo.id === id).completed;
  ajax.patch(`/todos/${id}`, render, completed);
};

const removeTodo = id => {
  ajax.delete(`/todos/${id}`, render);
};

const completeAll = completed => {
  todos = todos.map(todo => ({ ...todo, completed }));

  render();
};

const removeAll = () => {
  todos = todos.filter(todo => !todo.completed);

  render();
};

const changeNav = id => {
  [...$nav.children].forEach($navItem => {
    $navItem.classList.toggle('active', $navItem.id === id);
  });
  navState = id;
  render();
};

// Events
window.onload = () => {
  getTodos();
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (keyCode !== 13 || content === '') return;
  target.value = '';

  addTodo(content);
};

$todos.onchange = ({ target }) => {
  const id = +target.parentNode.id;
  toggleCompleted(id);
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  const id = +target.parentNode.id;
  removeTodo(id);
};

$completeAll.onchange = ({ target }) => {
  const completed = target.checked;
  completeAll(completed);
};

$removeAll.onclick = () => {
  removeAll();
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;
  changeNav(target.id);
};
