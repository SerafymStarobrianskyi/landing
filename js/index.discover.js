const track = document.querySelector(".discover-slider__track");
const slides = document.querySelectorAll(".discover-slider__slide");
const points = document.querySelectorAll(".discover-slider__indicator-point");

let currentSlide = 0;

function getSlideWidth() {
  return slides[0].getBoundingClientRect().width + 30;
}

function updateSlide(position) {
  const slideWidth = getSlideWidth();
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(-${position * slideWidth}px)`;

  currentSlide = position;
  currentTranslate = -position * slideWidth;
  prevTranslate = currentTranslate;
}

points.forEach((point, index) => {
  point.addEventListener("click", () => {
    const activeSlide = document.querySelector(
      ".discover-slider__indicator-point-active"
    );
    activeSlide.classList.remove("discover-slider__indicator-point-active");
    points[index].classList.add("discover-slider__indicator-point-active");

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

//dragging functionality
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function start(e) {
  isDragging = true;
  track.style.transition = "none";

  startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

  const slideWidth = getSlideWidth();
  prevTranslate = -currentSlide * slideWidth;
  currentTranslate = prevTranslate;

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

function end() {
  if (!isDragging) return;
  isDragging = false;

  const slideWidth = getSlideWidth();
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 / 4 && currentSlide < slides.length - 3) {
    currentSlide++;
  } else if (movedBy > 100 && currentSlide > 0) {
    currentSlide--;
  }

  updateSlide(currentSlide);

  track.style.cursor = "grab";

  const activeSlide = document.querySelector(
    ".discover-slider__indicator-point-active"
  );
  activeSlide.classList.remove("discover-slider__indicator-point-active");

  points[currentSlide].classList.add("discover-slider__indicator-point-active");
}

track.addEventListener("mousedown", start);
track.addEventListener("mousemove", drag);
track.addEventListener("mouseup", end);
track.addEventListener("mouseleave", end);

track.addEventListener("touchstart", start, { passive: false });
track.addEventListener("touchmove", drag, { passive: false });
track.addEventListener("touchend", end);
track.addEventListener("touchcancel", end);