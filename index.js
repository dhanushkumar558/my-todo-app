document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteButton')) {
            event.target.parentElement.remove(); // Remove the task item from the DOM
            saveTasks(); // Update local storage after removal
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌'; // Unicode for X mark
        deleteButton.classList.add('deleteButton'); // Add a class to the delete button
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('#taskList li');
        taskItems.forEach(function(taskItem) {
            tasks.push(taskItem.textContent.replace('❌', '').trim()); // Remove the X button before saving
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(taskText) {
            addTask(taskText);
        });
    }
});
