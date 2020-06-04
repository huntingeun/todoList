const toDoInput = document.querySelector(".js-toDoInput");
const toDoBtn = document.querySelector(".js-toDoBtn");
const toDoList = document.querySelector(".js-toDoList");
const filter = document.querySelector("#filterToDo");

function paintToDo(event) {
  event.preventDefault();

  const div = document.createElement("div");
  div.classList.add("js-toDo");
  toDoList.appendChild(div);

  const li = document.createElement("li");
  div.appendChild(li);
  li.classList.add("js-toDoItem");
  li.innerText = toDoInput.value;

  const checkBtn = document.createElement("button");
  div.appendChild(checkBtn);
  checkBtn.classList.add("checkBtn");
  const checkIcon = document.createElement("i");
  checkBtn.appendChild(checkIcon);
  checkIcon.classList.add("fas");
  checkIcon.classList.add("fa-check");

  const delBtn = document.createElement("button");
  div.appendChild(delBtn);
  delBtn.classList.add("delBtn");
  const delIcon = document.createElement("i");
  delBtn.appendChild(delIcon);
  delIcon.classList.add("fas");
  delIcon.classList.add("fa-trash");

  //saveToDo(toDoInput.value);
  toDoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  if (item.classList[0] === "delBtn") {
    const todo = item.parentNode;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //add event listener "transitionend" then function!! to get the animation firmly
  else if (item.classList[0] === "checkBtn") {
    const todo = item.parentNode;
    todo.classList.toggle("checked");
  }
}

function filterToDo(event) {
  const todo = toDoList.childNodes; //childNodes 자식들!
  todo.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "checked":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unchecked":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveToDo(todo) {
  let toDos;
  const loadToDo = localStorage.getItem("toDos");
  if (loadToDo === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(loadToDo);
  }
  toDos.push(todo);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function init() {
  toDoBtn.addEventListener("click", paintToDo);
  toDoList.addEventListener("click", deleteCheck);
  filter.addEventListener("click", filterToDo);
}

init();
