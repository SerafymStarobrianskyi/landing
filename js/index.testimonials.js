const prevBtn = document.querySelector(".testimonials-slider__btn--prev");
const nextBtn = document.querySelector(".testimonials-slider__btn--next");

const track = document.querySelector(".testimonials-slider__track");
const slides = document.querySelectorAll(".testimonials-slider__slide");
const points = document.querySelectorAll(
  ".testimonials-slider__indicator-point"
);

let currentSlide = 0;

function getSlideWidth() {
  return slides[0].getBoundingClientRect().width;
}

function updateSlide(position) {
  const slideWidth = getSlideWidth();
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${position * slideWidth}px)`;

  currentSlide = position;
  currentTranslate = -position * slideWidth;
  prevTranslate = currentTranslate;
}

nextBtn.addEventListener("click", () => {
  if (currentSlide !== slides.length - 1) {
    currentSlide = (currentSlide + 1) % slides.length;
    const activeSlide = document.querySelector(
      ".testimonials-slider__indicator-point-active"
    );
    activeSlide.classList.remove("testimonials-slider__indicator-point-active");
    points[currentSlide].classList.add(
      "testimonials-slider__indicator-point-active"
    );
    updateSlide(currentSlide);
  }
});
prevBtn.addEventListener("click", () => {
  if (currentSlide !== 0) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    const activeSlide = document.querySelector(
      ".testimonials-slider__indicator-point-active"
    );
    activeSlide.classList.remove("testimonials-slider__indicator-point-active");
    points[currentSlide].classList.add(
      "testimonials-slider__indicator-point-active"
    );
    updateSlide(currentSlide);
  }
});

points.forEach((point, index) => {
  point.addEventListener("click", () => {
    const activeSlide = document.querySelector(
      ".testimonials-slider__indicator-point-active"
    );
    activeSlide.classList.remove("testimonials-slider__indicator-point-active");
    points[index].classList.add("testimonials-slider__indicator-point-active");
    updateSlide(index);
  });
});

window.addEventListener("resize", () => {
  track.style.transition = "none";
  const slideWidth = getSlideWidth();
  currentTranslate = -currentSlide * slideWidth;
  prevTranslate = currentTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
});

// ===== DRAG / SWIPE =====
let isDragging = false;
let isScrolling = false;
let startY = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function start(e) {
  isDragging = true;
  isScrolling = false;
  track.style.transition = "none";

  const point = e.type.includes("mouse") ? e : e.touches[0];
  startX = point.clientX || point.pageX;
  startY = point.clientY || point.pageY;

  const slideWidth = getSlideWidth();
  prevTranslate = -currentSlide * slideWidth;
  currentTranslate = prevTranslate;

  track.style.cursor = "grabbing";
}


function drag(e) {
  if (!isDragging) return;

  const point = e.type.includes("mouse") ? e : e.touches[0];
  const currentX = point.clientX || point.pageX;
  const currentY = point.clientY || point.pageY;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  if (!isScrolling && Math.abs(deltaY) > Math.abs(deltaX)) {
    isScrolling = true;
    isDragging = false;
    track.style.cursor = "grab";
    return;
  }

  if (isScrolling) return;

  currentTranslate = prevTranslate + deltaX;
  track.style.transform = `translateX(${currentTranslate}px)`;

  if (e.cancelable) e.preventDefault();
}

function end() {
  if (!isDragging) return;
  isDragging = false;

  const slideWidth = getSlideWidth();
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentSlide < slides.length - 1) {
    currentSlide += 1;
  }
  if (movedBy > 100 && currentSlide > 0) {
    currentSlide -= 1;
  }

  track.style.transition = "transform 0.5s ease";
  currentTranslate = -currentSlide * slideWidth;
  prevTranslate = currentTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
  track.style.cursor = "grab";

  const activeSlide = document.querySelector(
    ".testimonials-slider__indicator-point-active"
  );
  activeSlide.classList.remove("testimonials-slider__indicator-point-active");
  points[currentSlide].classList.add("testimonials-slider__indicator-point-active");
}

track.addEventListener("mousedown", start);
track.addEventListener("mousemove", drag);
track.addEventListener("mouseup", end);
track.addEventListener("mouseleave", end);

track.addEventListener("touchstart", start, { passive: false });
track.addEventListener("touchmove", drag, { passive: false });
track.addEventListener("touchend", end, { passive: false });
track.addEventListener("touchcancel", end, { passive: false });