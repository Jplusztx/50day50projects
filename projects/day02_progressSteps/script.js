const progress = document.querySelector(".progressSteps");

const steps = 3;

const createStepItem = (step, active = false) => {
  const div = document.createElement("div");
  div.className = "progressSteps_item";
  if (active) {
    div.classList.add("progressSteps_item__active");
  }
  div.textContent = step;
  return div;
};

const fragment = document.createDocumentFragment();
const stepsItems = [];
for (let i = 0; i < steps; i++) {
  const item = createStepItem(i + 1, i === 0);
  stepsItems.push(item);
  fragment.appendChild(item);
}
progress.appendChild(fragment);

const clientWidth = progress.clientWidth;
const itemWidth = stepsItems[0].offsetWidth;
stepsItems.forEach((item, index) => {
  if (index < steps - 1) {
    item.style.marginRight = `${
      (clientWidth - steps * itemWidth) / (steps - 1)
    }px`;
  }
});
let cur = 0;
function update() {
  progress.style.setProperty("--width", `${(cur / (steps - 1)) * 100}%`);
  stepsItems.forEach((item, index) => {
    if (index <= cur) {
      item.classList.add("progressSteps_item__active");
    } else {
      item.classList.remove("progressSteps_item__active");
    }
  });
}
document.querySelector(".operate_pre").addEventListener("click", () => {
  cur = cur === 0 ? 0 : cur - 1;
  update();
});
document.querySelector(".operate_next").addEventListener("click", () => {
  cur = cur === steps - 1 ? steps - 1 : cur + 1;
  update();
});
