'use strict';
class Validator {
  constructor({ selector, pattern = {}, method }) {
    const forms = document.querySelectorAll(selector);
    this.form = forms;
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...forms]
      .filter(item => item.tagName
        .toLowerCase() !== 'button' && item.type !== 'button');
    this.error = new Set();
  }
  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem
      .addEventListener('change', this.chekIt.bind(this)));
    this.form.forEach(elem => {
      elem.addEventListener('submit', e => {
        this.elementsForm.forEach(elem => this.chekIt({ target: elem }));
        if (this.error.size) {
          e.preventDefault();
        }
      });
    });
  }
  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    if (this.method) {
      const method = this.method[elem.id];
      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }
    return true;
  }
  chekIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }
  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }
  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains('validator-error')) {
      elem.classList.remove('error');
      elem.parentNode.removeChild(document.querySelector('.validator-error'));
    }
  }
  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 3px solid #72ff72 !important;
      }
      input.error {
        border: 2px solid red !important;
      }
      main .main-form-input {
        height: 10rem;
      }
      .validator-error {
        font-size: 13px;
        font-fammily: sans-serif;
        color: rgba(255,255,255,1);
        /*-webkit-text-stroke: 2px rgba(255,255,255,0.5);
        -webkit-text-fill-color: rgba(255,0,0,1);*/
      }`;
    document.head.appendChild(style);
  }
  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]\d{10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}
const valid = new Validator({
  selector: ['#form1', '#form2', '#form3'],
  pattern: {
    name: /^[а-яА-ЯёЁ]+$/,
    phone: /^\+?[78]\d{10}$/,
    message: /^[?!,.а-яА-ЯёЁ0-9\s]+$/,
    zip: /\d{5,6}/
  },
  method: {
    'form1-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form1-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form1-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form2-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form2-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form2-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form2-message': [
      ['notEmpty'],
      ['pattern', 'message']
    ],
    'form3-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form3-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form3-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
  }
});
valid.init();
