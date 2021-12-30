function renderCalculate(containers, state) {
  const monthPayment = (state.totalWithPercent - state.firstInstallment) / state.term;

  containers.inputTotal.value = state.total;
  containers.inputTerm.value = state.term;
  containers.minPayment.value = state.firstInstallment;
  containers.total.textContent = state.totalWithPercent;
  containers.monthPayment.textContent = monthPayment.toFixed(2);
}

function calculate(container, config) {
  const containers = {
    calculatorForm: container,
    inputTotal: container.querySelector('.js-current-total'),
    minPayment: container.querySelector('.js-min-payment'),
    paymentControl: container.querySelector('.js-min-payment-control'),
    termControl: container.querySelector('.js-term-control'),
    inputTerm: container.querySelector('.js-term'),
    monthPayment: container.querySelector('.js-month-payment'),
    total: container.querySelector('.js-total'),
  };
  const state = {
    total: 0,
    firstInstallment: 0,
    totalWithPercent: 0,
    term: 1,
  };

  function recalculateTotalWithPercent(values) {
    const balancePayment = values.total - values.firstInstallment;
    const result = values.total + (balancePayment / 100) * config.percent;
    return result;
  }

  const paymentControlRange = $(containers.paymentControl);
  const termControlRange = $(containers.termControl);

  paymentControlRange.ionRangeSlider({
    grid: false,
    min: state.total,
    max: state.total,
    from: state.total,
    onFinish: (values) => {
      state.firstInstallment = values.from;
      state.totalWithPercent = recalculateTotalWithPercent(state);
      renderCalculate(containers, state);
    },
  });
  termControlRange.ionRangeSlider({
    grid: false,
    min: config.installmentPlan.min,
    max: config.installmentPlan.max,
    from: config.installmentPlan.min,
    onFinish: (values) => {
      state.term = values.from;
      state.totalWithPercent = recalculateTotalWithPercent(state);
      renderCalculate(containers, state);
    },
  });

  const instanceTerm = termControlRange.data('ionRangeSlider');
  const instancePayment = paymentControlRange.data('ionRangeSlider');

  containers.inputTotal.addEventListener('input', (evt) => {
    const total = +evt.target.value ?? 0;
    state.total = total;
    state.firstInstallment = (total / 100) * config.minTotalPercent;
    state.totalWithPercent = recalculateTotalWithPercent(state);
    console.log('iui');
    renderCalculate(containers, state);

    instancePayment.update({
      min: state.firstInstallment,
      max: state.total,
      from: state.firstInstallment,
    });
  });

  containers.minPayment.addEventListener('input', (evt) => {
    const value = +evt.target.value;
    if (value > state.total) {
      state.total = value;
    }
    state.firstInstallment = value;
    state.totalWithPercent = recalculateTotalWithPercent(state);
    renderCalculate(containers, state);
    instancePayment.update({
      min: state.firstInstallment,
      max: state.total,
      from: state.firstInstallment,
    });
  });

  containers.inputTerm.addEventListener('input', (evt) => {
    state.term = +evt.target.value;
    state.totalWithPercent = recalculateTotalWithPercent(state);
    renderCalculate(containers, state);
    instanceTerm.update({
      from: state.term,
    });
  });

  renderCalculate(containers, state);

  containers.calculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const calculateWrap = document.querySelector('#calculator-form');
  const calculateWrap2 = document.querySelector('#calculator-form5');
  const calculateWrap3 = document.querySelector('#calculator-form20');
  const config = {
    minTotalPercent: 50,
    percent: 0,
    installmentPlan: {
      min: 1,
      max: 5,
    },
  };
  const config2 = {
    minTotalPercent: 50,
    percent: 7,
    installmentPlan: {
      min: 1,
      max: 5,
    },
  };
  const config3 = {
    minTotalPercent: 30,
    percent: 12,
    installmentPlan: {
      min: 1,
      max: 20,
    },
  };
  calculate(calculateWrap, config);
  calculate(calculateWrap2, config2);
  calculate(calculateWrap3, config3);
});
