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

const home = document.querySelector('#home');
const about = document.querySelector('#about');
document.addEventListener('scroll', () => {
  console.log(home.getBoundingClientRect().top);
  console.log();
})