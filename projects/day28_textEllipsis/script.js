const textEllipsis = document.querySelectorAll(".textEllipsis");

let part = 4 / 5;

function ellipsis(item, more = "...") {
  item.setAttribute("more", more);
  const text = item.textContent;
  // 1. 每次取 part 来截取文字，直到scrollHeight === clientHeight
  let len = text.length;
  while (item.scrollHeight > item.clientHeight) {
    len = (len * part) ^ 0;
    item.textContent = text.slice(0, len);
  }
  function animationEllipsisText() {
    if (item.scrollHeight > item.clientHeight) {
      len = len - 1;
      item.textContent = text.slice(0, len);
      return;
    }
    len++;
    item.textContent = text.slice(0, len);
    requestAnimationFrame(animationEllipsisText);
  }
  requestAnimationFrame(animationEllipsisText);
}

textEllipsis.forEach((item, index) => {
  ellipsis(item, index === 0 ? "......More" : " ---- By Challenge");
});
