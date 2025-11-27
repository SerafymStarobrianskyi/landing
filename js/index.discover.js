const track = document.querySelector(".discover-slider__track");
const slides = document.querySelectorAll(".discover-slider__slide");
const points = document.querySelectorAll(".discover-slider__indicator-point");

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function getSlideWidth() {
  const slide = slides[0];
  const computedStyle = window.getComputedStyle(slide);
  const marginRight = parseFloat(computedStyle.marginRight) || 0;
  return slide.getBoundingClientRect().width + marginRight;
}

function updateSlide(position) {
  const slideWidth = getSlideWidth();
  currentSlide = position;
  currentTranslate = -position * slideWidth;
  prevTranslate = currentTranslate;

  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(${currentTranslate}px)`;

  // Оновлення індикаторів
  const activeSlide = document.querySelector(
    ".discover-slider__indicator-point-active"
  );
  if (activeSlide) {
    activeSlide.classList.remove("discover-slider__indicator-point-active");
  }
  if (points[currentSlide]) {
    points[currentSlide].classList.add("discover-slider__indicator-point-active");
  }
}

function start(e) {
  isDragging = true;
  track.style.transition = "none";

  startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

  prevTranslate = currentTranslate;

  track.style.cursor = "grabbing";
}

function drag(e) {
  if (!isDragging) return;

  const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  const deltaX = currentX - startX;

  currentTranslate = prevTranslate + deltaX;
  track.style.transform = `translateX(${currentTranslate}px)`;

  if (e.cancelable) e.preventDefault();
}

function end(e) {
  if (!isDragging) return;
  isDragging = false;

  const slideWidth = getSlideWidth();
  const movedBy = currentTranslate - prevTranslate;

  // Логіка переходу
  if (movedBy < -slideWidth / 4 && currentSlide < slides.length - 1) {
    currentSlide++;
  } else if (movedBy > slideWidth / 4 && currentSlide > 0) {
    currentSlide--;
  }

  updateSlide(currentSlide);

  track.style.cursor = "grab";
}

// Mouse events
track.addEventListener("mousedown", start);
track.addEventListener("mousemove", drag);
track.addEventListener("mouseup", end);
track.addEventListener("mouseleave", end);

// Touch events
track.addEventListener("touchstart", start, { passive: false });
track.addEventListener("touchmove", drag, { passive: false });
track.addEventListener("touchend", end, { passive: false });
track.addEventListener("touchcancel", () => {
  isDragging = false;
  track.style.cursor = "grab";
}); 