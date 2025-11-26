const prevBtn = document.querySelector(".testimonials-slider__btn--prev");
const nextBtn = document.querySelector(".testimonials-slider__btn--next");

const track = document.querySelector(".testimonials-slider__track");
const slides = document.querySelectorAll(".testimonials-slider__slide");
const points = document.querySelectorAll(
  ".testimonials-slider__indicator-point"
);

let currentSlide = 0;

function updateSlide(position) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${position * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  if (currentSlide !== slides.length - 1) {
    currentSlide = (currentSlide + 1) % slides.length;
    let activeSlide = document.querySelector(
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
    let activeSlide = document.querySelector(
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
    let activeSlide = document.querySelector(
      ".testimonials-slider__indicator-point-active"
    );
    activeSlide.classList.remove("testimonials-slider__indicator-point-active");
    points[index].classList.add("testimonials-slider__indicator-point-active");
    updateSlide(index);
  });
});

window.addEventListener("resize", () => {
  updateSlide(currentSlide);
});
