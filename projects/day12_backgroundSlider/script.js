const container = document.querySelector(".container");
const pre = "./assets/img";
const imgs = new Array(4).fill(0).map((_, i) => `${pre}${i + 1}.jpg`);

const imgDives = imgs.reduce((arr, img) => {
  const div = document.createElement("div");
  div.className = "slider";
  div.style.backgroundImage = `url(${img})`;
  container.appendChild(div);
  arr.push(div);
  return arr;
}, []);

let active = 0;
function setImage() {
  imgDives.forEach((i) => i.classList.remove("active"));
  imgDives[active].classList.add("active");
  document.body.style.backgroundImage = imgDives[active].style.backgroundImage;
}
setImage();

setInterval(() => {
  active = (active + 1) % imgs.length;
  setImage();
}, 4000);
