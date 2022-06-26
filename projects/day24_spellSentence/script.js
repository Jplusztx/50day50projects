class SpellWordAnimation {
  constructor(parentEl, word, speed = 1, infinite = true) {
    if (word.length === 0) return;
    this._parentEl = parentEl;
    this._word = word;
    this._cur = "";
    this.eachTime = (500 / speed) ^ 0;
    this.lastTime = null;
    this.el = document.createElement("div");
    this.infinite = infinite;
    this._renderItem();
    this.startAnimation(this.eachTime);
  }
  _renderItem() {
    this.el.textContent = this._word;
    this.el.className = "spell";
    this._parentEl.appendChild(this.el);
  }
  _showText() {
    this.el.textContent = this._cur;
  }
  startAnimation(eachTime) {
    const that = this;
    this._stop = requestAnimationFrame(_animation);
    if (!isFinite(eachTime)) {
      eachTime = 500;
    }
    function _animation(time) {
      if (that._cur === that._word && time - that.lastTime >= eachTime) {
        if (!that.infinite) {
          that.pause();
          that._stop = null;
          return;
        }
        that._cur = "";
        that.lastTime = null;
      } else if (!that.lastTime) {
        that.lastTime = time;
        that._cur += that._word[0];
      } else if (time - that.lastTime >= eachTime) {
        that._cur += that._word[that._cur.length];
        that.lastTime = time;
      }
      that._showText();
      that._stop = requestAnimationFrame(_animation);
    }
  }
  pause() {
    cancelAnimationFrame(this._stop);
    this._stop = null;
  }
  start() {
    if (!this.infinite && !this._stop && this._cur === this._word) {
      this._cur = "";
    }
    this.startAnimation(this.eachTime);
  }
  setSpeed(val) {
    if (typeof val !== "number" || isNaN(val) || !isFinite(val)) return;
    val = val ^ 0;
    if (val < 1) return;
    this.eachTime = (500 / val) ^ 0;
    this.pause();
    this.startAnimation((500 / val) ^ 0);
  }
}
const words =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga corrupti sint, nemo modi dolorem, aliquid perspiciatis iste excepturi amet consequuntur quo odit, repellat hic harum eaque officiis. Aut, animi vel.";

const swa1 = new SpellWordAnimation(document.body, words, 1, false);
swa1.el.className = "swa1";

const speed = document.querySelector(".speed");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
speed.addEventListener("input", (e) => {
  swa1.setSpeed(parseInt(e.target.value));
});
start.addEventListener("click", () => {
  swa1.start();
});
pause.addEventListener("click", () => {
  swa1.pause();
});
