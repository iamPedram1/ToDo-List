// Add-to-Do Button Event
const addToBtn = document.getElementById("btn");
addToBtn.addEventListener("click", add);

function add() {
  const input = document.getElementById("input");
  const inputText = document.createTextNode(input.value);
  if (inputText.length <= 0) return;
  const createLi = document.createElement("li");
  const createP = document.createElement("p");
  const removeBtn = document.createElement("input");
  removeBtn.textContent = "X";
  createLi.append(createP);
  createP.appendChild(inputText);
  createLi.appendChild(removeBtn);
  createLi.setAttribute("class", "lists");
  removeBtn.setAttribute("class", "list__btn");
  const ul = document.querySelector("ul.list");
  ul.insertBefore(createLi, null);
  input.value = "";
  removeBtn.setAttribute("type", "button");
  removeBtn.setAttribute("value", "X");
  removeBtn.setAttribute("id", "removeButton");
  removeBtn.addEventListener(
    "click",
    function (e) {
      ul.removeChild(createLi);
    },
    false
  );
  const storeLists = document.querySelectorAll("li");
  let storeLiInput = [];
  for (let x = 0; x < storeLists.length; x++) {
    storeLiInput.push(storeLists[x].innerText);
  }

  for (let i = 0; i < storeLiInput.length; i++)
    localStorage.setItem(`list${i}`, storeLiInput[i]);
}

// Clear-the-list Button Event
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clear);

function clear() {
  const takeLi = document.querySelectorAll("ul > li");
  if (takeLi.length <= 0) return;
  for (let i = 0; i < takeLi.length; i++) {
    takeLi[i].remove();
  }
  localStorage.clear();
}

function restore() {
  const li = document.querySelectorAll("li");
  if (li.length == 0) {
    for (let times = 0; times < localStorage.length; times++) {
      const createLi = document.createElement("li");
      const createP = document.createElement("p");
      const removeBtn = document.createElement("input");
      removeBtn.setAttribute("class", "list__btn");
      createLi.setAttribute("class", "lists");
      createP.setAttribute("class", "ptext");
      removeBtn.textContent = "X";
      removeBtn.setAttribute("type", "button");
      removeBtn.setAttribute("value", "X");
      removeBtn.setAttribute("id", "removeButton");
      removeBtn.addEventListener(
        "click",
        function (e) {
          ul.removeChild(createLi);
        },
        false
      );
      createLi.appendChild(createP);
      createLi.appendChild(removeBtn);
      const ul = document.querySelector("ul.list");
      ul.insertBefore(createLi, null);
      const selected = document.querySelectorAll(".ptext");
      for (let x = 0; x < selected.length; x++) {
        selected[x].innerHTML = localStorage.getItem(`list${x}`);
      }
    }
  }
}

for (let i = 0; i < localStorage.length; i++) {
  restore();
}

const search = document.getElementById("searchField");
search.addEventListener("keyup", filterItems);

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const storeLists = document.getElementsByTagName("li");
  Array.from(storeLists).forEach((item) => {
    const itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
