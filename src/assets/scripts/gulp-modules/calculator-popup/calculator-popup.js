// document.querySelectorAll('[data-calculator-popup-call]').forEach

function nodeListAddCallback(selector, cb) {
  document.querySelectorAll(selector).forEach(el => cb(el));
}
nodeListAddCallback('[data-calculator-popup-call]', (callButton) => {
  callButton.addEventListener('click', () => {
    const popup = document.querySelector('.calculator-popup');
    const popupClose = popup.querySelector('.close-popup');
    popupClose.onclick = () => {
      gsap.to(popup, { autoAlpha: 0, pointerEvents: 'none' });
    };
    gsap.to(popup, { autoAlpha: 1, pointerEvents: 'all' });
    console.log(gsap);
  });
});


function handleCalculatorQuiz() {
  const popup = document.querySelector('.calculator-popup');
  const submitButton = popup.querySelector('[type="submit"]');
  submitButton.style.display = 'none';
  popup.slider.navigation.nextEl.style.display = 'none';
  popup.slider.navigation.prevEl.style.display = 'none';
  popup.slider.slides[0].onclick = () => {
    if (popup.slider.slides[0].querySelector('input:checked') !== null) popup.slider.navigation.nextEl.style.display = '';
  };

  popup.slider.on('activeIndexChange', ({
    slides, activeIndex, previousIndex, navigation, ...config
  }) => {
    const currentSlide = slides[activeIndex];
    popup.slider.navigation.prevEl.style.display = activeIndex === 0 ? 'none' : '';
    if (currentSlide.querySelector('input:checked') === null) {
      navigation.nextEl.style.display = 'none';
    } else {
      navigation.nextEl.style.display = '';
    }
    if (activeIndex === (slides.length - 2)) {
      submitButton.style.display = '';
    } else {
      submitButton.style.display = 'none';
    }
    currentSlide.onclick = () => {
      if (currentSlide.querySelector('input:checked') !== null) navigation.nextEl.style.display = '';
    };
  });

  window.addEventListener('succesFormSend', () => {
    popup.slider.slideTo(popup.slider.slides.length - 1);
  });
}
window.addEventListener('DOMContentLoaded', handleCalculatorQuiz);
