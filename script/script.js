window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  // Timer
  function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
        
    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          return {timeRemaining, hours, minutes, seconds};
    }
    
    function updateClock(){
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if(timer.timeRemaining > 0) {

        setInterval(updateClock, 1000);

      } else if (timer.timeRemaining < 0) {
        
        let intervalIndex = setInterval(updateClock, 1000);
        clearInterval(intervalIndex);

        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    
    updateClock();
  }
  countTimer('21 February 2020');
});