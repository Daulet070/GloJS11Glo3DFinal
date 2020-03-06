const getCalc = () => {
  const calcItem = document.querySelectorAll('[type="number"]');

  calcItem.forEach(elem => {
    elem.addEventListener('input', () => {

      elem.value = elem.value.replace(/\D/, '');

    });
  });
};

export default getCalc;