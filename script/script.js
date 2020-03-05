'use strict';
window.addEventListener('DOMContentLoaded', () => {
  // Timer
  const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');
    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      if (seconds < 10) { seconds = '0' + seconds; }
      if (minutes < 10) { minutes = '0' + minutes; }
      if (hours < 10)   { hours = '0' + hours; }
      return { timeRemaining, hours, minutes, seconds };
    };
    const updateClock = () => {
      const timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

      } else if (timer.timeRemaining < 0) {

        clearInterval(intervalIndex);

        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };
    const intervalIndex = setInterval(updateClock, 1000);
  };
  countTimer('5 Marсh 2020');
  // Menu
  const toggleMenu = () => {
    const menu = document.querySelector('menu');
    document.body.addEventListener('click', event => {
      const target = event.target;
      if (target && target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else if (target && (target.tagName === 'A' || !target.classList.contains('active-menu'))) {
        menu.classList.remove('active-menu');
      }
    });
  };
  toggleMenu();
  // popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close');

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        let popupInterval,
          count = 0;
        const popupAnimate = () => {
          popupInterval = requestAnimationFrame(popupAnimate);
          count++;
          if (screen.width < 768) {
            cancelAnimationFrame(popupInterval);
            popup.style.display = 'block';
          } else if (count < 11) {
            popup.style.display = 'block';
            popup.style.opacity = count * 10 + '%';
          }
        };
        popupInterval = requestAnimationFrame(popupAnimate);
      });
    });
    popup.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.popup-content');
      if (target) {
        popup.style.display = 'block';
      } else {
        popup.style.display = 'none';
      }
    });

    popUpClose.addEventListener('click', () => {
      let popupInterval,
        count = 10;
      const popupAnimate = () => {
        popupInterval = requestAnimationFrame(popupAnimate);
        count--;
        if (screen.width < 768) {
          cancelAnimationFrame(popupInterval);
          popup.style.display = 'none';
        } else if (count > 0) {
          popup.style.opacity = count * 10 + '%';
          if (count === 1) popup.style.display = 'none';
        }
      };
      popupInterval = requestAnimationFrame(popupAnimate);
    });
  };
  togglePopUp();
  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {

      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
  // Слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      // btn = document.querySelectorAll('.portfolio-btn'),
      dotList = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');
    const dotSelector = [];
    for (let i = 0; i < slide.length; i++) {
      dotSelector[i] = document.createElement('li');
    }
    dotSelector.forEach(elem => {
      elem.setAttribute("class", "dot");
      dotList.appendChild(elem);
    });
    const dot = document.querySelectorAll('.dot');
    let currentSlide = 0,
      interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) currentSlide = 0;

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) currentSlide = index;
        });
      }
      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });
    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') ||
          event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') ||
          event.target.matches('.dot')) {
        startSlide(1500);
      }
    });
    startSlide(1500);
  };
  slider();

  // Hover change photo command
  const commandPhoto = () => {
    const commandImg = document.querySelectorAll('.command__photo');

    commandImg.forEach(elem => {
      const defImg = elem.src;

      elem.addEventListener('mouseenter', event => {
        event.target.src = event.target.dataset.img;
      });

      elem.addEventListener('mouseleave', event => {
        event.target.src = defImg;
      });

    });
  };
  commandPhoto();

  // Calc validation
  const getCalc = () => {
    const calcItem = document.querySelectorAll('[type="number"]');

    calcItem.forEach(elem => {
      elem.addEventListener('input', () => {

        elem.value = elem.value.replace(/\D/, '');

      });
    });
  };
  getCalc();

  // Calc
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSumm = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;

      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      if (+calcDay.value === 0 || +calcCount.value === 0 || +calcSquare === 0) {
        total = 0;
      }
      totalValue.textContent = Math.round(total);
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSumm();
      }
    });
  };
  calc(100);
  // Send-AJAX-form
  const sendForm = () => {

    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
      statusMessage = document.createElement('span'),
      forms = document.querySelectorAll('form');

    statusMessage.style.cssText = `font-size: 2rem;
                                   color: #fff;`;

    forms.forEach(elem => {

      elem.addEventListener('input', event => {
        const pattNameMess = /[?!,.%:*(/><)_^#$@&~'}[{\-+="№;a-zA-Z0-9]$/;
        const patternPhone = /[а-яА-ЯЁёa-zA-Z?!,%@&~'}[{:*\-)<(^$=";\s]/;
        const patternEmail = /[а-яА-ЯЁё?!,%&~'}[{:*(/><)^#$+="№;\s]/;
        let target = event.target;

        if (target.classList.contains('form-name')) {
          target.value = target.value.replace(pattNameMess, '');
        }
        if (target.classList.contains('form-email')) {
          target.value = target.value.replace(patternEmail, '').trim();
        }
        if (target.classList.contains('form-phone')) {
          target.value = target.value.replace(patternPhone, '');
        }
        if (target.classList.contains('mess')) {
          target.value = target.value.replace(pattNameMess, '');
        }
      });

      elem.addEventListener('submit', event => {
        event.preventDefault();
        elem.appendChild(statusMessage);

        statusMessage.textContent = loadMessage;

        const formData = new FormData(elem),
          body = {};
        console.log('body: ', body);

        for (const val of formData.entries()) {
          body[val[0]] = val[1];
        }

        const outputData = () => {
          statusMessage.textContent = successMessage;

          setTimeout(() => {
            statusMessage.remove();
            const formInputs = elem.querySelectorAll('input');

            formInputs.forEach(elem => {
              elem.value = '';
            });

          }, 2000);
        };

        postData(body)
          .then(outputData)
          .catch(error => {
            statusMessage.textContent = errorMessage;
            console.warn(error);
          });

      });
    });

    const postData = (body, outputData) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {

          if (request.readyState !== 4) {
            return;
          }

          if (request.status === 200) {
            resolve(outputData);
          } else {
            reject(request.status);
          }

        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
      });
    };
  };
  sendForm();
});
