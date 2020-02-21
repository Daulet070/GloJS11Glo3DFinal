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
  countTimer('21 February 2020');
});