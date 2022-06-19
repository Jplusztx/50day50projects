const btn = document.querySelector(".button");

btn.addEventListener("click", (e) => {
  const { left, top } = e.currentTarget.getBoundingClientRect();
  const x = e.x - left;
  const y = e.y - top;
  const circle = document.createElement("span");
  circle.style.left = x + "px";
  circle.style.top = y + "px";
  circle.className = "circle";
  btn.appendChild(circle);
  setTimeout(() => {
    circle.remove();
  }, 800);
});
