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

export default togglePopUp;