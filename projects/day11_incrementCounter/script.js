const counters = document.querySelectorAll(".counter");

counters.forEach((item) => {
  item.textContent = 0;
  const target = +item.getAttribute("count-target");
  const updateCounter = () => {
    const currentCounter = +item.innerText;
    if (currentCounter >= target) {
      item.textContent = target;
    } else {
      const increment = (target / 100) ^ 0;
      item.innerText = currentCounter + increment;
      requestAnimationFrame(updateCounter);
    }
  };
  requestAnimationFrame(updateCounter);
});
