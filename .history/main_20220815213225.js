'use strict';

// Make navvar transparent when it is on the top.

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
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

  projectContainer.classList.add('anim-out');

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

  setTimeout(()=>{
    projectContainer.classList.remove('anim-out');
  }, 300)
})





//Functions