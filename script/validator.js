class Validator {
  constructor({selector, pattern, metod}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.metod = metod;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' &&
      item.type !== 'button';  
    });
  }
  init(){
    this.applyStyle();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt));
    // console.log(elementsForm);
  }
  
  showError(elem){
    elem.classList.remove('error');
    elem.classList.add('success');
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjancentElement('aftered', errorDiv);
  }
  showSuccess(elem){
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling.classList.contain('validator-error')){
      elem.nextElementSibling.remove();
    }
  }
  applyStyle(){
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green;
      }
      input.error {
        border: 2px solid red;
      }
    `;
  }
}