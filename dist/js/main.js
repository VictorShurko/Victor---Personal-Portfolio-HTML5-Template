/*
|-----------------------------------------------------------
| Victor - Personal Portfolio HTML5 Template
| Version Template: 1.0
|-----------------------------------------------------------
| My Site:        https://victorshurko.com/
| Envato Profile: https://themeforest.net/user/victorshurko
| E-mail:         victorshurko@gmail.com
|-----------------------------------------------------------
| Contents:
|   1. Navigation
|   2. Skills
|   3. Portfolio
|   4. Blog
|   5. Global Function
|   6. Animated Headlines
|   7. Viewport Units on Mobile
|   8. Sticky Menu
|   9. Responsive Block  - About Me
|   10. Active Menu Item
|   11. Button Go-Upsters
|   12. Landing Page
|-----------------------------------------------------------
*/

"use strict";

/* --------------------------------------------------------------------------
    1. Navigation
-----------------------------------------------------------------------------*/
// Animated Dot
function menuDot(){
    let windowWidth = $(window).width();

    if(windowWidth <= 767){
        $('.dot').css('display', 'none');
        return;
    } else {
        let activePosition = $('nav ul .active').position().left;
        let activeItemWidth = $('nav ul .active').width();
        $('.dot').css({'left': (activePosition + activeItemWidth / 2)-2});
    
        $('nav').mouseout(function(){
            activePosition = $('nav ul .active').position().left;
            activeItemWidth = $('nav ul .active').width();
            $('.dot').css({'left': (activePosition + activeItemWidth / 2)-2,'animation':'dotOut .3s ease-in-out'});
        });
    
        $('nav ul li').hover(function(){
            let navPosition = $(this).position().left;
            let navItemWidth = $(this).width();
            
            $('.dot').css({'left': (navPosition + navItemWidth / 2)-2,'animation':'dot .3s ease-in-out'});
        });   
    }; 
};

/* --------------------------------------------------------------------------
    2. Skills
-----------------------------------------------------------------------------*/
// Animated Bar
let block_show = false;
 
function animatedBar(){
    
	if (block_show) {
		return false;
	};
 
	var wt = $(window).scrollTop();
	var wh = $(window).height();
	var et = $('.skills__items').offset().top;
	var eh = $('.skills__items').outerHeight();
	var dh = $(document).height();   
 
	if (wt + wh >= et || wh + wt == dh || eh + et < wh){
		block_show = true;
		
		$('.skills__items div:eq(0)').show('fast', function(){
            let progressBar = $('.skill__progress-bar');

            for(let i=0; i<progressBar.length; i++){
                let progressBarPercent = $(progressBar[i]).data('progress');
                $(progressBar[i]).css('width', progressBarPercent + '%');
                $(progressBar[i]).before('<div class=' + 'skill__percent-'+ i + '>' + '</div>');
                let skillPercent = $('.skill__percent-' + i);
                $({ Counter: 0 }).animate({Counter: progressBarPercent}, {duration: 2000,easing: 'swing',step: function() {
                    skillPercent.text(Math.ceil(this.Counter) + '%');
                }
                });
            };  
		});
	}
};

/* --------------------------------------------------------------------------
    3. Portfolio
-----------------------------------------------------------------------------*/
// Filter
const grid = new Muuri('.grid', {
	layout: {
		rounding: false,
  },
});

function filterPortfolio(){
    
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('images-loaded');

	// List Categories
	const links = document.querySelectorAll('#filter__categories a');
	
	links.forEach( el => {
		el.addEventListener('click', e => {
			e.preventDefault();
			e.target.parentElement.querySelector('#filter__categories a.active').classList.remove('active');
			e.target.classList.add('active');
			
			const categorie = e.target.innerHTML.toLowerCase().trim();
			categorie === 'all' ? grid.filter('[data-category]') : grid.filter(`[data-category="${categorie}"]`);
		});
	});
};

/* --------------------------------------------------------------------------
    4. Blog
-----------------------------------------------------------------------------*/
let elementBlog = document.getElementById('portfolio');
new ResizeSensor(elementBlog, function() {
    AOS.refresh();
});

