const currentDate = document.querySelector("#current-date");
const day = document.querySelector(".days");
const nextIcon = document.querySelectorAll(".icons span");
const todayButton = document.getElementById("today");
const currentMonthSelect = document.getElementById("current-month-select");
const currentYearSelect = document.getElementById("current-year-select");

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

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

months.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = month;
  currentMonthSelect.add(option);
});

const startYear = 1900;
const endYear = 2050;

for (let year = startYear; year <= endYear; year++) {
  const option = document.createElement("option");
  option.value = year;
  const textNode = document.createTextNode(year);
  option.appendChild(textNode);
  currentYearSelect.appendChild(option);
}

currentMonthSelect.value = currentMonth;
currentYearSelect.value = currentYear;

currentMonthSelect.addEventListener("change", () => {
  currentMonth = parseInt(currentMonthSelect.value);
  calendar();
});

currentYearSelect.addEventListener("change", () => {
  currentYear = parseInt(currentYearSelect.value);
  calendar();
});

const calendar = () => {
  let selectedDate = new Date(currentYear, currentMonth, 1);
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let firstDayOfMonth = selectedDate.getDay();
  let lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  let dateItem = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    dateItem += `<li class="other-month">${lastDateOfLastMonth - i + 1}</li>`;
  }

  // ngày tháng này
  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isCurrentDay =
      i === date.getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
        ? "current-day"
        : "";
    dateItem += `<li class="${isCurrentDay}">${i}</li>`;
  }

  // ngày đầu tháng sau
  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    dateItem += `<li class="other-month">${i}</li>`;
  }

  currentDate.innerText = `${months[currentMonth]} , ${currentYear}`;
  day.innerHTML = dateItem;

  const newDate = document.querySelectorAll(".days li");

  newDate.forEach((dayItem) => {
    dayItem.addEventListener("click", () => {
      newDate.forEach((item) => {
        item.classList.remove("current-day");
      });

      dayItem.classList.add("current-day");
    });
  });
};

calendar();

nextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.className === "previous") {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
    } else if (icon.className === "next") {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
    }
    calendar();
  });
});

document.addEventListener("wheel", (event) => {
  if (event.deltaY < 0) {
    changeMonth("previous");
  } else if (event.deltaY > 0) {
    changeMonth("next");
  }
});

todayButton.addEventListener("click", () => {
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  currentMonthSelect.value = currentMonth;
  currentYearSelect.value = currentYear;
  calendar();
});

function changeMonth(direction) {
  if (direction === "previous") {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
  } else if (direction === "next") {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
  }
  calendar();
}
