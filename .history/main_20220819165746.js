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

// Handle scrolling when tap the contact me button.

const homeButton = document.querySelector('.home__button');

homeButton.addEventListener('click', () => {
  scrollIntoView('#contact');
})


// Make transparent home when scrolling

const home = document.querySelector('#home');
const homeContainer = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  homeContainer.style.opacity = 1 - window.scrollY/homeHeight;
})

// Arrow-up Button
// Visible when Scrolled Down
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight/2){
    arrowUpBtn.classList.add('visible');
  } else{
    arrowUpBtn.classList.remove('visible');
  }
})

// Scrolling Top When Clicked.
const arrowUpBtn = document.querySelector('.arrow_up');
arrowUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'});
})

// Project Filtering when button clicked
const projectBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

projectBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.active');
  active.classList.remove('active');
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('active');

  projectContainer.classList.add('anim-out');
  setTimeout(()=>{
    projects.forEach((project) => {
      if(filter == null){
        return;
      }
      if(filter === '*' || filter === project.dataset.type){
        project.classList.remove('invisible');
      } else{
        project.classList.add('invisible');
      }
  
    })
    projectContainer.classList.remove('anim-out');
  }, 300)
})

// Navbar Toggle Button in Small Screen

const toggleBtn = document.querySelector('.toggle__button');
toggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('visible');
})

//Functions
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}


// 1. 모든 섹션 요소들과 메뉴 아이템을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));


const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
)


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0){
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      console.log(entry);

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

window.addEventListener('scroll', () => {
  if(window.scrollY === 0){
    selectedNavIndex = 0;
  } else if(window.scrollY + window.innerHeight === document.body.clientHeight){
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
} )