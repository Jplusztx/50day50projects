const hiddenSearch = document.querySelector(".hiddenSearch");
const icon = document.querySelector(".hiddenSearch .hiddenSearch_icon");

icon.addEventListener(
  "click",
  () => {
    hiddenSearch.classList.toggle("hiddenSearch__active");
  },
  false
);
