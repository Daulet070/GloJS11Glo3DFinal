window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  // Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');
        
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          if (seconds < 10) {seconds = '0' + seconds;}
          if (minutes < 10) {minutes = '0' + minutes;}
          if (hours < 10)   {hours = '0' + hours;}
          return {timeRemaining, hours, minutes, seconds};
    }
    const updateClock = () => {
      const timer = getTimeRemaining();

      if(timer.timeRemaining > 0) {

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

      } else if (timer.timeRemaining < 0) {

        clearInterval(intervalIndex);

        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    const intervalIndex = setInterval(updateClock, 1000);
  }
  countTimer('29 February 2020');
  // Menu
  const toggleMenu = () => {
    const menu = document.querySelector('menu');
    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if(target && target.closest('.menu')){
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

    popupBtn.forEach((elem) => {
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
            popup.style.opacity = count*10 + '%';
          }
        }
        popupInterval = requestAnimationFrame(popupAnimate);
      });
    });
    
    popup.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.popup-content');
      if (target){
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
          popup.style.display = 'none'
        } else if (count > 0) {
          popup.style.opacity = count*10 + '%';
          if (count === 1) popup.style.display = 'none';
        }
      }
      popupInterval = requestAnimationFrame(popupAnimate);
    })
  };
  togglePopUp();
  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {

      for(let i = 0; i < tabContent.length; i++){
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if(item === target) {
            toggleTabContent(i);
          };
        });
      }
    });
  };
  tabs();
   
  // Слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          dotList = document.querySelector('.portfolio-dots'),
          slider = document.querySelector('.portfolio-content');
    
    let dotSelector = [];
    console.log('dotSelector: ', dotSelector);
    for(let i = 0; i < slide.length; i++) {
      dotSelector[i] = document.createElement('li');
    };
    dotSelector.forEach((elem) => {
      elem.setAttribute("class", "dot");
      dotList.appendChild(elem);
    });
    let dot = document.querySelectorAll('.dot');
    console.log('dot1: ', dot);
    console.log('dotList: ', dotList);

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
      // addSlide(document, currentSlide, 'li');
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
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
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
    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
          event.target.matches('.dot')) {
            stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
          event.target.matches('.dot')) {
            stopSlide();
      }
    });
    startSlide(1500);
  }
  slider();
});