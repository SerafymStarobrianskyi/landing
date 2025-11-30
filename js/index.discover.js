const track = document.querySelector(".discover-slider__track");
const slides = Array.from(document.querySelectorAll(".discover-slider__slide"));
const points = Array.from(document.querySelectorAll(".discover-slider__indicator-point"));

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let startTranslate = 0;

const SLIDE_GAP = 30; // відступ між слайдами

function getSlideWidth() {
  return slides[0].getBoundingClientRect().width + SLIDE_GAP;
}

function setActivePoint(index) {
  points.forEach((p) =>
    p.classList.remove("discover-slider__indicator-point-active")
  );
  if (points[index]) {
    points[index].classList.add("discover-slider__indicator-point-active");
  }
}

function clampSlideIndex(index) {
  // якщо в тебе останні 2 слайди – це копії, можна обмежити, наприклад, slides.length - 3
  const maxIndex = slides.length - 3; 
  if (index < 0) return 0;
  if (index > maxIndex) return maxIndex;
  return index;
}

function goToSlide(index, withTransition = true) {
  currentSlide = clampSlideIndex(index);

  const slideWidth = getSlideWidth();
  currentTranslate = -currentSlide * slideWidth;
  startTranslate = currentTranslate;

  track.style.transition = withTransition ? "transform 0.4s ease" : "none";
  track.style.transform = `translateX(${currentTranslate}px)`;

  setActivePoint(currentSlide);
}

// ініціалізація
goToSlide(0, false);

// кліки по точках
points.forEach((point, index) => {
  point.addEventListener("click", () => {
    goToSlide(index);
  });
});

// адаптація при ресайзі
window.addEventListener("resize", () => {
  goToSlide(currentSlide, false);
});

// ================= DRAG / SWIPE =================

function getPosX(e) {
  if (e.type.startsWith("touch")) {
    return e.touches[0].clientX;
  }
  return e.clientX;
}

function start(e) {
  isDragging = true;
  if (e.type === "mousedown") {
    e.preventDefault();
  }

  track.style.transition = "none";
  startX = getPosX(e);
  startTranslate = currentTranslate;

  track.style.cursor = "grabbing";
}

function drag(e) {
  if (!isDragging) return;

  if (e.cancelable) e.preventDefault();

  const currentX = getPosX(e);
  const deltaX = currentX - startX;

  currentTranslate = startTranslate + deltaX;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function end() {
  if (!isDragging) return;
  isDragging = false;
  track.style.cursor = "grab";

  const movedBy = currentTranslate - startTranslate;
  const threshold = 50; // поріг свайпу

  if (movedBy < -threshold) {
    // свайп вліво — наступний слайд
    goToSlide(currentSlide + 1);
  } else if (movedBy > threshold) {
    // свайп вправо — попередній
    goToSlide(currentSlide - 1);
  } else {
    // замалий рух — повертаємось
    goToSlide(currentSlide);
  }
}

// mouse
track.addEventListener("mousedown", start);
window.addEventListener("mousemove", drag);
window.addEventListener("mouseup", end);

// touch
track.addEventListener("touchstart", start, { passive: false });
window.addEventListener("touchmove", drag, { passive: false });
window.addEventListener("touchend", end);
window.addEventListener("touchcancel", end);
