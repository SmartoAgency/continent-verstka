// const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItems = document.querySelectorAll('.tabs__item');

// tabsBtn.forEach(onTabClick);

function onTabClick(item, tabsBtn, tabsItems) {
  item.addEventListener('click', () => {
    const currentBtn = item;
    const tabId = currentBtn.getAttribute('data-tab');
    const currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('active')) {
      tabsBtn.forEach(item => {
        item.classList.remove('active');
      });

      tabsItems.forEach(item => {
        item.classList.remove('active');
      });

      currentBtn.classList.add('active');
      currentTab.classList.add('active');
      window.dispatchEvent(new Event('our-projects-switch-tab'));
    }
  });
}
// document.querySelector('.tabs__nav-btn').click();

document.querySelectorAll('.accordion-item').forEach(el => {
  const tabsBtn = el.querySelectorAll('.tabs__nav-btn');
  if (tabsBtn.length === 0) return;
  const tabsItems = el.querySelectorAll('.tabs__item');
  tabsBtn.forEach(item => {
    onTabClick(item, tabsBtn, tabsItems);
  });
});
