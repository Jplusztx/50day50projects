const container = document.querySelector(".container");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

left.addEventListener("mouseenter", () => {
  container.classList.add("show_left");
});
left.addEventListener("mouseleave", () => {
  container.classList.remove("show_left");
});

right.addEventListener("mouseenter", () => {
  container.classList.add("show_right");
});
right.addEventListener("mouseleave", () => {
  container.classList.remove("show_right");
});
