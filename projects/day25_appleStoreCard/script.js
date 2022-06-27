const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  function handleCardClick() {
    // 一定要先改变class
    card.classList.toggle("active");
    const parentNode = card.offsetParent;
    if (card.classList.contains("active")) {
      parentNode.classList.add("no-scroll");
    } else {
      parentNode.classList.remove("no-scroll");
    }

    const scale = parentNode.clientWidth / card.clientWidth;
    const height =
      (parentNode.offsetHeight -
        card.querySelector("img").offsetHeight * scale -
        card.querySelector("h4").offsetHeight * scale) /
      scale;
    console.log(
      card.querySelector("img").offsetHeight,
      card.querySelector("h4").offsetHeight
    );
    const y = (card.offsetTop - parentNode.scrollTop) * -1;

    card.querySelector(".content").style.height = `${height / scale}px`;
    card.style.setProperty("--height", parentNode.offsetHeight / scale);
    card.style.setProperty("--scale", scale);
    card.style.setProperty("--y", y);
  }
  card.addEventListener("click", handleCardClick, false);
});