/* --------------------------------------------------------------------------
    5. Global Function
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
    6. Animated Headlines
-----------------------------------------------------------------------------*/
jQuery(document).ready(function($){
	//set animation timing
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;
	
	initHeadline();
	

	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.cd-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.cd-words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .cd-words-wrapper the width of its longest word
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');	
			setTimeout(function(){ 
				parentSpan.removeClass('selected'); 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		
		} else if($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.cd-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');
		
		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		} else if($bool) { 
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');
		
		if(!$letter.is(':last-child')) { 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		} else { 
			if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});

/* --------------------------------------------------------------------------
    7. Viewport Units on Mobile
-----------------------------------------------------------------------------*/
function viewportUnitsMobile(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

/* --------------------------------------------------------------------------
    8. Sticky Menu
-----------------------------------------------------------------------------*/
function stickMenu(){

    const navHeader = document.querySelector('.header__navigation');
    const fixedBg = document.querySelector('.header--fixed-bg');
    const navHeaderHeight = navHeader.offsetHeight;
    let headerLogo = document.querySelector('.logo__text');
    let menuLink = document.querySelectorAll('.menu__link');
    let responsiveMenuIcon = document.querySelectorAll('.header__responsive-menu span');
    let scrollDistanse = window.scrollY;
    let hasClassActive = $('.header__responsive-menu').hasClass('active');
    
    if (scrollDistanse >= navHeaderHeight){
        fixedBg.style.opacity = 1;
        fixedBg.style.top = 0;
        for (let i = 0; i < menuLink.length; i++) {
            menuLink[i].classList.add('menu__link--black');
        };
        headerLogo.classList.add('logo__text--black');
        if(hasClassActive !== true){
            for (let i = 0; i < responsiveMenuIcon.length; i++) {
                responsiveMenuIcon[i].style.backgroundColor = '#2A2D2E';
                };
        };
        document.querySelector('.dot').style.backgroundColor = '#2A2D2E';
    } else {
        fixedBg.style.opacity = 0;
        fixedBg.style.top = -100 + 'px';
        for (let i = 0; i < menuLink.length; i++) {
            menuLink[i].classList.remove('menu__link--black');
        };
        headerLogo.classList.remove('logo__text--black');
        for (let i = 0; i < responsiveMenuIcon.length; i++) {
            responsiveMenuIcon[i].style.backgroundColor = '#ffffff';
            };
            document.querySelector('.dot').style.backgroundColor = '#ffffff';
    }
};

/* --------------------------------------------------------------------------
    9. Responsive Block  - About Me
-----------------------------------------------------------------------------*/
function aboutResponsive(){
    let aboutImage = document.querySelector('.about__image');
    let aboutContent = document.querySelector('.about__content');
    let aboutInner = document.querySelector('.about__inner');

    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    // Media Quaries 1182px
    if(viewportWidth <= 1182){
        if(!aboutImage.classList.contains('done')){
            aboutContent.insertBefore(aboutImage, aboutContent.children[2]);
            aboutImage.classList.add('done');
        } 
    } else {
        if(aboutImage.classList.contains('done')){
            aboutInner.insertBefore(aboutImage, aboutInner.children[1]);
            aboutImage.classList.remove('done');
        }
    };
};

/* --------------------------------------------------------------------------
    10. Active Menu Item
-----------------------------------------------------------------------------*/
function scrollActiveMenu(){
    let scrollDistanse = window.scrollY;

    document.querySelectorAll('.section').forEach((el, i)=> {
        if (el.offsetTop - document.querySelector('.header__navigation').clientHeight*2 <= scrollDistanse){
            document.querySelectorAll('.menu .menu__item').forEach((el)=>{
                if (el.classList.contains('active')){
                    el.classList.remove('active');
                }
            });

            document.querySelectorAll('.menu .menu__item')[i].classList.add('active');
            let navPosition = $('nav ul .active').position().left;
            let navItemWidth = $('nav ul .active').width();
            
            $('.dot').css({'left': (navPosition + navItemWidth / 2)-2,'animation':'dotOut .3s ease-in-out'});
        }
    });
};

/* --------------------------------------------------------------------------
    11. Button Go-Upsters
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

/* --------------------------------------------------------------------------
    12. Landing Page
-----------------------------------------------------------------------------*/
function landingPage(){
    if($('body').hasClass('landing-page')){
        
        let menu = $('#menu');
        
        // add attr data-href, data-id
        $('a[href]', menu).each(function(){	

            let url = $(this).attr('href');
            if(url && url.split('#')[1]){
                let hash = '#' + url.split('#')[1];
                if(hash && $(hash).length){
                    $(this).attr('data-href', hash);
                    $(hash).attr('data-id', hash);
                }
            }
        });
        
        $('#menu a[data-href]').click(function(e){ 
            e.preventDefault();
            
            menu.find('li').removeClass('active');
            $(this)
                .closest('li').addClass('active')
                .closest('.menu > li').addClass('active');
            let hash = $(this).attr('data-href');
            hash = '[data-id="'+ hash +'"]';
            
            $( 'html, body' ).animate({ 
                scrollTop: $( hash ).offset().top
            }, 500);
            
        });
    }
};

// Header Button - Get in Touch
$('.header-getintouch').click(function(e){
    e.preventDefault();

    $( 'html, body' ).animate({ 
        scrollTop: $('#contact').offset().top
    }, 100);
});

// Close menu when pressing menu item on mobile device
function menuResponsive(){
    let menuLink = $('.menu__link');

    menuLink.click(function(e){

        if( $(window).width() > 767 ){
            return;
        } else if ( $(window).width() <= 767){
            let menuHasClass = $('.menu').hasClass('active');
            let bodyHasClass = $('body').hasClass('lock');
            if(menuHasClass && bodyHasClass){
                $('body').removeClass('lock');
                $('.menu').removeClass('active');
                $('.header__responsive-menu').removeClass('active');
            } else {
                return;
            };
        };
    });
};



// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
    viewportUnitsMobile();
    stickMenu();
    menuDot();
    aboutResponsive();
    animatedBar();
    filterPortfolio();
    landingPage();
    goUpstairs();

    /* --------------------------------------------------------------------------
    Responsive Menu
    -----------------------------------------------------------------------------*/
    $('.header__responsive-menu').click(function(event){
        let responsiveMenuIcon = document.querySelectorAll('.header__responsive-menu span');

        $(this).toggleClass('active');
        let stickMenuOn = $('.menu__link').hasClass('menu__link--black');
        let hasClassActive = $(this).hasClass('active');

        if(stickMenuOn == true && hasClassActive == true){
            for (let i = 0; i < responsiveMenuIcon.length; i++) {
                responsiveMenuIcon[i].style.backgroundColor = '#ffffff';
                };
        } else if(stickMenuOn == true && hasClassActive == false){
            for (let i = 0; i < responsiveMenuIcon.length; i++) {
                responsiveMenuIcon[i].style.backgroundColor = '#2A2D2E';
                };
        };
        $('.menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    menuResponsive();
});

// Scroll
window.addEventListener('scroll', function() {
    stickMenu();
    scrollActiveMenu();
    animatedBar();
});

// Resize
window.addEventListener('resize', function() {
    viewportUnitsMobile();
    aboutResponsive();
});