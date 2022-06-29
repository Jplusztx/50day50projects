const container = document.querySelector(".container");
const choice = document.querySelector(".choice");
const boxesCount = 16;

const boxes = [];
const fragment = document.createDocumentFragment();
for (let i = 0; i < boxesCount; i++) {
  const div = document.createElement("div");
  div.className = "box";
  div.textContent = i + 1;
  boxes.push(div);
  fragment.appendChild(div);
}
container.appendChild(fragment);

function createSelectDiv() {
  const div = document.createElement("div");
  div.className = "select";
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
}

function checkBoxSelect(start, end) {
  const select = [];
  function check(point) {
    return (
      point.x >= start.x &&
      point.y >= start.y &&
      point.x <= end.x &&
      point.y <= end.y
    );
  }
  boxes.forEach((box, index) => {
    const { top, left, bottom, right } = box.getBoundingClientRect();
    const tl = { x: left, y: top };
    const tr = { x: right, y: top };
    const bl = { x: left, y: bottom };
    const br = { x: right, y: bottom };
    if (check(tl) || check(tr) || check(bl) || check(br)) {
      box.classList.add("active");
      select.push(index + 1);
    } else {
      box.classList.remove("active");
    }
  });
  return select;
}
function computeSelectActuallyStartAndEnd(start, end) {
  return {
    start: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) },
    end: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) },
  };
}
window.addEventListener("mousedown", (downEvent) => {
  let mouseStart = { x: downEvent.x, y: downEvent.y };
  let canSelect = true;
  const select = createSelectDiv();
  window.addEventListener("mousemove", (moveEvent) => {
    moveEvent.preventDefault();
    if (!canSelect) return;
    select.style.display = "block";
    let mouseEnd = { x: moveEvent.x, y: moveEvent.y };
    let { start, end } = computeSelectActuallyStartAndEnd(mouseStart, mouseEnd);
    select.style.left = `${start.x}px`;
    select.style.top = `${start.y}px`;
    select.style.width = `${Math.abs(end.x - start.x)}px`;
    select.style.height = `${Math.abs(end.y - start.y)}px`;
    const selectItems = checkBoxSelect(start, end);
    choice.textContent = `Choice Item Index: [${selectItems.join(", ")}]`;
  });
  window.addEventListener("mouseup", () => {
    canSelect = false;
    select.remove();
  });
});
