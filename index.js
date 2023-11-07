"use stric";

let data = [];
let id = 0;

// element
const list = document?.querySelector(".list");
const form = document?.querySelector(".form");
let listItme;
// buttons
const plusBtn = document?.querySelector(".plus-btn");
const createBtn = document?.querySelector(".button");
// input

const input = document.querySelector(".input");

// logics
// ===============================================
plusBtn?.addEventListener("click", (e) => {
  form?.classList.remove("hidden");
  plusBtn?.classList.add("hidden");
});

const createElement = () => {
  list.innerHTML = "";
  if (data?.length > 0) {
    data.forEach((d) => {
      list.insertAdjacentHTML(
        "afterbegin",
        `<li class="list-item  ${d.isChecked ? "isChecked" : ""}" data-set="${
          d?.id
        }">
        <span class="check">${d.isChecked ? "CHESKED" : "CHECK"}</span>
      <p class="name">${d?.listName}</p>
      <span class="edit-s">Edit</span>
      <span class="del-s">Del</span>
      <div class="createdAt"><span>${d?.createdAt}</span></div>
    </li>`
      );
    });
  }
};

createBtn?.addEventListener("click", (e) => {
  e?.preventDefault();
  if (id === 0) {
    const date = new Date();
    const hour = date.getHours();
    const listObj = {
      id: date.getTime(),
      isChecked: false,
      listName: input?.value,
      createdAt: `${Math.abs(hour - 12)}.${
        date.getMinutes() <= 10 ? 0 + date.getMinutes() : date.getMinutes()
      } ${hour <= 12 ? "AM" : "PM"}`,
    };
    data.push(listObj);
  } else {
    data = data.map((d) => {
      if (d.id === id) {
        return {
          id: d.id,
          listName: input.value,
          isChecked: d.isChecked,
        };
      } else {
        return d;
      }
    });
    id = 0;
  }

  createElement();
  input.value = "";
  form.classList.add("hidden");
  plusBtn.classList.remove("hidden");
});

list.addEventListener("click", (e) => {
  console.log("salom");
  const target = e.target.classList[0];
  const dataset = +e.target.parentElement.dataset.set;
  if (target === "check") {
    data = data.map((d) => {
      if (d.id === dataset) {
        const newObj = {
          id: d.id,
          listName: d.listName,
          createdAt: d.createdAt,
          isChecked: !d.isChecked,
        };
        return newObj;
      } else {
        return d;
      }
    });
    createElement();
  } else if (target === "del-s") {
    data = data.filter((d) => d.id !== dataset);
    createElement();
  } else if (target === "edit-s") {
    form?.classList.remove("hidden");
    plusBtn?.classList.add("hidden");
    input.value = data.filter((d) => d.id === dataset)[0].listName;
    id = dataset;
  }
});
