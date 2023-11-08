/*
|-----------------------------------------------------------
| Victor - Personal Portfolio HTML5 Template
| Version Template: 1.0
|-----------------------------------------------------------
| My Site:        https://victorshurko.com/
| Envato Profile: https://themeforest.net/user/victorshurko
| E-mail:         victorshurko@gmail.com
|-----------------------------------------------------------
| 
|-----------------------------------------------------------
*/

"use strict";

/* --------------------------------------------------------------------------
    Global Function
-----------------------------------------------------------------------------*/
// Replaces the image in the block with the background-image
function ibg(){
    $.each($('.ibg'), function(index, val){
        if($(this).find('img').length>0){
            $(this).css('background-image', 'url("'+$(this).find('img').attr('src')+'")');
        }
    });
};
ibg();

/* --------------------------------------------------------------------------
    Viewport Units on Mobile
-----------------------------------------------------------------------------*/
function viewportUnitsMobile(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

/* --------------------------------------------------------------------------
    Button Go-Upsters
-----------------------------------------------------------------------------*/
function goUpstairs(){
    let goUpstairs = $('.go-upstairs');
    let goUpVisible = false;
    let headerHight = document.querySelector('.header').offsetHeight;

    document.addEventListener('scroll', function(){
        let scrollY = window.scrollY;
        if(scrollY >= headerHight){
            goUpstairs.css({'opacity': 1, 'cursor': 'pointer'});
            goUpVisible = true;
        } else {
            goUpstairs.css({'opacity': 0, 'cursor': 'auto'});
            goUpVisible = false;
        };
    });
    goUpstairs.click(function(){
        if(goUpVisible){
            $( 'html, body' ).animate({ 
                scrollTop: $('#home').offset().top
            }, 500); 
        } else {
            return;
        };

    });    
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
    viewportUnitsMobile();
    goUpstairs();
});

// Scroll
window.addEventListener('scroll', function() {
});

// Resize
window.addEventListener('resize', function() {
    viewportUnitsMobile();
});