const nav = document.querySelector(".nav");
const content = document.querySelector(".content");

window.addEventListener("scroll", handleWindowScroll);

function handleWindowScroll() {
  if (window.scrollY > nav.offsetHeight + 100) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
}
