const imgUrl = "https://source.unsplash.com/random/1380x600";

const itemNumber = 5;
const container = document.querySelector(".expandingCard");

const createExpandingCardItem = (imgUrl, desc) => {
  const item = document.createElement("div");
  item.className = "expandingCard_item";
  const img = document.createElement("img");
  img.className = "expandingCard_itemImg";
  img.src = imgUrl;
  img.alt = desc;
  const span = document.createElement("span");
  span.className = "expandingCard_itemDesc";
  span.textContent = desc;
  item.appendChild(img);
  item.appendChild(span);
  return item;
};

window.onload = () => {
  const fragment = document.createDocumentFragment();
  const randArr = crypto.getRandomValues(new Uint16Array(itemNumber));
  const items = [];
  for (let i = 0; i < itemNumber; i++) {
    const item = createExpandingCardItem(
      `${imgUrl}?rand=${randArr[i]}`,
      "Random Card Desc"
    );
    items.push(item);
    fragment.appendChild(item);
    item.addEventListener(
      "click",
      () => {
        items.forEach((cur, index) => {
          if (index === i) {
            cur.classList.add("expandingCard_item__active");
          } else {
            cur.classList.remove("expandingCard_item__active");
          }
        });
      },
      false
    );
  }
  container.appendChild(fragment);
};
