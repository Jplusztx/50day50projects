const bg = document.querySelector(".bg");
const load = document.querySelector(".loading");

let startTime = null;
let duration = 4000;
function animate(time) {
  if (!startTime) {
    startTime = time;
  }
  if (time >= startTime + duration) {
    bg.style.filter = `blur(0px)`;
    load.style.opacity = "0";
    load.textContent = `100%`;
    return;
  } else {
    let percent = (time - startTime) / duration;
    bg.style.filter = `blur(${50 * (1 - percent)}px)`;
    load.style.opacity = 1 - percent.toFixed(2);
    load.textContent = `${Math.floor(percent * 100)}%`;
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
