/* globals Pace */
/* jshint unused:false */
/* App specific Javascript */

$(document).ready(function() {
	var newLocation;

	function newpage() {
        window.location = newLocation;
    }

    // Use pace to fade in page content after load and fade out before leaving pages.
    Pace.on('start', function() {
        $('.module').css({
            'margin-top': '2em'
        });
    });
    Pace.on('done', function() {
        console.log("Site Loaded!");
        $('.pace-progress').addClass('pace-done');
        $('.module').css({
            'margin-top': '0'
        });
        $('#pace-cover').fadeOut(250, function() {});
    });

    $('a').each(function() {
        var anchor = new RegExp('/' + window.location.host + '/');
        if (!anchor.test(this.href)) {
            $(this).addClass('external-link').attr('target', '_blank');
        } else {
            $(this).addClass('internal-link');
        }
    });

    $('a.internal-link:not([href^="#"])').click(function() {
        event.preventDefault();
        newLocation = this.href;
        $('.module').css({
            'margin-top': '2em'
        });
        $('#pace-cover').fadeIn(250, newpage);
    });

    // Smooth Scroll on anchor click
    $('a.internal-link[href^="#"]').click(function() {
        console.log("Smooth Scroll Triggered");
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') ||
            location.hostname === this.hostname) {

            var target = $(this.hash);
            if (target) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // Mobile menu
    //Toggle mobile menu & search
    $('.mobile-nav').click(function() {
        console.log('Trigger Mobile Navigation');
        $('.primary').slideToggle(200);
    });

    //Mobile menu accordion toggle for sub pages
    $('header ul li.menu-item-has-children').append('<div class="accordion-toggle"><div class="fa fa-angle-down"></div></div>');
    $('header .accordion-toggle').click(function() {
        $(this).parent().find('> ul').slideToggle(200);
        $(this).toggleClass('toggle-background');
        $(this).find('.fa').toggleClass('toggle-rotate');
    });

    // Fade content on menu hover (but only for screens larger than 992)
    var windowWidth;
    $(window).on("load resize", function() {
        windowWidth = $(window).width();
        if (windowWidth >= 992) {
            $('.primary').show();
        } else {
            $('.primary').hide();
        }
    });
    $('.primary > .menu-item-has-children, .user-menu li:not(.mobile-nav)').on({
        mouseenter: function() {
            if (windowWidth >= 992) {
                $('.main').stop().fadeTo(".25", 0.5);
            }
        },
        mouseleave: function() {
            $('.main').stop().fadeTo(".25", 1.0);
        }
    });

    // Generate progress doughnut values
    $('.progress-doughnut').each(function() {
        var graphValue = $(this).data('value');
        $(this).find('.percent').text(graphValue + "%");

        var rotation = graphValue * 3.60;
		var leftRotation;
		var rightRotation;

        if (rotation <= 180) {
            leftRotation = 180;
            rightRotation = rotation;
            $(this).find('.p-r-cover').css('opacity', '1');
        } else if (rotation >= 180) {
            leftRotation = rotation;
            rightRotation = 0;
            $(this).find('.p-r-cover').css('opacity', '0');
            $(this).find('.p-l-cover, .p-l, .p-r').css('opacity', '1');
        }
        if (rotation > 359) {
            $(this).find('.p-l-cover, .p-r-cover, .p-l, .p-r').css('opacity', '0');
        } else if (rotation < 1) {
            $(this).find('.p-l-cover, .p-r-cover, .p-l, .p-r').css('opacity', '1');
        }
        $(this).find('.p-l-cover').css({
            'transform': 'rotate(' + leftRotation + 'deg)'
        });
        $(this).find('.p-r-cover').css({
            'transform': 'rotate(' + rightRotation + 'deg)'
        });
    });

    // Adds active class to menu for current page (Can be used in a root directory , but will need to lose the '././ +' bit)
    $('a').each(function() {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[2];
        if ($(this).attr('href') === '././' + secondLevelLocation) {
            $(this).addClass('current-page');
            $(this).closest('.menu-item-has-children').find('a').addClass('current-page');
        }
    });
});
