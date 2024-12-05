const greeting = document.querySelector('.greeting');
const button = document.querySelector('.add-task-button');
const taskContainer = document.querySelector('.task-container');
const form = document.querySelector('.form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('textarea');
let date = new Date();
let hours = date.getHours();
let tasks = [];

if (hours < 12) {
  greeting.textContent = 'Bonjour';
} else if (hours <= 12) {
  greeting.textContent = 'Bonsoir';
}

function renderTasks() {
  taskContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description}</p>
      <div class="task-actions">
        <button onclick="editTask(${index})">Modifier</button>
        <button onclick="deleteTask(${index})">Supprimer</button>
      </div>
    `;
    taskContainer.appendChild(taskCard);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title && description) {
    tasks.push({ title, description });
    titleInput.value = '';
    descriptionInput.value = '';
    renderTasks();
  } else {
    alert('Veuillez remplir tous les champs.');
  }
});

function editTask(index) {
  const task = tasks[index];
  titleInput.value = task.title;
  descriptionInput.value = task.description;

  form.onsubmit = (e) => {
    e.preventDefault();
    tasks[index] = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
    };
    titleInput.value = '';
    descriptionInput.value = '';
    form.onsubmit = null;
    renderTasks();
  };
}


function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
