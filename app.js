//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load All event listeners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {

    let tasks = getTasksInLocalStorage();

    tasks.forEach(function (task) {
        addElementTask(task);
    });
}

function addTask(e) {

    if (taskInput.value === '') {
        alert('Add the task');
        return;
    }

    addElementTask(taskInput.value);
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
}

function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function clearTasks(e) {

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    ClearTasksFromLocalStorage();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );
}

function getTasksInLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}

function addElementTask(text) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(text));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<li class="fa fa-remove"></li>';
    li.appendChild(link);
    taskList.appendChild(li);
}
 
function storeTaskInLocalStorage(task) {
    let tasks = getTasksInLocalStorage();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
 
function removeTaskFromLocalStorage(taskItem) {
    let tasks = getTasksInLocalStorage();

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function ClearTasksFromLocalStorage() {
    localStorage.clear();
}

