var list;
var form;
var task;
const notifications = [ "Added Task", "Deleted Task", "Updated To Do List", "An error occurred" ];

window.addEventListener('load', toDoList);

function toDoList() {
    this.list = document.querySelector('#toDoList');
    this.form = document.querySelector('#addToDoForm');
    this.task = document.querySelector('#addTaskInput');

    form.addEventListener('submit', function (event) {
        // Prevents the form submission from refreshing the page.
        event.preventDefault();

        // If the list hasn't been saved in localstorage before,
        // remove the default info message
        if (!window.localStorage.startPageToDoList) {
            list.innerHTML = null;
        }

        list.innerHTML += '<li class="mdl-list__item">' + task.value
            + '<div class="removeTask"><a class="removeTaskLink"><i class="material-icons mdl-list__item-icon">delete</i></a></div></li>';

        storeList(notifications[0]);

        task.value = '';
    }, false)

    $(document).on('click', 'ul#toDoList li', function () {
        var toDoTask = event.target;

        // Don't trigger the completion event for the default message
        if (!toDoTask.classList.contains('default')) {
            //Mark the task as completed, or undo marking as completed
            if (!toDoTask.classList.contains('completed')) {
                toDoTask.classList.add('completed');
            } else if (toDoTask.classList.contains('completed')) {
                toDoTask.classList.remove('completed');
            }
            //After updating the task's completion status, store the list
            storeList(notifications[2]);
        }
    });

    //Get the To Do list from the browser's local storage
    function getValues() {
        var storedValues = window.localStorage.startPageToDoList;
        if (!storedValues) {
            return;
        } else {
            list.innerHTML = storedValues;
        }
    }

    // Due to Chrome plugin security policy, regular 'onclick' events are not allowed, so jQuery must
    // be implemented in order to remove tasks from the To Do list
    $(document).on('click', 'ul#toDoList li a.removeTaskLink', function (event) {
        $(this).closest('li').remove();
        storeList(notifications[1]);
        event.stopImmediatePropagation();
    });

    getValues();
}

// Write the To Do list to the browser's local storage
function storeList(messageText) {
    try {
        window.localStorage.startPageToDoList = list.innerHTML;
    } catch (err) {
        console.log("Error saving To Do list to localStorage");
        notify(notifications[3]);
    } finally {
        notify(messageText);
    }
}

function notify(messageText) {
    var snackbarContainer = document.querySelector('#notificationSnackbar');
    var data = { message: messageText };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
