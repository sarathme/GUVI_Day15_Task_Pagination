import data from "./data.js";

const inputPage = document.getElementById("page-group");
const tableBody = document.getElementById("table-body");
const pageBlock = document.querySelector("#pagination");

inputPage.max = data.length / 2;

let totalPage = data.length / inputPage.value;

createPageButton(totalPage);
renderContent(0, parseInt(inputPage.value));

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
  for (let i = 0; i < pages; i++) {
    const btn = document.createElement("button");
    btn.classList.add("page");
    btn.value = i + 1;
    btn.innerText = i + 1;
    pageBlock.appendChild(btn);
  }
}

pageBlock.addEventListener("click", (e) => {
  console.log(e.target.classList.contains("page"));
  if (e.target.classList.contains("page")) {
    const start = (parseInt(e.target.value) - 1) * parseInt(inputPage.value);
    const end =
      start + parseInt(inputPage.value) > data.length
        ? data.length
        : start + parseInt(inputPage.value);
    console.log(start);
    console.log(end);
    renderContent(start, end);
  }
});
