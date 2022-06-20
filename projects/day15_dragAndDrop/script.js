const boxes = document.querySelectorAll(".box");

const img = document.querySelector(".img");

img.addEventListener("drag", (e) => {
  boxes.forEach((i) => i.classList.add("drag"));
});
img.addEventListener("dragend", (e) => {
  boxes.forEach((i) => i.classList.remove("drag"));
});

boxes.forEach((i) => {
  i.addEventListener("dragover", (e) => {
    e.preventDefault();
    i.classList.add("dragOver");
  });
  i.addEventListener("dragleave", (e) => {
    e.preventDefault();
    i.classList.remove("dragOver");
  });
  i.addEventListener("drop", () => {
    i.appendChild(img);
  });
});
