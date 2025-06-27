const nav = document.querySelectorAll("#nav__item");
const currentMoneyEls = document.querySelectorAll("#current__money");
const addBtn = document.querySelector("#add__btn");
const addValue = document.querySelector("#add__value");
const withdrawBtn = document.querySelector("#withdraw__btn");
const withdrawInput = document.querySelector(
  "#withdraw__money input[type='number']",
);
const recentTransactionsList = document.querySelector(
  "#dashboard .card.col-span-2 ul",
);
const historyList = document.querySelector("#transaction__history ul");

let totalAmount = 0;
let transactions = [
  {
    date: new Date(2025, 5, 21),
    description: "Withdraw",
    type: "Withdrawal",
    amount: -1000,
  },
  {
    date: new Date(2025, 5, 5),
    description: "Electricity Bill",
    type: "Withdrawal",
    amount: -1300,
  },
  {
    date: new Date(2025, 5, 1),
    description: "Deposit",
    type: "Deposit",
    amount: 2500,
  },
];

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();
  return `${day}-${month.toLowerCase()}-${year}`;
}

function updateMoney() {
  let total = transactions.reduce((sum, t) => sum + t.amount, 0);
  if (total < 0) total = 0;
  currentMoneyEls.forEach((el) => (el.textContent = total.toFixed(2)));
}

function renderRecentTransactions() {
  const items = transactions
    .slice(-3)
    .reverse()
    .map(
      (t) => `
      <li class="transaction__li ${t.amount > 0 ? "plus" : "minus"}">
        <span>
          ${t.description} <br />
          ${formatDate(t.date)}
        </span>
        <span>${t.amount > 0 ? "+" : "-"} $${Math.abs(t.amount).toFixed(2)}</span>
      </li>
    `,
    )
    .join("");
  recentTransactionsList.innerHTML = items;
}

function renderHistory() {
  let html = `
      <li class="text-bold flex justify-around border-b border-gray-700 py-2">
        <p>date</p>
        <p>Description</p>
        <p>Type</p>
        <p>Amount</p>
      </li>
    `;
  transactions
    .slice()
    .reverse()
    .forEach((t) => {
      html += `
        <li class="history__li">
          <p>${formatDate(t.date)}</p>
          <p class="${t.amount > 0 ? "plus" : "minus"}">${t.description}</p>
          <p class="${t.amount > 0 ? "plus__type" : "minus__type"}">${t.type}</p>
          <p class="${t.amount > 0 ? "plus" : "minus"}">${t.amount > 0 ? "+" : "-"}$${Math.abs(t.amount).toFixed(2)}</p>
        </li>
      `;
    });
  historyList.innerHTML = html;
}

function addTransaction(amount, description, type) {
  transactions.push({
    date: new Date(),
    description,
    type,
    amount,
  });
  updateMoney();
  renderRecentTransactions();
  renderHistory();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const value = parseFloat(addValue.value);
  if (!isNaN(value) && value > 0) {
    addTransaction(value, "Deposit", "Deposit");
    addValue.value = "";
  }
});

withdrawBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const value = parseFloat(withdrawInput.value);
  let current = transactions.reduce((sum, t) => sum + t.amount, 0);
  if (!isNaN(value) && value > 0 && value <= current) {
    addTransaction(-value, "Withdrawal", "Withdrawal");
    withdrawInput.value = "";
  } else if (value > current) {
    alert("Insufficient funds!");
  }
});

nav.forEach((item) => {
  item.addEventListener("click", function () {
    nav.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.remove("active__view");
    });
    const viewId = this.getAttribute("data__view");
    document.getElementById(viewId).classList.add("active__view");
  });
});

document.querySelectorAll("#quick__btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const viewId = this.getAttribute("data__view");
    nav.forEach((nav) => nav.classList.remove("active"));
    document
      .querySelector(`[data__view="${viewId}"]#nav__item`)
      .classList.add("active");
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.remove("active__view");
    });
    document.getElementById(viewId).classList.add("active__view");
  });
});

updateMoney();
renderRecentTransactions();
renderHistory();
