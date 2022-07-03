const container = document.querySelector(".range-container");
const nav = document.querySelector(".range-nav");
const control = document.querySelector(".range-navControl");
const label = document.querySelector(".range-navControl-label");

let minValue = parseInt(container.getAttribute("min"));
let maxValue = parseInt(container.getAttribute("max"));
let curValue = parseInt(container.getAttribute("value"));

if (isNaN(minValue) || !isFinite(minValue)) minValue = 0;
if (isNaN(maxValue) || !isFinite(maxValue)) maxValue = 100;

if (!control.hasAttribute("value")) {
  let setValue = curValue;
  if (isNaN(curValue) || !isFinite(curValue) || curValue < minValue) {
    setValue = minValue;
  } else if (curValue > maxValue) {
    setValue = maxValue;
  }
  setXByValue(setValue);
}

function setValueByX(x) {
  const min = 0;
  const max = nav.clientWidth;
  if (x < min) x = min;
  else if (x > max) x = max;
  label.textContent = ((x / max) * (maxValue - minValue) + minValue) ^ 0;
  control.style.setProperty("--x", x);
}

function setXByValue(value) {
  const max = nav.clientWidth;
  const x = ((value - minValue) / (maxValue - minValue)) * max;
  control.style.setProperty("--x", x);
  label.textContent = value;
}

control.addEventListener("mousedown", (downEvent) => {
  let canMove = true;
  const downPosX = downEvent.x;
  const xStr = control.style.getPropertyValue("--x");
  const curX = xStr === "" ? 0 : parseInt(xStr);
  window.addEventListener("mousemove", (moveEvent) => {
    if (!canMove) return;
    moveEvent.preventDefault();
    const movePosX = moveEvent.x;
    let diffX = movePosX - downPosX;
    setValueByX(curX + diffX);
  });
  window.addEventListener("mouseup", () => {
    canMove = false;
  });
});

nav.addEventListener("mousedown", (e) => {
  let canMove = true;
  const left = nav.getBoundingClientRect().left;
  let x = e.x - left;
  setValueByX(x);
  let downPosX = null;
  window.addEventListener("mousemove", (moveEvent) => {
    if (!canMove) return;
    moveEvent.preventDefault();
    if (!downPosX) {
      downPosX = moveEvent.x;
    }
    const movePosX = moveEvent.x;
    let diffX = movePosX - downPosX;
    setValueByX(x + diffX);
  });
  window.addEventListener("mouseup", () => {
    canMove = false;
  });
});
