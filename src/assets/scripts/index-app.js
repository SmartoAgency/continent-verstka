import { gsap, ScrollTrigger } from 'gsap/all';
import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
// import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
global.axios = axios;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
/* eslint-disable-next-line */
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  inertia: 1.1,
});
global.locoScroll = locoScroll;
window.locoScroll = locoScroll;
window.locoScroll.update();
// disableScroll();
setTimeout(() => {
  window.locoScroll.update();
}, 2000);
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = [
  // '[data-sign-up-email-form]',
  // '[data-home-contact]',
  // '[data-form-popup]',
  // '[data-form-footer]',
  // '[data-form-popup-consultation]',
];

// const formsTel = ['[data-home-contact]', '[data-form-homepage]'];
// const formsTel = ['[data-form-homepage]'];


const gratitudeTimer = (value) => {
  const secondsForTimer = value ? +value : 60;
  const circle = document.querySelector('[data-gratitude-timer] circle');
  const circleLength = circle.getTotalLength();
  circle.style.strokeDasharray = `${circleLength} ${circleLength}`;
  circle.style.strokeDashoffset = circleLength;
  console.log(circleLength);
  const minutes = document.querySelector('[data-gratitude-timer] [data-gratitude-timer-minutes]');
  const second = document.querySelector('[data-gratitude-timer] [data-gratitude-timer-seconds]');
  const finishTime = new Date().getTime() + secondsForTimer * 1000;

  const timer = (value) => {
    const now = new Date().getTime();
    const difference = Math.floor((finishTime - now) / 1000);
    const differenceMinutes = Math.floor((finishTime - now) / 1000 / 60);
    const secondsLeft = difference % 60;
    const minuterLeft = differenceMinutes % 60;
    const secondsLeftToFormatted = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
    const minuterLeftToFormatted = minuterLeft < 10 ? `0${minuterLeft}` : minuterLeft;
    if (secondsLeftToFormatted != second.textContent) second.textContent = secondsLeftToFormatted;
    if (minuterLeftToFormatted != minutes.textContent) minutes.textContent = minuterLeftToFormatted;
    circle.style.strokeDashoffset = circleLength - (circleLength * difference / secondsForTimer);

    if (difference <= 0) return;
    setTimeout(timer, 1000);
  };
  timer();
};


function dayTimeInputsHandler() {
  document.querySelectorAll('[type="date"], [type="time"]').forEach((input) => {
    const checkmark = input.parentElement.querySelector('.checkmark');
    input.addEventListener('blur', () => {
      checkmark.style.display = input.value.length > 0 ? 'none' : '';
    });
  });
}
dayTimeInputsHandler();


const formsTel = ['[data-popup-form]', '[data-sign-up-form]', '[data-form-quiz]', '[data-sign-up-email-form]', '.review-form'];

formsTel.forEach((form) => {
  const $form = document.querySelector(form);
  // console.log($form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: (data) => {
          // if ($form.matches('.review-form')) {
          //   const prevText = $form.querySelector('[data-btn-submit] span').textContent;
          //   $form.querySelector('[data-btn-submit] span').textContent = 'Відправлено';
          //   setTimeout(() => {
          //     $form.querySelector('[data-btn-submit] span').textContent = prevText;
          //   }, 5000);
          //   return;
          // }

          if ($form.matches('[data-sign-up-email-form]')) {
            const backdrop = document.querySelector('[data-sign-up-mail-succes]');
            gsap.to(backdrop, { autoAlpha: 1, right: 0 });
            backdrop.querySelector('.js-close').addEventListener('click', (evt) => {
              gsap.to(backdrop, { autoAlpha: 0, right: '-100%' });
            }, { once: true });
            return;
          }
          if ($form.classList.contains('feedback-form')) {
            const backdrop = document.querySelector('.form-gratitude');
            gsap.to(backdrop, { autoAlpha: 1, right: 0 });
            backdrop.querySelector('.js-close').addEventListener('click', (evt) => {
              gsap.to(backdrop, { autoAlpha: 0, right: '-100%' });
            }, { once: true });
            gratitudeTimer($form.dataset.timer);
            return;
          }
          if ($form.classList.contains('review-form')) {
            const text = document.querySelector('.sing-up-review__congrats h3');
            text.innerHTML = `${i18next.t('youRegistered')} ${data.get('day')}, ${data.get('time')}`;
            gsap.to('.sing-up-review__congrats', { autoAlpha: 1 });
            setTimeout(() => {
              gsap.to('.sing-up-review__congrats', { autoAlpha: 0 });
              text.innerHTML = '';
            }, 5000);
          }
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
              typeInput: 'text',
            }),
            rule: yup.string().matches(/[^ ]/, i18next.t('required')).required(i18next.t('required')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .test(
                'phone',
                i18next.t('required'),
                (evt) => {
                  const digitsCount = evt.replace(/[^0-9]/g, '');
                  return digitsCount.length >= 12;
                },
                i18next.t('required'),
              )
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
  }
});

