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
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
      // if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
      //   menu.style.transform = `translate(0)`;
      // } else {
      //   menu.style.transform = `translate(-100%)`;
      // }
    };
    // function scrollAnimate ({timing, draw, duration}) {
    //   let start = performance.now();
    //   requestAnimationFrame(function scrollAnimate(time) {
    //     let timeFraction = (time - start) / duration;
    //     if (timeFraction > 1) timeFraction = 1;
    //     let progress = timing(timeFraction);

    //     draw(progress); // отрисовать её

    //     if (timeFraction < 1) {
    //       requestAnimationFrame(scrollAnimate);
    //     }
    //   });
    // };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => {

      elem.addEventListener('click', () => {
        setTimeout(handlerMenu, 1000);
        // scrollAnimate({

        //   duration: 1000,
        //   timing: function(timeFraction) {
        //     return timeFraction;
        //   },
        //   draw: function(progress) {
        //     let htmlDoc = document.querySelector('html'),
        //     topPosition;
        //     if(menuItems[0]){
        //       topPosition = 830;
        //     } else if (menuItems[1]){
        //       topPosition = 2037;
        //     }
        //     htmlDoc.scrollTop = progress * topPosition;
        //     console.log('topPosition: ', topPosition);
        //   }
        // })
        // let prev = performance.now();
        // let times = 0;
        // requestAnimationFrame(function scroll(time) {
        //   let htmlDoc = document.querySelector('html');
        //   let tt = Math.floor(time - prev);
        //   prev = time;
        // })

        // let scrollInterval,
        //   htmlDoc = document.querySelector('html'),
        //   count = 0;
        
        // const scrollAnimate = () => {
        //   scrollInterval = requestAnimationFrame(scrollAnimate);
          
        //   if (menuItems[0] && count < 830) {
        //     count++;
        //     htmlDoc.scrollTop = count;
        //     console.log('htmlDoc.scrollTop: ', htmlDoc.scrollTop);
        //   }
        // }
        // scrollInterval = requestAnimationFrame(scrollAnimate);
        // });
      });
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
        
          let count = 0;
          let popupInterval = setInterval(() => {
              count++;
              popup.style.display = 'block';
              popup.style.opacity = count*20 + '%';
              console.log('count1: ', popup.style.opacity);
            }, 60)
            setTimeout(() => {
              clearInterval(popupInterval)
            }, 300)
            
        // const popupAnimate = () => {
        //   popupInterval = requestAnimationFrame(popupAnimate);
          

        //   if (screen.width < 768) {
        //     cancelAnimationFrame(popupInterval);
        //     popup.style.display = 'block';
        //   } else if (count < 100) {
        //     popup.style.display = 'block';
        //     popup.style.opacity = count*8 + '%';
        //     console.log('count: ', count);
        //   }
        // }
        // popupInterval = requestAnimationFrame(popupAnimate);
      });
    });

    popUpClose.addEventListener('click', () => {
      let count = 10;
      let animationFrame2 = setInterval(()=>{
        let a = count-- /10;
        popup.style.opacity = a;
        console.log('a: ', a);
        if(a == 0){
          clearInterval(animationFrame2);
          popup.style.display = 'none';
        }
      },50)
      // let count = 10;
      // let popupInterval = setInterval(() => {
      //     count-- ;
          
      //     popup.style.opacity = +count + '%';
      //     if ( count === 0 ) popup.style.display = 'none';
      //     console.log('count2: ', popup.style.opacity);
      // }, 60)
      // setTimeout(() => {
      //   clearInterval(popupInterval)
      // }, 300)
      // let popupInterval,
      //       count = 100;
      //   const popupAnimate = () => {
      //     popupInterval = requestAnimationFrame(popupAnimate);
      //     count--;
      //     if (screen.width < 768) {
      //       cancelAnimationFrame(popupInterval);
      //       popup.style.display = 'none'
      //     } else if (count > 0) {
      //       popup.style.opacity = count*20 + '%';
      //       if (count === 1) popup.style.display = 'none';
      //       console.log('count: ', count);
      //     }
      //   }
      //   popupInterval = requestAnimationFrame(popupAnimate);
    });

    popup.addEventListener('click', () => {
      popup.style.display = 'none';
    })
  };
  togglePopUp();
});