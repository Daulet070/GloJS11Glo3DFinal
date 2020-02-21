window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  // New Timer
  let date = new Date(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
  if ( hours >= 4 && hours < 10 ) {
    document.write(`Доброе утро! <br>`);
  } else if ( hours >= 10 && hours < 18 ) {
    document.write(`Добрый день! <br>`);
  } else if ( hours > 18 && hours < 24 ) {
    document.write(`Добрый вечер! <br>`);
  } else if ( hours >= 0 && hours < 4) {
    document.write(`Доброй ночи! <br>`);
  } else {
    document.write('Error Time');
  }
  const weekday = ["Воскресенье", "Понедельник", "Вторник",
                 "Среда", "Четверг", "Пятница", "Суббота"];
  document.write(`Сегодня ${weekday[date.getDay()]} <br>`);
  
  const checkTime = (i) => {
    if ( i < 10 ) {
      i="0" + i;
    }
    return i;
  }
  document.write(`Текущее время:
                  ${checkTime(hours)}:${checkTime(minutes)}:${checkTime(seconds)} PM <br>`);

  const daysLeftNewYear = () => {  
    let today = new Date(),
        nextDate = new Date("December 31, 2020"),
        // Количество миллисекунд в одном дне
        msPerDay = 24*60*60*1000,
        // Высчитываем количество дней
        daysLeft = Math.round((nextDate.getTime() - today.getTime())/msPerDay),
        dayname = "",
        ds = "" + daysLeft,
        // Вырезаем последнею цифру
        dd = parseInt(ds.substr(ds.length-1));

    if (daysLeft >= 4 && daysLeft < 21) {
      dayname = 'дней';
    } else if (dd === 1) {
      dayname = 'день';
    } else if (dd === 2 || dd === 3) {
      dayname = 'дня';
    } else {
      dayname = 'дней';
    }
    document.write(`До нового года осталось ${daysLeft} ${dayname}!`);
  }
  daysLeftNewYear();
});