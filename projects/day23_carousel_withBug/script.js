const prePath = "./img";
const imgsPath = new Array(5).fill(0).map((_, i) => `./img/img${i + 1}.jpg`);

/**
 * 目前只支持传入三张及以上的图片地址，小于3张会有点bug。
 * 如果想在每个图片前添加更多东西，可以加上addToItem函数，函数参数是每个元素的容器，可以向其中添加更多元素
 */
class Carousel {
  constructor(elementId, imgs, addToItem = (item, index) => {}) {
    if (typeof elementId !== "string") return;
    if (!Array.isArray(imgs)) return;
    if (imgs.length < 3) return;
    const el = document.querySelector(elementId);
    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.overflow = "hidden";
    div.style.position = "relative";
    el.appendChild(div);
    this._elContent = div;
    if (!el) return;
    this._el = el;
    this._imgEl = new Array();
    this.index = 0;
    this._addToItem = addToItem;
    imgs.forEach((i, index) => {
      this._imgEl.push(this._renderItem(i, index));
    });
    this._showImg();
  }
  _renderItem(imgSrc, index = 0) {
    const imgWrap = document.createElement("div");
    imgWrap.className = "carousel_item";
    imgWrap.style.width = "100%";
    imgWrap.style.height = "100%";
    const img = document.createElement("img");
    img.src = imgSrc;
    img.className = "carousel_itemImg";
    imgWrap.appendChild(img);
    this._addToItem(imgWrap, index);
    return imgWrap;
  }
  _showImg() {
    const fragment = document.createDocumentFragment();
    this._imgEl.forEach((i) => {
      fragment.appendChild(i);
    });
    this._setImgPosition();
    this._elContent.appendChild(fragment);
  }
  _setImgPosition() {
    const len = this._imgEl.length;
    const lastIndex = (this.index - 1 + len) % len;
    const nextIndex = (this.index + 1) % len;
    this._imgEl[this.index].classList.add("carousel_item__cur");
    this._imgEl[lastIndex].classList.add("carousel_item__pre");
    this._imgEl[nextIndex].classList.add("carousel_item__next");
  }
  _removeClasses() {
    this._imgEl.forEach((i) => {
      i.classList.remove("carousel_item__active");
      i.classList.remove("carousel_item__cur");
      i.classList.remove("carousel_item__pre");
      i.classList.remove("carousel_item__next");
    });
  }
  pre() {
    const len = this._imgEl.length;
    const lastIndex = (this.index - 1 + len) % len;
    this._removeClasses();
    this._imgEl[lastIndex].classList.add("carousel_item__active");
    this._imgEl[this.index].classList.add("carousel_item__active");
    this.index = lastIndex;
    this._setImgPosition();
  }
  next() {
    const len = this._imgEl.length;
    const nextIndex = (this.index + 1) % len;
    this._removeClasses();
    this._imgEl[nextIndex].classList.add("carousel_item__active");
    this._imgEl[this.index].classList.add("carousel_item__active");
    this.index = nextIndex;
    this._setImgPosition();
  }
  /**
   * 指定展示某一项，[0, len)
   */
  show(index) {
    if (index < 0 || index >= this._imgEl.length) {
      return;
    }
    this.index = index;
    this._removeClasses();
    this._setImgPosition();
  }
}
/**
 * 只需要传入：渲染在哪个元素上（以id名查找）,和图片路径数组即可(3张及以上)
 */
const carousel = new Carousel("#carousel", imgsPath);

const carousel1 = new Carousel("#carousel1", imgsPath, (item, index) => {
  const span = document.createElement("span");
  span.textContent = index + 1;
  span.className = "content";
  item.appendChild(span);
});

setInterval(() => {
  carousel.next();
  carousel1.next();
}, 3000);
