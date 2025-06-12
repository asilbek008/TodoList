// Sana chiqarish funksiyasi
function showDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Yanvar = 0
  const year = now.getFullYear();
  const formatted = `Bugun: ${day}.${month}.${year} yil`;
  document.getElementById("date-display").textContent = formatted;
}

// Har safar sahifa ochilganda sanani chiqaradi
showDate();

// Todo list funksiyalari
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = [];

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    };

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => {
      const newText = prompt("Yangi matn:", todo.text);
      if (newText && newText.trim()) {
        todos[index].text = newText.trim();
        renderTodos();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      renderTodos();
    };

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(editBtn, deleteBtn);

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "10px";
    left.append(checkbox, span);

    li.append(left, actions);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = "";
    renderTodos();
  }
});

