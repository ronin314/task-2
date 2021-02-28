const refs = {
  elementsCount: document.querySelector(".elements-count"),
  actualDate: document.querySelector(".actual-date"),
  pictures: document.querySelector(".pictures"),
  picture: document.querySelector("#picture"),
  openModal: document.querySelector(".js-lightbox"),
  closeModalBtn: document.querySelector("[data-action=close-lightbox]"),
  backdrop: document.querySelector(".lightbox-overlay"),
  originalImg: document.querySelector(".lightbox-image"),
};

// pictures count
const childs = refs.pictures.childElementCount;
refs.elementsCount.textContent = `В галерее ${childs} элементов`;

// Date
const date = new Date();
const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
const localeUk = date.toLocaleString("Ru-ru", dateOptions);
refs.actualDate.textContent = localeUk;
console.log(localeUk);

// Lightbox
const openModal = (e) => {
  if (!e.target.classList.contains("animation")) {
    return;
  }
  window.addEventListener("keydown", pressOnEsc);
  refs.openModal.classList.add("is-open");
  e.preventDefault();
  openOriginalImg(e);
};
const closeModalBtn = () => {
  window.removeEventListener("keydown", pressOnEsc);
  refs.openModal.classList.remove("is-open");
  closeOriginalImg();
};
const clickOnBackdrop = (e) => {
  if (e.target === e.currentTarget) {
    closeModalBtn();
  }
};
const pressOnEsc = (e) => {
  if (e.code === "Escape") {
    closeModalBtn();
  }
};
const openOriginalImg = (e) => {
  refs.originalImg.src = e.target.attributes.src.nodeValue;
  refs.originalImg.alt = e.target.alt;
  refs.originalImg.classList.add("is-open");
};
const closeOriginalImg = () => {
  if (!refs.openModal.classList.contains("is-open")) {
    refs.originalImg.src = "";
    refs.originalImg.alt = "";
  }
};

refs.pictures.addEventListener("click", openModal);
refs.closeModalBtn.addEventListener("click", closeModalBtn);
refs.backdrop.addEventListener("click", clickOnBackdrop);
