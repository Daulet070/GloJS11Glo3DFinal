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

      const formData = new FormData(elem);
      const  body = {};
      for (const val of formData.entries()) {
        body[val[0]] = val[1];
      }

      postData(body)
        .then(response => {
          if (response.status !== 200 || 201 || 204) {
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
          console.warn(error);
        })
        .finally(() => {
          setTimeout(() => {
            statusMessage.remove();
            const formInputs = elem.querySelectorAll('input');
            formInputs.forEach(elem => {
              elem.value = '';
            });
          }, 2000);
        });

    });
  });
// import '../../server/server.php'
// https://jsonplaceholder.typicode.com/posts
  const postData = (body) => {
    return fetch('../../server/server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };
};

export default sendForm;