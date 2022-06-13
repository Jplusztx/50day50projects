const container = document.querySelector(".container");
const circle = document.querySelector(".circle");
const menu = document.querySelector(".menu");
const close = document.querySelector(".close");

menu.addEventListener(
  "click",
  () => {
    container.classList.add("container__rotate");
  },
  false
);
close.addEventListener(
  "click",
  () => {
    container.classList.remove("container__rotate");
  },
  false
);
