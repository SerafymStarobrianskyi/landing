const prevBtn = document.querySelector(".styles-slider__btn--prev");
const nextBtn = document.querySelector(".styles-slider__btn--next");

const track = document.querySelector(".styles-slider__track");
const slides = document.querySelectorAll(".styles-slider__slide");
const points = document.querySelectorAll(".styles-slider__indicator-point");

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
      ".styles-slider__indicator-point-active"
    );
    activeSlide.classList.remove("styles-slider__indicator-point-active");
    points[currentSlide].classList.add("styles-slider__indicator-point-active");
    updateSlide(currentSlide);
  }
});
prevBtn.addEventListener("click", () => {
  if (currentSlide !== 0) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    let activeSlide = document.querySelector(
      ".styles-slider__indicator-point-active"
    );
    activeSlide.classList.remove("styles-slider__indicator-point-active");
    points[currentSlide].classList.add("styles-slider__indicator-point-active");
    updateSlide(currentSlide);
  }
});

points.forEach((point, index) => {
  point.addEventListener("click", () => {
    let activeSlide = document.querySelector(
      ".styles-slider__indicator-point-active"
    );
    activeSlide.classList.remove("styles-slider__indicator-point-active");
    points[index].classList.add("styles-slider__indicator-point-active");
    updateSlide(index);
  });
});

window.addEventListener("resize", () => {
  updateSlide(currentSlide);
});

// htmx.onLoad((frag) => {
//     const prevBtn = frag.querySelector('.styles-slider__btn--prev');
//     const nextBtn = frag.querySelector('.styles-slider__btn--next');

//     const track = frag.querySelector('.styles-slider__track');
//     const slides = frag.querySelectorAll('.styles-slider__slide');
//     const points = frag.querySelectorAll('.styles-slider__indicator-point');

//     let currentSlide = 0;
//     if (!track || slides.length === 0 || !prevBtn || !nextBtn || points.length === 0) return;
//     const slideWidth = slides[0].getBoundingClientRect().width;

//     function updateSlide(position) {
//         track.style.transition = 'transform 0.5s ease';
//         track.style.transform = `translateX(-${position * slideWidth }px)`;
//     }

//     nextBtn.addEventListener("click", () => {
//         if(currentSlide !== slides.length-1){
//             currentSlide = (currentSlide + 1) % slides.length;
//             let activeSlide = frag.querySelector('.styles-slider__indicator-point-active');
//             activeSlide.classList.remove('styles-slider__indicator-point-active');
//             points[currentSlide].classList.add('styles-slider__indicator-point-active');
//             updateSlide(currentSlide);
//         }
//     });
//     prevBtn.addEventListener("click", () => {
//         if(currentSlide !== 0){
//             currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//             let activeSlide = frag.querySelector('.styles-slider__indicator-point-active');
//             activeSlide.classList.remove('styles-slider__indicator-point-active');
//             points[currentSlide].classList.add('styles-slider__indicator-point-active');
//             updateSlide(currentSlide);
//         }
//     });

//     points.forEach((point, index) => {
//         point.addEventListener('click', () => {
//             let activeSlide = frag.querySelector('.styles-slider__indicator-point-active');
//             activeSlide.classList.remove('styles-slider__indicator-point-active');
//             points[index].classList.add('styles-slider__indicator-point-active');
//             updateSlide(index);
//         });
//     });
// });
