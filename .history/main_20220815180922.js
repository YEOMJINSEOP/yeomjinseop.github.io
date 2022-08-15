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
    const targetScrollTo = document.querySelector(targetLink);
    targetScrollTo.scrollIntoView({behavior: "smooth"});
  }
})

// Handle scrolling when tap the contact me button.

const homeButton = document.querySelector('.home__button');

homeButton.addEventListener('click', () => {
  console.log("click!");
  const contact = document.querySelector('#contact'); 
  contact.scrollIntoView();
})
