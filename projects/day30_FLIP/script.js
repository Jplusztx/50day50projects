const flipBtn = document.querySelector(".flip");
const content = document.querySelector(".content");

function createBox(content) {
  const box = document.createElement("div");
  box.textContent = content;
  box.classList.add("box");
  return box;
}
let boxes = new Array(100).fill(0).map((_, i) => createBox(i));

class FLIP {
  constructor(elementArr, container, duration = 500) {
    this.arr = elementArr;
    this.container = container;
    this.duration = duration;
    this.animateArr = [];
    this.render();
    this.shuffle = this.shuffle.bind(this);
    this.play = this.play.bind(this);
  }
  shuffle() {
    this.first();
    const firstPos = this.firstPos;
    (function (boxes) {
      for (let i = 0, len = boxes.length; i < len; i++) {
        let rand = (Math.random() * (len - i) + i) ^ 0;
        [boxes[i], boxes[rand]] = [boxes[rand], boxes[i]];
        [firstPos[i], firstPos[rand]] = [firstPos[rand], firstPos[i]];
      }
      boxes.forEach((box) => content.appendChild(box));
    })(this.arr);
    this.render();
    this.last();
    this.invert();
    this.play();
  }
  render() {
    const container = this.container;
    container.innerHTML = "";
    this.arr.forEach((el) => container.appendChild(el));
  }
  // FLIP步骤如下
  first() {
    this.firstPos = this.arr.map((el) => el.getBoundingClientRect());
  }
  last() {
    this.lastPos = this.arr.map((el) => el.getBoundingClientRect());
  }
  invert() {
    const { firstPos, lastPos } = this;
    this.arr.forEach((el, index) => {
      const diffLeft = firstPos[index].left - lastPos[index].left;
      const diffTop = firstPos[index].top - lastPos[index].top;
      el.style.transform = `translate(${diffLeft}px, ${diffTop}px)`;
    });
  }
  play() {
    const { lastPos, duration } = this;
    if (this.animateArr.length) {
      this.animateArr.forEach((el) => el.cancel());
      // this.animateArr = [];
    }
    this.arr.forEach((el, index) => {
      const at = el.animate(
        {
          transform: [
            `translate(${lastPos[index]}px, ${lastPos[index]}px)`,
            `translate(0, 0)`,
          ],
        },
        duration
      );
      this.animateArr.push(at);
      at.onfinish = function () {
        el.style = "";
      };
    });
  }
}

const flip = new FLIP(boxes, content, 500);
flipBtn.addEventListener("click", flip.shuffle, false);
