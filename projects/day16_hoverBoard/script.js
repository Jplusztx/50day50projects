const content = document.querySelector(".content");

const tpl = document.createDocumentFragment();
const squares = [];
for (let i = 0; i < 600; i++) {
  const div = document.createElement("div");
  div.className = "square";
  squares.push(div);
  tpl.appendChild(div);
}
content.appendChild(tpl);

function random(min = 0, max = 256) {
  const div = max - min;
  return (Math.random() * div) ^ 0;
}

squares.forEach((i) => {
  i.addEventListener(
    "mouseover",
    () => {
      const red = random(),
        green = random(),
        blue = random();
      i.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      i.style.boxShadow = ` rgb(${red}, ${green}, ${blue}) 0px 0px 2px, rgb(${red}, ${green}, ${blue}) 0px 0px 10px`;
    },
    false
  );
  i.addEventListener(
    "mouseleave",
    () => {
      i.style.backgroundColor = ``;
      i.style.boxShadow = ``;
    },
    false
  );
});