const continentClubForm = ['[data-continent-club-form]'];
// const footerForm = ['[data-form-footer]'];
continentClubForm.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          const backdrop = document.querySelector('.form-gratitude');
          gsap.to(backdrop, { autoAlpha: 1, right: 0 });
          document.querySelector('.form-gratitude .js-close').addEventListener('click', () => {
            gsap.to(backdrop, { autoAlpha: 0, right: '-100%' });
          }, { once: true });
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          agreement: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-agreement]'),
              typeInput: 'text',
            }),
            rule: yup.string().required(i18next.t('required')),

            defaultMessage: 'Номер договору',
            valid: false,
            error: [],
          },
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
              typeInput: 'text',
            }),
            rule: yup.string().required(i18next.t('required')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .test(
                'phone',
                i18next.t('required'),
                (evt) => {
                  const digitsCount = evt.replace(/[^0-9]/g, '');
                  return digitsCount.length >= 12;
                },
                i18next.t('required'),
              )
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
  }
});


forms.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    // console.log($form);
    // console.log($form.querySelector('[data-btn-submit]'));
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          document.querySelector('.backdrop').classList.add('is-hidden-form');
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .matches(/^[a-z]+$/, i18next.t('required'))
              .required(i18next.t('required'))
              .trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          checkbox1: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-checkbox]'),
              typeInput: 'checkbox',
            }),
            rule: yup
              .bool()
              .nullable()
              .oneOf([true], i18next.t('fillCheboxMessage')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener(
      'click',
      () => {
        $form.querySelector('[name="phone"]').focus();
      },
      false,
    );
  }
  document.querySelectorAll('[name="checkbox1"]').forEach((el) => {
    el.value = false;
    el.addEventListener('change', () => {
      el.value = !!el.checked;
      $form.querySelector('[name="phone"]').dispatchEvent(new Event('input'));
    });
  });
});

function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  containersScroll.forEach((block) => {
    block.addEventListener('mouseenter', () => {
      window.locoScroll.stop();
    });

    block.addEventListener('mouseleave', () => {
      window.locoScroll.start();
    });
  });
}

window.addEventListener('load', () => {
  // console.log('load');
  window.locoScroll.update();
});

window.addEventListener('DOMContentLoaded', () => {
  // console.log('DOMContentLoaded');
  // disableScroll();
  // initPopup();
  window.locoScroll.update();
});

const blockForUpdatingLocoScroll = document.querySelectorAll(
  '.page__content>*:last-child, .footer, .about-block-last, .about-block-last',
);
blockForUpdatingLocoScroll.forEach((image) => {
  const callback = function (entries, observer) {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        locoScroll.update();
        observer.unobserve(image);
      }
    });
  };
  // eslint-disable-next-line no-undef
  const observer = new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0.1,
  });
  const target = image;
  observer.observe(target);
});

gsap.registerPlugin(ScrollTrigger);
/* eslint-disable no-undef */

if (!window.location.pathname.match(/infrastructure|developer/)) {
  locoScroll.on('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector('.page__inner').style.transform ? 'transform' : 'fixed',
    // pinType: document.body.style.transform ? 'transform' : 'fixed',
  });
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

const paralaxImages = document.querySelectorAll('[data-paralax]');
paralaxImages.forEach((image) => {
  const wrap = document.createElement('div');
  wrap.style.overflow = 'hidden';
  wrap.style.height = '100%';
  image.parentElement.prepend(wrap);
  gsap.set(image, { willChange: 'transform', scale: 1.1 });
  wrap.prepend(image);

  gsap
    .timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        scrub: 0.5,
        onLeave: () => {
          // console.log('leave');
        },
        // markers: true,
      },
    })
    .fromTo(
      image,
      {
        y: -35,
      },
      {
        y: 35,
        ease: 'linear',
      },
    );
});

const spanBezier1 = 'power4.ease';
// const spanBezier1 = 'power1.inOut';
const spanEntries1 = document.querySelectorAll('[data-span-entry1]');
spanEntries1.forEach((section, index) => {
  gsap.set(section, { overflow: 'hidden' });
  section.innerHTML = `
    <div>
      ${section.innerHTML}
    </div>
  `;
  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 1,
      trigger: section,
      // start: 'top top',
      // start: '0% bottom',
      // end: '100% bottom',
      onEnter: () => {
        if (index === 0) console.log('enter');
      },
      once: true,
      // scrub: 1,
    },
  });
  tl.fromTo(
    section.querySelector('div'),
    { y: '50%', autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: spanBezier1,
    },
  );
});

