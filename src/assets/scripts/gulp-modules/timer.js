function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  // var seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days,
    hours,
    minutes,
    // seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  // var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    // if (t.total <= 0) {
    //   document.getElementById('countdown').className = 'hidden';
    //   document.getElementById('deadline-message').className = 'visible';
    //   clearInterval(timeinterval);
    //   return true;
    // }

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;
    // secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const $timer = document.querySelector('#countdown');
const deadline = $timer.dataset.date || 'August 01 2022 00:00:00 GMT+0300'; // for Ukraine
// var deadline = new Date(2022, 08, 20); // for endless timer
initializeClock('countdown', deadline);
