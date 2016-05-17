var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; //
var incompletedTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


var createANewTaskElement = function(taskString) {
	var listItems = document.createElement("li");

	var checkBox = document.createElement("input");
	checkBox.type = "checkbox";

	var label = document.createElement("label");
	label.innerText = taskString;

	var editInput = document.createElement("input");
	editInput.type = "text";

	var editButton = document.createElement("button");
	editButton.className = "edit";
	editButton.innerText = "Edit";

	var deleteButton = document.createElement("button");
	deleteButton.className = "delete";
	deleteButton.innerText = "Delete";

	listItems.appendChild(checkBox);
	listItems.appendChild(label);
	listItems.appendChild(editInput);
	listItems.appendChild(editButton);
	listItems.appendChild(deleteButton);



	return listItems;
}

// Add a new task
var addTask = function() {
  console.log("addTask function called .... ");
  var taskInputValue = taskInput.value;
  if(taskInputValue == null || taskInputValue == "") {
  	alert("Add a valid name to the task!!!")
  } else {
  	var listItems = createANewTaskElement(taskInput.value);
  	//append the 
  	incompletedTasksHolder.appendChild(listItems);
  	bindTaskEvents(listItems, taskCompleted);
  	taskInput.value = "";
  }
}



// Edit a existing task
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  var editButton = listItem.querySelector("button[class=edit]")

  if(containsClass) {
  	label.innerText = editInput.value;
  	editButton.innerText = "Edit";
  } else {
  	editInput.value = label.innerText;
  	editButton.innerText = "Save";
  }
  // Toggle
  listItem.classList.toggle("editMode");
}

//delete an existing task
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as not-complete
var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompletedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

// Set the click handler to the add task function
addButton.onclick = addTask;

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

for(var i = 0; i < incompletedTasksHolder.children.length; i++) {
	bindTaskEvents(incompletedTasksHolder.children[i], taskCompleted);
}

for(var i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}