const spanEntries2 = document.querySelectorAll('[data-span-entry2]');
spanEntries2.forEach((section, index) => {
  gsap.set(section, { overflow: 'hidden' });
  section.innerHTML = `
    <div>
      ${section.innerHTML}
    </div>
  `;
  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 1,
      trigger: section,
      // start: 'top top',
      // start: '0% bottom',
      // end: '100% bottom',
      onEnter: () => {
        if (index === 0) console.log('enter');
      },
      once: true,
      // delay: 150,
      // scrub: 1,
    },
  });
  tl.fromTo(
    section.querySelector('div'),
    { y: '50%', autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: spanBezier1,
      delay: 1.3,
    },
  );
});

const spanEntries3 = document.querySelectorAll('[data-span-entry3]');
spanEntries3.forEach((section, index) => {
  gsap.set(section, { overflow: 'hidden' });
  section.innerHTML = `
    <div>
      ${section.innerHTML}
    </div>
  `;
  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 1,
      trigger: section,
      // start: 'top top',
      // start: '0% bottom',
      // end: '100% bottom',
      onEnter: () => {
        if (index === 0) console.log('enter');
      },
      once: true,
      opacity: 0,
      // delay: 150,
      // scrub: 1,
    },
  });
  tl.fromTo(
    section.querySelector('div'),
    { y: '30%', autoAlpha: 0 },
    {
      opacity: 1,
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: spanBezier1,
      delay: 1.3,
    },
  );
});

const spanEntries4 = document.querySelectorAll('[data-span-entry4]');
spanEntries4.forEach((section, index) => {
  gsap.set(section, { overflow: 'hidden' });
  section.innerHTML = `
    <div>
      ${section.innerHTML}
    </div>
  `;
  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 1,
      trigger: section,
      // start: 'top top',
      // start: '0% bottom',
      // end: '100% bottom',
      onEnter: () => {
        if (index === 0) console.log('enter');
      },
      opacity: 0,
      once: true,
      // delay: 150,
      // scrub: 1,
    },
  });
  tl.fromTo(
    section.querySelector('div'),
    { y: '30%', autoAlpha: 0 },
    {
      opacity: 1,
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: spanBezier1,
      // delay: 1.3,
    },
  );
});
const spanEntries5 = document.querySelectorAll('[data-span-entry5]');
spanEntries5.forEach((section, index) => {
  gsap.set(section, { overflow: 'hidden' });
  section.innerHTML = `
    <div>
      ${section.innerHTML}
    </div>
  `;
  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 1,
      trigger: section,
      // start: 'top top',
      // start: '0% bottom',
      // end: '100% bottom',
      onEnter: () => {
        if (index === 0) console.log('enter');
      },
      opacity: 0,
      once: true,
      // delay: 150,
      // scrub: 1,
    },
  });
  tl.fromTo(
    section.querySelector('div'),
    { y: '20%', autoAlpha: 0 },
    {
      opacity: 1,
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: spanBezier1,
      delay: 1.3,
    },
  );
});


function formInHeaderHandler() {
  const form = document.querySelector('.js-sideform-call');
  form.querySelector('.js-close').addEventListener('click', () => {
    gsap.to(form, { autoAlpha: 0, right: '-100%' });
  });
  window.addEventListener('click', (evt) => {
    const target = evt.target.closest('.js-call');
    if (target === null) return;
    document.querySelector('.js-mobile-close').click();
    gsap.to(form, { autoAlpha: 1, right: 0 });
  });

  document.querySelectorAll('.js-call').forEach((el) => {
    el.addEventListener('click', () => {
      gsap.to(form, { autoAlpha: 1, right: 0 });
    });
  });
}
formInHeaderHandler();
function formSubscribeHandler() {
  const form = document.querySelector('[data-sign-up-mail]');
  window.addEventListener('click', (evt) => {
    const target = evt.target.closest('.btn-subscribe');
    if (target === null) return;
    gsap.to(form, { autoAlpha: 1, right: 0 });
  });

  document.querySelectorAll('.btn-subscribe').forEach((el) => {
    el.addEventListener('click', () => {
      gsap.to(form, { autoAlpha: 1, right: 0 });
    });
  });
  form.querySelector('.js-close').addEventListener('click', () => {
    gsap.to(form, { autoAlpha: 0, right: '-100%' });
  });
}
formSubscribeHandler();


window.addEventListener('click', (evt) => {
  const target = evt.target.closest('[data-sign-up-call]');
  const signupForm = document.querySelector('.sing-up-review');
  const closeMenu = document.querySelector('.js-menu-close');
  if (target === null || signupForm === null || closeMenu === null) return;
  gsap.to('.form-sing-up', { autoAlpha: 1, right: 0 });
  document.querySelector('.form-sing-up .js-close').addEventListener('click', (evt) => {
    gsap.to('.form-sing-up', { autoAlpha: 0, right: '-100%' });
  }, { once: true });
  closeMenu.click();
});
