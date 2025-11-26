const questions = document.querySelectorAll(".questions__item-top");

questions.forEach((question, index) => {
  question.addEventListener("click", () => {
    console.log("click");
    let questionText = document.querySelectorAll(".questions__item-bottom");
    let questionPlus = document.querySelectorAll(
      ".questions__item-plus-vertical"
    );
    let activeText = document.querySelector(".questions__item-bottom-active");
    let activePlus = document.querySelector(
      ".questions__item-plus-vertical-active"
    );
    if (activeText) {
      document
        .querySelector(".questions__item-bottom-active")
        .classList.remove("questions__item-bottom-active");
      document
        .querySelector(".questions__item-plus-vertical-active")
        .classList.remove("questions__item-plus-vertical-active");
    }
    if (!(questionText[index] === activeText)) {
      questionText[index].classList.add("questions__item-bottom-active");
      questionPlus[index].classList.add("questions__item-plus-vertical-active");
    }
  });
});
