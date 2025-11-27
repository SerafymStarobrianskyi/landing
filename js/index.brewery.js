const prevBtn = document.querySelector(".brewery-slider__btn--prev");
const nextBtn = document.querySelector(".brewery-slider__btn--next");

const track = document.querySelector(".brewery-slider__track");
const slides = document.querySelectorAll(".brewery-slider__slide");
const points = document.querySelectorAll(".brewery-slider__indicator-point");
const popups = document.querySelectorAll(".brewery__popup");
const overlays = document.querySelectorAll(".brewery__popup-overlay");
const closeBtns = document.querySelectorAll(".brewery__popup-close");

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
      ".brewery-slider__indicator-point-active"
    );
    activeSlide.classList.remove("brewery-slider__indicator-point-active");
    points[currentSlide].classList.add(
      "brewery-slider__indicator-point-active"
    );
    updateSlide(currentSlide);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSlide !== 0) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    const activeSlide = document.querySelector(
      ".brewery-slider__indicator-point-active"
    );
    activeSlide.classList.remove("brewery-slider__indicator-point-active");
    points[currentSlide].classList.add(
      "brewery-slider__indicator-point-active"
    );
    updateSlide(currentSlide);
  }
});

points.forEach((point, index) => {
  point.addEventListener("click", () => {
    const activeSlide = document.querySelector(
      ".brewery-slider__indicator-point-active"
    );
    activeSlide.classList.remove("brewery-slider__indicator-point-active");
    points[index].classList.add("brewery-slider__indicator-point-active");
    updateSlide(index);
  });
});

// popup functionality

function tooglePopUp(index) {
  popups[index].classList.toggle("brewery__popup-active");
  document.body.classList.toggle("no-scroll");
}
let swiped = false;

slides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    if (swiped) {
      swiped = false;
      return;
    }
    tooglePopUp(index);
  });
});

overlays.forEach((overlay, index) => {
  overlay.addEventListener("click", () => {
    tooglePopUp(index);
  });
});

closeBtns.forEach((closeBtn, index) => {
  closeBtn.addEventListener("click", () => {
    tooglePopUp(index);
  });
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeIndex = [...popups].findIndex((popup) =>
      popup.classList.contains("brewery__popup-active")
    );
    if (activeIndex !== -1) {
      tooglePopUp(activeIndex);
    }
  }
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

  if (Math.abs(deltaX) > 5) {
    swiped = true;
  }

  currentTranslate = prevTranslate + deltaX;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function end() {
  if (!isDragging) return;
  isDragging = false;

  const slideWidth = getSlideWidth();
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -slideWidth / 4 && currentSlide < slides.length - 1) {
    currentSlide += 1;
  }
  if (movedBy > slideWidth / 4 && currentSlide > 0) {
    currentSlide -= 1;
  }

  track.style.transition = "transform 0.5s ease";
  currentTranslate = -currentSlide * slideWidth;
  prevTranslate = currentTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
  track.style.cursor = "grab";

  const activeSlide = document.querySelector(
    ".brewery-slider__indicator-point-active"
  );
  activeSlide.classList.remove("brewery-slider__indicator-point-active");
  points[currentSlide].classList.add(
    "brewery-slider__indicator-point-active"
  );
}

track.addEventListener("mousedown", start);
track.addEventListener("mousemove", drag);
track.addEventListener("mouseup", end);
track.addEventListener("mouseleave", end);

track.addEventListener("touchstart", start);
track.addEventListener("touchmove", drag);
track.addEventListener("touchend", end);