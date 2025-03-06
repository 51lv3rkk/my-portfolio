document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const todoList = document.getElementById('todoList');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const taskCount = document.getElementById('taskCount');

  let tasks = [];

  addBtn.addEventListener('click', () => {
      const taskText = todoInput.value.trim();
      if (taskText !== '') {
          tasks.push(taskText);
          todoInput.value = '';
          renderTasks();
      }
  });

  todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-danger')) {
          const index = e.target.getAttribute('data-index');
          tasks.splice(index, 1);
          renderTasks();
      }
  });

  clearAllBtn.addEventListener('click', () => {
      tasks = [];
      renderTasks();
  });

  function renderTasks() {
      todoList.innerHTML = '';
      tasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.className = 'todo-item';
          li.innerHTML = `
              ${task}
              <button class="btn btn-danger btn-sm" data-index="${index}">X</button>
          `;
          todoList.appendChild(li);
      });
      taskCount.textContent = tasks.length;
  }

  todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          addBtn.click();
      }
  });
});