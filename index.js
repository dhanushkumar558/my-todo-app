document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const dialog = document.getElementById('dialog');
    const closeBtn = dialog.querySelector('.close');

    // Load tasks from local storage when the page loads
    loadTasks();

    addTaskBtn.title = "Add Task"; // Tooltip for Add Task button

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
        } else {
            dialog.style.display = 'block'; // Show the dialog box
        }
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    closeBtn.title = "Close"; // Tooltip for Close button

    closeBtn.addEventListener('click', function() {
        dialog.style.display = 'none'; // Hide the dialog box when the close button is clicked
    });

    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('deleteButton')) {
            target.parentElement.remove(); // Remove the task item from the DOM
            saveTasks(); // Update local storage after removal
        } else if (target.classList.contains('editButton')) {
            const taskItem = target.parentElement;
            const taskText = taskItem.querySelector('.taskText');
            const taskInputField = document.createElement('input');
            taskInputField.type = 'text';
            taskInputField.value = taskText.textContent;
            taskText.textContent = ''; // Clear the text content
            taskText.appendChild(taskInputField);
            taskInputField.focus();
            taskInputField.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    taskText.textContent = taskInputField.value.trim();
                    saveTasks(); // Update local storage after editing
                    taskInputField.remove();
                }
            });

            const saveButton = document.createElement('button');
            saveButton.textContent = '💾'; // Unicode for floppy disk
            saveButton.classList.add('saveButton');
            saveButton.title = "Save"; // Tooltip for Save button
            taskItem.appendChild(saveButton);
            saveButton.addEventListener('click', function() {
                taskText.textContent = taskInputField.value.trim();
                saveTasks(); // Update local storage after editing
                taskInputField.remove();
                saveButton.remove();
            });
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskTextSpan.classList.add('taskText');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌'; // Unicode for X mark
        deleteButton.classList.add('deleteButton'); // Add a class to the delete button
        deleteButton.title = "Delete"; // Tooltip for Delete button

        const editButton = document.createElement('button');
        editButton.textContent = '✎'; // Unicode for pencil mark
        editButton.classList.add('editButton'); // Add a class to the edit button
        editButton.title = "Edit"; // Tooltip for Edit button

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(editButton);

        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('#taskList .taskText');
        taskItems.forEach(function(taskItem) {
            tasks.push(taskItem.textContent.trim());
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
