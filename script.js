const nav = document.querySelectorAll("#nav__item");
const currentMoney = document.querySelectorAll("#current__money");
const addBtn = document.querySelector("#add__btn");
const addValue = document.querySelector("#add__value");
const withdrawBtn = document.querySelector("#withdraw__btn");

let transaction = [];
function formatDate(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return {
    year: date.getFullYear(),
    month: monthNames[date.getMonth()],
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
}

function updateMoney() {
  let total = totalAmount;
  if (total < 0) total = 0;
  currentMoney.forEach((item) => {
    item.textContent = total.toFixed(2);
  });
}

let totalAmount = 0;

function deposit() {
  let add = parseFloat(addValue.value);
  let date = new Date();
  if (add) {
    transaction.push({
      amount: add,
      time: formatDate(date),
      add: true,
    });
    totalAmount += add;
    addValue.value = "";
    updateMoney();
  }
}
const withdraw = () => {
  let withdrawAmount = Number(addValue.value);
  totalAmount = totalAmount - withdrawAmount;
  console.log(totalAmount);
  addValue.value = "";
  updateMoney();
};
addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  deposit();
});
withdrawBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("click");
  withdraw();
});

nav.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all nav items
    nav.forEach((nav) => {
      nav.classList.remove("active");
    });

    // Add active class to clicked nav item
    this.classList.add("active");

    // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.remove("active__view");
    });

    // Show the selected view
    const viewId = this.getAttribute("data__view");
    document.getElementById(viewId).classList.add("active__view");
  });
});
