let highestZ = 1;
class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const updatePosition = (x, y) => {
      if (!this.rotating) {
        this.mouseX = x;
        this.mouseY = y;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
      const dirX = x - this.mouseTouchX;
      const dirY = y - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    const onMove = (e) => {
      e.preventDefault();
      if (e.touches) {
        // Touch events
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      } else {
        // Mouse events
        updatePosition(e.clientX, e.clientY);
      }
    };

    const onStart = (e) => {
      e.preventDefault();
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      this.mouseTouchX = x;
      this.mouseTouchY = y;
      this.prevMouseX = x;
      this.prevMouseY = y;
      if (!e.touches && e.button === 2) {
        this.rotating = true;
      }
    };

    const onEnd = (e) => {
      e.preventDefault();
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Mouse events
    document.addEventListener("mousemove", onMove.bind(this));
    paper.addEventListener("mousedown", onStart.bind(this));
    window.addEventListener("mouseup", onEnd.bind(this));

    // Touch events
    document.addEventListener("touchmove", onMove.bind(this), { passive: false });
    paper.addEventListener("touchstart", onStart.bind(this), { passive: false });
    window.addEventListener("touchend", onEnd.bind(this), { passive: false });
  }
}

function verifyCode() {
  let codeName;
  do {
    codeName = prompt("Enter the code to proceed:");
  } while (codeName !== "sudishka");
}

verifyCode();

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
