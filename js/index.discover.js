const track = document.querySelector(".discover-slider__track");
const slides = document.querySelectorAll(".discover-slider__slide");
const points = document.querySelectorAll(".discover-slider__indicator-point");

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function getSlideWidth() {
  return slides[0].getBoundingClientRect().width + 30;
}

function updateSlide(position) {
  const slideWidth = getSlideWidth();
  
  currentSlide = position;
  currentTranslate = -position * slideWidth;
  prevTranslate = currentTranslate;
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(-${position * slideWidth}px)`;
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

function start(e) {
  isDragging = true;
  track.style.transition = "none";

  startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;

  prevTranslate = currentTranslate;

  track.style.cursor = "grabbing";
  
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();

  const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
  const deltaX = currentX - startX;

  currentTranslate = prevTranslate + deltaX;
  track.classList.add("dragging");

  track.style.transform = `translateX(${currentTranslate}px)`;
  
}

function end(e) {
  if (!isDragging) return;
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;
  track.classList.remove("dragging");

  if (movedBy < -50 && currentSlide < slides.length - 3) {
    currentSlide++;
  } else if (movedBy > 50 && currentSlide > 0) {
    currentSlide--;
  }
  updateSlide(currentSlide);

  track.style.cursor = "grab";
  

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

track.addEventListener("mousedown", start);
track.addEventListener("mousemove", drag);
track.addEventListener("mouseup", end);
track.addEventListener("mouseleave", end);

track.addEventListener("touchstart", start, { passive: false });
track.addEventListener("touchmove", drag, { passive: false });
track.addEventListener("touchend", end, { passive: false });

track.addEventListener("touchcancel", () => {
  isDragging = false;
  track.style.cursor = "grab";
});
