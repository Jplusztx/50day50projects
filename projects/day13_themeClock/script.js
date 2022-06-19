const themeBtn = document.querySelector("#theme");
const secondEl = document.querySelector(".second");
const minuteEl = document.querySelector(".minute");
const hourEl = document.querySelector(".hour");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

themeBtn.addEventListener(
  "click",
  () => {
    const hasDark = document.body.parentElement.classList.toggle("dark");
    themeBtn.textContent = hasDark ? "Light Mode" : "Dark Mode";
  },
  false
);
function setTime() {
  const currentTime = new Date();
  const month = currentTime.getMonth();
  const day = currentTime.getDay();
  const date = currentTime.getDate();
  const hours = currentTime.getHours();
  const hoursForClock = hours % 12;
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  timeEl.textContent = `${hours}:${minute} ${ampm}`;
  dateEl.textContent = `${days[day]}, ${months[month]} ${date}`;

  hourEl.style.transform = `translate(-100%, -50%) rotate(${
    (hoursForClock / 12) * 360
  }deg)`;
  minuteEl.style.transform = `translate(-100%, -50%) rotate(${
    (minute / 60) * 360
  }deg)`;
  secondEl.style.transform = `translate(-100%, -50%) rotate(${
    (second / 60) * 360
  }deg)`;
}

setTime();

setInterval(setTime, 1000);
