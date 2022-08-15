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
  console.log(event.target.dataset.link);
  const targetLink = event.target.dataset.link;
  const target = document.querySelector(`${targetLink}`)
  if(targetLink == null){
    return;
  } else {
    target.scrollIntoView();
  }
})
