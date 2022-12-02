// Объект изображений 
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
        dots: true,
        autoplay: false,
        links: true
      };
      
      // Находим элементы
      let sliderImages = document.querySelector(".slider-images");
      let sliderDots = document.querySelector(".slider__dots");
      let sliderLink = document.querySelector('.header-navigation');
  
      // Вставка изображений
      initImages();

      // Делаем стрелки переключения слайдера рабочими
      initArrows();

      //вставляем точки и делаем переключение слайдера по точкам
      initDots();

      // вставляем названия проектов и делаем переключение слайдера по ним
      changeLink();
     
      // Если требуется автопроигрывание
      if (options.autoplay) {
        initAutoplay();
      }
      
      //функция вставки изображений
      function initImages() {
        images.forEach((image, index) => {
          let imageDiv = `<img class="image n${index} ${index === 0? "active" : ""}" src="${image.img}" data-index="${index}"></div>`;
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
      
      // Переключение изображений и точек
      function moveSlider(num) {
        console.log(num);
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        // подсвечивание названия проектов с включением соответсвующего слайда
        sliderLink.querySelector(".active").classList.remove("active");
        sliderLink.querySelector(".n" + num).classList.add("active");
        if (options.dots) {
          sliderDots.querySelector(".active").classList.remove("active");
          sliderDots.querySelector(".n" + num).classList.add("active");
        }
      }
    
      // вставляем названия проектов и делаем переключение слайдера по ним
      function changeLink() {
          images.forEach((image, index) => {
            let links = `<li class="completed-projects-item n${index} ${index === 0? "active" : ""}" data-index="${index}">${image.title}</li>`;
            sliderLink.innerHTML += links;
          });
          document.querySelectorAll(".completed-projects-item").forEach(link => {
            link.addEventListener("click", function() {
              moveSlider(this.dataset.index);
            })
          })
      }
      
      // автопроигрывание
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
      autoplay: false,
      links: true,
      autoplayInterval: 5000
    };
    
    document.addEventListener("DOMContentLoaded", function() {
      initSlider(sliderOptions);
    });