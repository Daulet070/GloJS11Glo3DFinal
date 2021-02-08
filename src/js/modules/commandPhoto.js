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

export default commandPhoto;