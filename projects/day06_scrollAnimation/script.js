const boxes = document.querySelectorAll(".box");

function checkBox() {
  const height = (window.innerHeight / 5) * 4;
  boxes.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < height) {
      item.classList.add("box__active");
    } else {
      item.classList.remove("box__active");
    }
  });
}
checkBox();
window.addEventListener("scroll", checkBox, false);
