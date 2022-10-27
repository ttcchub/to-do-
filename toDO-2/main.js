const btnSubmit = document.querySelector("#submit");
const taskList = document.querySelector(".task-list");
const taskInput = document.querySelector("#input-task");
const info = document.querySelector(".info");
const btnClearAll = document.querySelector("#clear-all");

let items = [];

const addTask = () => {
  const li = document.createElement("li");
  const checkbox = `<input type="checkbox" class="check" onclick="changeColor(this)"/>`;
  const delItem = `<span class="material-icons delBtn" onclick="removeTask(this)">close</span>`;
  const todoTxt = taskInput.value;
  li.innerHTML = `${checkbox}<p>${todoTxt}</p>${delItem}`;

  if (!items.includes(todoTxt)) {
    items.push(todoTxt);
    taskList.appendChild(li);
  }
  localStorage.setItem("items", JSON.stringify(items));
  taskInput.value = "";
  console.log(items.length);
  toggleClearAll();
};

const removeTask = (e) => {
  e.parentElement.remove();
  let todo = e.parentElement.children[1].textContent;
  if (items.includes(todo)) {
    items.splice(items.indexOf(todo), 1);
  }
  localStorage.setItem("items", JSON.stringify(items));
  toggleClearAll();
};

const loadTasks = () => {
  if (localStorage.getItem("items") == null) {
    return;
  } else {
    let items = Array.from(JSON.parse(localStorage.getItem("items")));
    items.forEach((item) => {
      const li = document.createElement("li");
      const checkbox = `<input type="checkbox" class="check" onclick="changeColor(this)"/>`;
      const delItem = `<span class="material-icons delBtn" onclick="removeTask(this)">close</span>`;
      const todoTxt = item;
      li.innerHTML = `${checkbox}<p>${todoTxt}</p>${delItem}`;
      taskList.appendChild(li);
    });
    toggleClearAll();
  }
};

const changeColor = (e) => {
  e.parentElement.classList.toggle("bg-change");
};

const toggleClearAll = () => {
  if (items.length > 0) {
    btnClearAll.style.display = "block";
  } else {
    btnClearAll.style.display = "none";
  }
};

btnClearAll.addEventListener("click", () => {
  taskList.innerHTML = "";
  items = [];
  localStorage.removeItem("items");
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  if (taskInput.value) {
    addTask();
  }
});

window.onload = loadTasks();
