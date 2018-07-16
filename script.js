var selectToggler = document.querySelector('button');
var toggleBtn = document.querySelector('.navbarToggle');
var navlistBtn = document.querySelector('.closeList');
var getMobileLogoLink = document.querySelector('#mobileLogo');
var getNavListBackground = document.querySelector('.mobileBackground');
var getMainMenu = getNavListBackground.querySelector('.mainMenu');
var getMainMenuLinks = getMainMenu.querySelectorAll('.mainMenu>li');
var getSubMenus = document.querySelectorAll('.subMenu');
var getEntireNav = document.querySelector('header>div');

// Active class for main-menu links
for (var i = 0; i < getMainMenuLinks.length; i++) {
    getMainMenuLinks[i].addEventListener('mouseover', function () {
        var getSubMenu = this.querySelector('.subMenu');
        var getSubMenuLinks = this.querySelectorAll('li, li>a');
        for (var j = 0; j < getSubMenuLinks.length; j++) {
            getSubMenuLinks[j].addEventListener('click', function () {
                var activeLink = document.getElementsByClassName('active');
                if (activeLink.length != 0) {
                    activeLink[0].classList.remove('active');
                }
                getSubMenu.parentElement.classList.add('active');
            });
        }
    });
}

// Media query max 986
function mediaQuery(widthValue) {
    if (widthValue.matches) {
        toggleBtn.addEventListener('click', navListOpen);
        navlistBtn.addEventListener('click', navListClose);
        getNavListBackground.addEventListener('click', function () {
            selectToggler.classList.remove("toggleStyle");
        });
        getMobileLogoLink.addEventListener('click', navListClose);

        function navListOpen() {
            getNavListBackground.classList.remove('mobileBackgroundWidth0');
            getNavListBackground.classList.add('mobileBackgroundWidth100');
        }

        function navListClose() {
            getNavListBackground.classList.add('mobileBackgroundWidth0');
            getNavListBackground.classList.remove('mobileBackgroundWidth100');
            selectToggler.classList.toggle("toggleStyle");
            return false;
        }
        for (var i = 0; i < getSubMenus.length; i++) {
            var getNavLinks = getSubMenus[i].querySelectorAll('a');
            for (var j = 0; j < getNavLinks.length; j++) {
                getNavLinks[j].addEventListener('click', navListClose);
            }
        }
    }
}

var w986 = window.matchMedia("(max-width: 986px)");
mediaQuery(w986);
w986.addListener(mediaQuery);

// Fixed menu
var previousPosition = window.pageYOffset;

function fixedNav() {
    var currentPosition = window.pageYOffset;
    if ((previousPosition < currentPosition) || (currentPosition <= 630)) {
        document.body.style.paddingTop = 0;
        getEntireNav.classList.remove('navigationMenu');
    } else {
        document.body.style.paddingTop = getEntireNav.offsetHeight + 'px';
        getEntireNav.classList.add('navigationMenu');
    }
    previousPosition = currentPosition;
}

window.addEventListener('scroll', fixedNav);

// Animate sections on scroll

var yearElements, eventElements, windowHeight;

function getData() {
    yearElements = document.getElementsByClassName('yearName');
    eventElements = document.getElementsByClassName('yearEvent');
    windowHeight = window.innerHeight;
    window.addEventListener('scroll', getPosition)
    window.addEventListener('resize', getData)
}
var getPosition = function () {
    for (var i = 0; i < yearElements.length; i++) {
        var topCoordinate = yearElements[i].getBoundingClientRect().top;
        if (topCoordinate - windowHeight <= 0) {
            yearElements[i].classList.add('animateYearName');
            yearElements[i].nextElementSibling.classList.add('animateYearEvent');
        } else {
            yearElements[i].classList.remove('animateYearName');
            yearElements[i].nextElementSibling.classList.remove('animateYearEvent');
        }
    }
}

getData();