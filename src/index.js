import './index.css';
import {
  addTaskToArray, highlightTask, loadTasksFromLS, modifyTask, removeTask, clearCompletedTasks,
} from './modules/tasks.js';
import updateTaskStatus from './modules/statusUpdates.js';

const onPageLoad = () => {
  loadTasksFromLS();
};
window.onload = onPageLoad();

const addTaskInput = document.querySelector('.task-adder-input');
const addTaskBtn = document.querySelector('.add-task-btn');
const clearAllBtn = document.querySelector('.clear-all-btn');
addTaskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const taskValue = addTaskInput.value.trim();
    if (taskValue !== '') {
      addTaskToArray(taskValue);
      addTaskInput.value = '';
    }
  }
});
addTaskBtn.addEventListener('click', () => {
  const taskValue = addTaskInput.value.trim();
  if (taskValue !== '') {
    addTaskToArray(taskValue);
    addTaskInput.value = '';
  }
});
document.addEventListener('click', (e) => {
  if (!(e.target.matches('.task-value') || e.target.matches('.trash-icon'))) {
    return;
  }
  if (e.target.matches('.task-value')) {
    const tasks = document.querySelectorAll('.task-value');
    tasks.forEach((task, index) => {
      if (e.target === task) {
        highlightTask(index);
      }
    });
  } else {
    const deleteBtn = document.querySelectorAll('.trash-icon');
    deleteBtn.forEach((btn, index) => {
      if (e.target === btn) {
        removeTask(index);
      }
    });
  }
});
document.addEventListener('change', (e) => {
  if (!(e.target.matches('.task-value') || e.target.matches('input[type=checkbox]'))) {
    return;
  }
  if (e.target.matches('.task-value')) {
    const tasks = document.querySelectorAll('.task-value');
    tasks.forEach((task, index) => {
      if (e.target === task) {
        modifyTask(task.value, index);
      }
    });
  } else {
    const checkBoxes = document.querySelectorAll('input[type=checkbox]');
    checkBoxes.forEach((checkBox, index) => {
      if (e.target === checkBox) {
        updateTaskStatus(index);
      }
    });
  }
});
clearAllBtn.addEventListener('click', () => {
  clearCompletedTasks();
});