import data from "./data.js";

const inputPage = document.getElementById("page-group");
const tableBody = document.getElementById("table-body");
const pageBlock = document.querySelector("#pagination");

let curPage = 0;
inputPage.max = data.length / 2;

let totalPage = Math.ceil(data.length / inputPage.value);

createPageButton(totalPage);
renderContent(0, parseInt(inputPage.value), 1);
btnActive(curPage + 1);

inputPage.onchange = (e) => {
  const contentPerPage = parseInt(e.target.value);
  totalPage = Math.ceil(data.length / contentPerPage);

  createPageButton(totalPage);
  renderContent(0, contentPerPage);
  btnActive(1);
  curPage = 0;
};

function renderContent(start, end) {
  const displayContent = data.slice(start, end);
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  tableBody.innerHTML = "";
  displayContent.forEach((el) => {
    const innerHTML = ` <tr>
    <td>${el.id}</td>
    <td>${el.name}</td>
    <td>${el.email}</td>
  </tr>`;
    tableBody.insertAdjacentHTML("beforeend", innerHTML);
  });

  if (curPage < totalPage) {
    next.disabled = curPage === totalPage - 1;
    last.disabled = curPage === totalPage - 1;
  }
  if (curPage >= 0) {
    prev.disabled = curPage === 0;
    first.disabled = curPage === 0;
  }
}

function createPageButton(pages) {
  pageBlock.innerHTML = "";
  pageBlock.innerHTML = `<button class="page" id="first">First</button>`;
  pageBlock.insertAdjacentHTML(
    "beforeend",
    `<button class="page" id="prev">Previous</button>`
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
    `<button class="page" id="next">Next</button>`
  );
  pageBlock.insertAdjacentHTML(
    "beforeend",
    `<button class="page" id="last">Last</button>`
  );
}

pageBlock.addEventListener("click", (e) => {
  if (e.target.classList.contains("page")) {
    const tp = Math.ceil(data.length / parseInt(inputPage.value));

    if (e.target.innerText === "Next") {
      if (curPage < tp - 1) {
        curPage += 1;
        const st =
          (curPage % parseInt(inputPage.value)) * parseInt(inputPage.value);
        const en = st + parseInt(inputPage.value);
        renderContent(st, en);
        btnActive(curPage + 1);
      }

      return;
    }
    if (e.target.innerText === "Previous") {
      if (curPage > 0) {
        curPage--;
        const st1 = curPage * parseInt(inputPage.value);
        const en1 = st1 + parseInt(inputPage.value);

        renderContent(st1, en1);
        btnActive(curPage + 1);
      }

      return;
    }
    if (e.target.innerText === "First") {
      curPage = 0;
      renderContent(0, parseInt(inputPage.value));
      btnActive(1);

      return;
    }
    if (e.target === last) {
      curPage = totalPage - 1;
      const s = (tp - 1) * parseInt(inputPage.value);
      btnActive(tp);
      renderContent(s, data.length);
      return;
    }

    const start = (parseInt(e.target.value) - 1) * parseInt(inputPage.value);
    const end =
      start + parseInt(inputPage.value) > data.length
        ? data.length
        : start + parseInt(inputPage.value);
    curPage = parseInt(e.target.innerText) - 1;

    renderContent(start, end);

    pageBlock.childNodes.forEach((el) => el.classList.remove("btn-active"));

    e.target.classList.add("btn-active");
  }
});

function btnActive(val) {
  pageBlock.childNodes.forEach((el) => {
    el.classList.remove("btn-active");
    if (parseInt(el.innerText) === val) {
      el.classList.add("btn-active");
    }
  });
}
