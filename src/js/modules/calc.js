const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

  const countSumm = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;

    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }
    if (+calcDay.value === 0 || +calcCount.value === 0 || +calcSquare === 0) {
      total = 0;
    }
    totalValue.textContent = Math.round(total);
  };

  calcBlock.addEventListener('change', event => {
    const target = event.target;

    if (target.matches('select') || target.matches('input')) {
      countSumm();
    }
  });
};

export default calc;