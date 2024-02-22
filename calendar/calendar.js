const currentDate = new Date();

const monthSelect = document.getElementById("current-month-selector");
const yearSelect = document.getElementById("current-year-selector");

const monthPopup = document.getElementById("month-popup");
const monthList = document.getElementById("months");
const yearPopup = document.getElementById("year-popup");
const yearList = document.getElementById("years");

// Display calendar
const calendar = () => {
  currentDate.setDate(1);

  const days = document.querySelector(".days");

  const lastDateOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const lastDateOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const firstDayOfMonth = currentDate.getDay();

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDay();

  const nextDate = 7 - lastDayOfMonth - 1;

  const months = [
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
  // Hiển thị năm
  document.querySelector(
    ".current-date h2"
  ).innerHTML = `${currentDate.getFullYear()}`;
  // Hiển thị tháng
  document.querySelector(".current-date h1").innerHTML = `${
    months[currentDate.getMonth()]
  }`;
  // Hiển thị ngày hiện tại
  document.querySelector(".current-date p").innerHTML =
    new Date().toDateString();

  let dateItem = "";

  for (let x = firstDayOfMonth; x > 0; x--) {
    dateItem += `<li class="prev-date">${lastDateOfLastMonth - x + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    if (
      i === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear()
    ) {
      dateItem += `<li class="today">${i}</li>`;
    } else {
      dateItem += `<li>${i}</li>`;
    }
  }

  for (let j = 1; j <= nextDate; j++) {
    dateItem += `<li class="next-date">${j}</li>`;
  }
  days.innerHTML = dateItem;
};

document.querySelector(".current-date p").addEventListener("click", () => {
  currentDate.setFullYear(new Date().getFullYear());
  currentDate.setMonth(new Date().getMonth());
  calendar();
});

// Danh sách tháng
monthSelect.onclick = function () {
  monthPopup.style.display = "block";
};

window.addEventListener("click", function (event) {
  if (!monthPopup.contains(event.target) && event.target !== monthSelect) {
    monthPopup.style.display = "none";
  }
});

monthList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    const selectedMonthIndex = parseInt(e.target.getAttribute("month"));
    currentDate.setMonth(selectedMonthIndex);
    calendar();
    monthPopup.style.display = "none";
  }
});

// Danh sách năm
yearSelect.onclick = function () {
  displayYearList();
  yearPopup.style.display = "block";
};

window.addEventListener("click", function (event) {
  if (!yearPopup.contains(event.target) && event.target !== yearSelect) {
    yearPopup.style.display = "none";
  }
});

yearList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    const selectedYear = parseInt(e.target.textContent);
    currentDate.setFullYear(selectedYear);
    calendar();
    yearPopup.style.display = "none";
  }
});

function displayYearList() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = currentYear - 100; i <= currentYear + 99; i++) {
    years.push(`<li>${i}</li>`);
  }

  yearList.innerHTML = years.join("");
}

// Sự kiện ấn nút để chuyển tháng
document.getElementById("previous").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  calendar();
});

document.getElementById("next").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  calendar();
});

// Scroll
document.querySelector(".calendar").addEventListener("wheel", (event) => {
  if (event.deltaY < 0) {
    currentDate.setMonth(currentDate.getMonth() - 1);
  } else {
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  calendar();
});

document.getElementById("years").addEventListener("wheel", function (event) {
  event.stopPropagation();
});
calendar();
