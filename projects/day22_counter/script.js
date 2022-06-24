const numEl = document.querySelector(".counter-num");
const dec = document.querySelector(".dec");
const inc = document.querySelector(".inc");

let cur = 0;

function setNum(num) {
  numEl.textContent = num;
  numEl.setAttribute("before", num - 1);
  numEl.setAttribute("after", num + 1);
}
setNum(cur);

/**
 *
 * @param {enum} type 'before' | 'after'
 */
function addClassName(type) {
  inc.disabled = true;
  dec.disabled = true;
  numEl.classList.add(type);
  setTimeout(() => {
    inc.disabled = false;
    dec.disabled = false;
    numEl.classList.remove(type);
    setNum(type === "before" ? --cur : ++cur);
  }, 300);
}
dec.addEventListener(
  "click",
  () => {
    addClassName("before");
  },
  false
);
inc.addEventListener(
  "click",
  () => {
    addClassName("after");
  },
  false
);

window.addEventListener("mousemove", (e) => {
  e.preventDefault();
});
