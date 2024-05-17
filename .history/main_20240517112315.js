'use strict';

// Make navbar transparent when it is on the top.

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  // toggle button menu remove when scrolling
  navbarMenu.classList.remove('visible');

    if(scrollY > navbarHeight){
      navbar.classList.add('navbar__dark');
    } else {
      navbar.classList.remove('navbar__dark');
    }
  })

// Handle scrolling when tap the navbar menu.
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {

  const target = event.target
  const targetLink = event.target.dataset.link;

  if(targetLink == null){
    return;
  } else {
    scrollIntoView(targetLink);
    selectNavItem(target);
  }
})

// Make transparent home when scrolling

const home = document.querySelector('#home');
const homeContainer = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  homeContainer.style.opacity = 1 - window.scrollY/homeHeight;
})





// Select Navbar button when scrolling(wheel)

// 1. 모든 섹션 요소들과 메뉴 아이템을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = [
  '#home',
  '#publications',
];

const sections = sectionIds.map(id => document.querySelector(id));


const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
)


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];


const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0){
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // console.log(entry);

      if(entry.boundingClientRect.y < 0){
        selectedNavIndex = index + 1;
      } else{
        selectedNavIndex = index - 1;
      }

    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if(window.scrollY === 0){
    selectedNavIndex = 0;
  } else if(window.scrollY + window.innerHeight === document.body.clientHeight){
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
} )

//Functions
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

function selectNavItem(selected){
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}