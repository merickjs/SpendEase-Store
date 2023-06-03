const slider = document.querySelector(".slider");
const productWrapper = document.querySelector(".product-wrapper");
const productWrapper2 = document.querySelector(".product-wrapper2");
const productWrapper3 = document.querySelector(".product-wrapper3");

const config = {
  type: "loop",
  autoplay: true,
  interval: 2500,
  pauseOnHover: false,
  pauseOnFocus: false,
  perPage: 1,
  focus: "center",
  breakpoints: {
    768: {
      arrows: false,
    },
  },
};
slider && new Splide(".splide", config).mount();

const config2 = {
  type: "slide",
  autoplay: true,
  interval: 4000,
  pauseOnHover: false,
  pauseOnFocus: false,
  speed: 3000,
  perPage: 4,
  gap: "5px",
  perMove: 1,
  swipe: true,

  breakpoints: {
    768: {
      arrows: false,
      focus: "center",
      perPage: 2,
    },
    600: {
      perPage: 1,
    },
  },
};

productWrapper && new Splide(".product-wrapper", config2).mount();
productWrapper2 && new Splide(".product-wrapper2", config2).mount();
productWrapper3 && new Splide(".product-wrapper3", config2).mount();
productWrapper3 && new Splide(".product-wrapper4", config2).mount();

window.onload = () => {
  const splidePlayBtn = document.querySelectorAll(".splide-play");
  for (let i = 0; i < splidePlayBtn.length; i++) {
    splidePlayBtn[i].click();
  }
};
