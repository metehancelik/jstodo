const input = document.getElementById("todoInput");
const ul = document.getElementById("todoUl");
let tasks = [];

function addTodo(value = null) {
  var li = document.createElement("li");
  var task = document.createElement("input");
  var deleteButton = document.createElement("span");
  var editButton = document.createElement("span");
  var btnWrapper = document.createElement("span");
  deleteButton.innerHTML = "Delete";
  editButton.innerHTML = "Edit";

  task.value = value ?? input.value;

  task.setAttribute("readonly", true);
  task.setAttribute("class", "task");

  deleteButton.classList.add("dlt-btn");
  editButton.classList.add("edit-btn");
  btnWrapper.appendChild(editButton);
  btnWrapper.appendChild(deleteButton);

  li.appendChild(task);
  li.appendChild(btnWrapper);

  li.classList.add("todo");

  ul.appendChild(li);

  input.value = "";
  return task.value;
}

input.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    tasks.push(addTodo());
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

$(document).on("click", ".task", function () {
  $(this).attr("readonly") ? $(this).toggleClass("linethrough") : null;
});

$(document).on("click", ".dlt-btn", function () {
  $(this).parent().parent().remove();
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task, index) => {
    $(this).parent().siblings()[0].value === task
      ? tasks.splice(index, 1)
      : null;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

function editTodo() {}

$(document).on("click", ".edit-btn", function () {
  $todoInput = $(this).parent().siblings();
  tasks = JSON.parse(localStorage.getItem("tasks"));
  console.log($todoInput[0]);
  let oldIndex = 0;
  document.querySelectorAll("li").forEach((item, index) => {
    console.log(item, index);
    if (item === $(this).parent().parent()[0]) {
      console.log("yes");
      oldIndex = index;
    }
  });
  console.log(document.getElementById($todoInput[0].id));

  if ($todoInput.attr("readonly")) {
    $todoInput.removeAttr("readonly") && $(this).html("Save");
  } else {
    tasks[oldIndex] = $todoInput[0].value;
    $todoInput.attr("readonly", true);
    $(this).html("Edit");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

window.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("tasks")) {
    JSON.parse(localStorage.getItem("tasks")).forEach((element) => {
      tasks.push(element);
      addTodo(element);
    });
  }
});
