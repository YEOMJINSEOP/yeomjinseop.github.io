'use strict';

// Make navvar transparent when it is on the top.

const navbar = nabdocument.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClineRect().height;

document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    console.log("navbarHeight : ", navbarHeight);
  })
