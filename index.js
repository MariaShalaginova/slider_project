

    // Стрелки (переключают слайды по кольцу. То есть после слайда №3 снова пойдет слайд №1);
    // Кружочки между стрелками (включают нужный слайд);
    // Ссылки сверху слайдера (включают нужный слайд).


let images = [{
    img: 'img/image 1.jpg',
    title: "Rostov-on-Don Admiral"
}, {
    img: 'img/image 2.jpg',
    title: "Sochi Thieves"
}, {
    img: 'img/image 3.jpg', 
    title: "Rostov-on-Don Patriotic"
}];

function initSlider(options) {
    if (!images || !images.length) return;
    
    options = options || {
      titles: false,
      dots: true,
      autoplay: false
    };
    
    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__arrows");
    // let sliderArrows=document.getAttribute("slider__arrows");
    let sliderDots = document.querySelector(".slider__dots");
    
    console.log(sliderArrows);
    console.log(sliderDots);

    initImages();
    initArrows();
    
    if (options.dots) {
      initDots();
    }
    
    if (options.titles) {
      initTitles();
    }
    
    if (options.autoplay) {
      initAutoplay();
    }
    
    // Вставка изображений
    function initImages() {
      images.forEach((image, index) => {
        let imageDiv = `<img class="image n${index} ${index === 0? "active" : ""}" src="${images[index].img}" data-index="${index}"></div>`;
        sliderImages.innerHTML += imageDiv;
      });
    }
    
    // Вешаем обработчик на стрелки
    function initArrows() {
      document.querySelectorAll(".slider__arrows").forEach(arrow => {
        arrow.addEventListener("click", function() {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let nextNumber;
          if (arrow.classList.contains("left")) {
            nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
          } else {
            nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
          }
          moveSlider(nextNumber);
        });
      });
    }
    
    // Вставка точек
    function initDots() {
      images.forEach((image, index) => {
        let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
      });
      document.querySelectorAll(".slider__dots-item").forEach(dot => {
        dot.addEventListener("click", function() {
          moveSlider(this.dataset.index);
        })
      })
    }
    console.log(document.querySelectorAll(".circle"));
    
    // Переключение изображений и точек
    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");
      if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
      if (options.titles) changeTitle(num);
    }
    
    function initTitles() {
      let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
      sliderImages.innerHTML += cropTitle(titleDiv, 50);
    }
    
    function changeTitle(num) {
      if (!images[num].title) return;
      let sliderTitle = sliderImages.querySelector(".slider__images-title");
      sliderTitle.innerText = cropTitle(images[num].title, 50);
    }
    
    function cropTitle(title, size) {
      if (title.length <= size) {
        return title;
      } else {
        return title.substr(0, size) + "...";
      }
    }
    
    function initAutoplay() {
      setInterval(() => {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }, options.autoplayInterval);
    }
  }
  
  let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 5000
  };
  
  document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
  });