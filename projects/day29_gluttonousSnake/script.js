window.addEventListener("mousemove", (e) => {
  e.preventDefault();
});

/**
 * 生成蛇
 * @param {HTMLDivElement} el 生成蛇的盒子
 * @param {number} edge 每行每列多少格子（格子大小根据el大小计算）
 */
function Snake(el = document.body, edge = 25) {
  if (edge < 5) {
    throw new Error("每行每列不得小于5!");
    return;
  }
  /************************ private parameters Start ************************/
  const contentWidth = el.clientWidth;
  const contentHeight = el.clientHeight;
  const squareWidth = contentWidth / edge;
  const squareHeight = contentHeight / edge;
  const boxes = [];
  const foodPos = [];
  let autoMove = null;
  /************************ private parameters End ************************/

  /************************ public parameters Start ************************/
  this.snake = [];
  this.dir = "right";
  this.death = false;
  /************************ public parameter End ************************/

  /************************ private function Start ************************/
  /**
   * 为 square 设置基础 style 值
   * @param {HTMLElement} el HTML DOM元素
   */
  function setSquareStyle(el) {
    const cssText = `
      width: ${squareWidth}px;
      height: ${squareHeight}px;
      float: left;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.2);
    `;
    el.style.cssText = cssText;
  }
  /**
   * 为 square 设置 snake 结点的 style 值
   * @param {HTMLElement} el HTML DOM元素
   * @param {'head' | 'body'} type 蛇的结点类型
   */
  function setSnakeStyle(el, type = "head") {
    const cssText = `
      width: ${squareWidth}px;
      height: ${squareHeight}px;
      float: left;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background-color: ${
        type === "head" ? "rgb(0, 183, 255)" : "rgb(238, 169, 169)"
      };`;
    el.style.cssText = cssText;
  }
  /**
   * 生成[min, max)范围的整数
   * @param {number} min 随机数中最小的数
   * @param {number} max 随机数中最大的
   */
  const random = (min = 0, max = edge) => {
    return ((Math.random() * (max - min)) ^ 0) + min;
  };
  /**
   * 清楚自动移动
   */
  const removeAutoMove = () => {
    clearInterval(autoMove);
    autoMove = null;
  };
  /**
   * 设置蛇自动移动
   * @param {number} speed 蛇的移动速度
   */
  const setAutoMove = () => {
    removeAutoMove();
    const speed = 515 - 5 * this.snake.length;
    autoMove = setInterval(
      () => {
        move(this.dir);
      },
      speed <= 50 ? 50 : speed
    );
  };
  /**
   * 根据坐标计算下标
   * @param {number} x
   * @param {number} y
   * @returns boxes index
   */
  const cIndex = (x, y) => {
    return y * edge + x;
  };
  /**
   * 根据snake数组让蛇显示到面板上
   */
  const createSnake = () => {
    if (deathCheck()) {
      this.snake;
      alert(`当前得分：${this.snake.length - 3}!`);
      restart();
      return;
    }
    this.snake.forEach(({ x, y }, i) => {
      const index = cIndex(x, y);
      setSnakeStyle(boxes[index], "body");
    });
    const head = this.snake[0];
    setSnakeStyle(boxes[cIndex(head.x, head.y)]);
    if (foodPos.length === 0) {
      this.createFood();
    }
  };
  /**
   * 判断蛇是否死亡
   * @returns {boolean}
   */
  const deathCheck = () => {
    const set = new Set();
    this.snake.forEach(({ x, y }) => {
      if (this.death) return;
      const i = cIndex(x, y);
      if (
        set.has(i) ||
        i >= edge * edge ||
        i < 0 ||
        x < 0 ||
        y < 0 ||
        x >= edge ||
        y >= edge
      ) {
        this.death = true;
      }
      set.add(i);
    });
    return this.death;
  };
  /**
   * 检测蛇是否吃到食物
   * @param {number} x snake head x
   * @param {number} y snake head y
   */
  const eatCheck = (x, y) => {
    const index = foodPos.findIndex((food) => {
      return cIndex(food.x, food.y) === cIndex(x, y);
    });
    if (index !== -1) {
      foodPos.splice(index, 1);
    } else {
      const last = this.snake.pop();
      setSquareStyle(boxes[cIndex(last.x, last.y)]);
    }
  };
  /**
   * 蛇的移动函数
   * @param {'top' | 'left' | 'right' | 'bottom'} dir 移动的方向
   */
  const move = (dir) => {
    setAutoMove();
    if (dir === "left" && this.dir === "right") return;
    if (dir === "right" && this.dir === "left") return;
    if (dir === "top" && this.dir === "bottom") return;
    if (dir === "bottom" && this.dir === "top") return;
    this.dir = dir;
    let x = this.snake[0].x;
    let y = this.snake[0].y;
    if (dir === "top") {
      y--;
    } else if (dir === "bottom") {
      y++;
    } else if (dir === "left") {
      x--;
    } else {
      x++;
    }
    eatCheck(x, y);
    this.snake.unshift({ x, y });
    createSnake();
  };
  /**
   * 重新开始游戏
   */
  const restart = () => {
    boxes.forEach((box) => {
      setSquareStyle(box);
    });
    foodPos.splice(0, foodPos.length);
    const mid = (edge / 2) ^ 0;
    this.snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ];
    this.dir = "right";
    this.death = false;
    removeAutoMove();
    createSnake();
  };
  /************************ private function End ************************/

  /************************ public function Start ************************/
  /**
   * 生成食物方块
   */
  this.createFood = function () {
    let x = random();
    let y = random();
    while (
      this.snake.find((c) => {
        return x === c.x && y === c.y;
      })
    ) {
      x = random();
      y = random();
    }
    const box = boxes[y * edge + x];
    box.style.backgroundColor = "rgb(182, 170, 0, 1)";
    foodPos.push({ x, y });
  };
  /************************ public function End ************************/

  /************************ Function Body Start ************************/
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < edge; i++) {
    for (let j = 0; j < edge; j++) {
      const square = document.createElement("div");
      setSquareStyle(square);
      boxes.push(square);
      fragment.appendChild(square);
    }
  }
  el.style.flex = "0 0 auto";
  el.appendChild(fragment);
  restart();
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && this.dir !== "left") {
      move("left");
    } else if (e.key === "ArrowUp" && this.dir !== "top") {
      move("top");
    } else if (e.key === "ArrowRight" && this.dir !== "right") {
      move("right");
    } else if (e.key === "ArrowDown" && this.dir !== "bottom") {
      move("bottom");
    }
  });
  /************************ Function Body End ************************/
}

const container = document.querySelector(".game-container");

const snake = new Snake(container, 10);
