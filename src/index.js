document.addEventListener("DOMContentLoaded", () => {
  // your code here

  const taskList = new listTask();

  //form and relevant input fields
  const newTaskForm = document.getElementById("create-task-form");
  const newTaskDescription = document.getElementById("new-task-description");

  const ulTask = document.getElementById("tasks");

  const showApp = () => (ulTask.innerHTML = taskList.showTasks());
  //attaching event listeners

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    taskList.createNewTask(newTaskDescription.value);
    // reset form
    e.target.reset();
    showApp();
  });

  ulTask.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      taskList.deleteTask(e.target.dataset.description);
      showApp();
    }
  });
});

// Define a class called Task to represent individual tasks
class Task {
  constructor(description) {
    this.description = description;
  }

  // Define a method to generate the HTML representation of a single task
  show() {
    return `
      <li>
        ${this.description} <!-- Display the task description -->
        <button data-description="${this.description}">X</button> <!-- Add a delete button -->
      </li>
    `;
  }
}

// Define a class called listTask to manage a list of tasks
class listTask {
  constructor() {
    this.tasks = [];
  }

  // Define a method to create a new task and add it to the list
  createNewTask(description) {
    const newTask = new Task(description); // Create a new Task instance
    this.tasks.push(newTask); // Add the new task to the list of tasks
  }

  // Define a method to generate the HTML representation of all tasks in the list
  showTasks() {
    return this.tasks.map((task) => task.show()).join(""); // Generate HTML for all tasks
  }

  // Define a method to delete a task from the list based on its description
  deleteTask(description) {
    this.tasks = this.tasks.filter((task) => task.description !== description); // Remove the task from the list
  }
}
