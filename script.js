import data from "./data.js";

const inputPage = document.getElementById("page-group");
const tableBody = document.getElementById("table-body");
const pageBlock = document.querySelector("#pagination");
let curPage = 1;
inputPage.max = data.length / 2;

let totalPage = data.length / inputPage.value;

createPageButton(totalPage);
renderContent(0, parseInt(inputPage.value), 1);

inputPage.onchange = (e) => {
  const contentPerPage = parseInt(e.target.value);
  totalPage = Math.ceil(data.length / contentPerPage);

  createPageButton(totalPage);
  renderContent(0, contentPerPage);
};

function renderContent(start, end) {
  const displayContent = data.slice(start, end);
  console.log(displayContent);
  tableBody.innerHTML = "";
  displayContent.forEach((el) => {
    const innerHTML = ` <tr>
    <td>${el.id}</td>
    <td>${el.name}</td>
    <td>${el.email}</td>
  </tr>`;
    tableBody.insertAdjacentHTML("beforeend", innerHTML);
  });
}

function createPageButton(pages) {
  pageBlock.innerHTML = "";
  pageBlock.innerHTML = `<button class="page">First</button>`;
  pageBlock.insertAdjacentHTML(
    "beforeend",
    `<button class="page">Previous</button>`
  );
  for (let i = 0; i < pages; i++) {
    const btn = document.createElement("button");
    btn.classList.add("page");
    btn.value = i + 1;
    btn.innerText = i + 1;
    pageBlock.appendChild(btn);
  }
  pageBlock.insertAdjacentHTML(
    "beforeend",
    `<button class="page">Next</button>`
  );
  pageBlock.insertAdjacentHTML(
    "beforeend",
    `<button class="page">Last</button>`
  );
}

pageBlock.addEventListener("click", (e) => {
  if (e.target.classList.contains("page")) {
    if (e.target.innerText === "Next") {
      return;
    }
    if (e.target.innerText === "Previous") {
      return;
    }
    if (e.target.innerText === "First") {
      renderContent(0, parseInt(inputPage.value), parseInt(e.target.value));
      return;
    }
    if (e.target.innerText === "Last") {
      renderContent(
        data.length - parseInt(inputPage.value),
        data.length,
        parseInt(e.target.value)
      );
      return;
    }

    const start = (parseInt(e.target.value) - 1) * parseInt(inputPage.value);
    const end =
      start + parseInt(inputPage.value) > data.length
        ? data.length
        : start + parseInt(inputPage.value);

    renderContent(start, end);
    pageBlock.childNodes.forEach((el) => el.classList.remove("btn-active"));

    e.target.classList.add("btn-active");
  }
});
