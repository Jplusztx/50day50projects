const ta = document.querySelector("textarea");

ta.addEventListener("input", handleInput, false);
ta.addEventListener("keydown", handleKeydown, false);

function handleInput(e) {
  e.preventDefault();
  const value = e.target.value;
  const items = value.split(/,/g);
  const ctn = document.querySelector(".itemContainer");
  ctn.textContent = "";
  const fgm = items.reduce((fgm, item) => {
    if (item === "") return fgm;
    const div = document.createElement("div");
    div.className = "choice_item";
    div.textContent = item;
    fgm.appendChild(div);
    return fgm;
  }, document.createDocumentFragment());
  ctn.appendChild(fgm);
}

function handleKeydown(e) {
  if (e.key !== "Enter") return;
  e.preventDefault();
  e.target.value = "";
  random();
}

function random() {
  const items = document.querySelectorAll(".choice_item");
  if (items.length === 0) return;
  let save = null;
  let start = null;
  function randomChoice(time) {
    if (!start) {
      start = time;
    }
    if (time - start >= 4000) {
      clearTimeout(save);
      return;
    } else if (!save) {
      const index = (Math.random() * items.length) ^ 0;
      items[index].classList.add("choice_item__active");
      can = false;
      save = setTimeout(() => {
        items[index].classList.remove("choice_item__active");
        save = null;
      }, 200);
    }
    requestAnimationFrame(randomChoice);
  }
  requestAnimationFrame(randomChoice);
}
