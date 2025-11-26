const burger = document.querySelector(".header-bottom__burger");
const nav = document.querySelector(".header__mobile");
const navList = document.querySelectorAll(".header__mobile-link");

function closeMenu() {
  burger.classList.remove("is-active");
  nav.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function toggleMenu() {
  burger.classList.toggle("is-active");
  nav.classList.toggle("is-open");
  document.body.classList.toggle("no-scroll");
}

burger.addEventListener("click", toggleMenu);

navList.forEach((link) => {
  link.addEventListener("click", closeMenu);
});
