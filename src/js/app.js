function getTransform(obj) {
    var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform") ||
        obj.css("-ms-transform") ||
        obj.css("-o-transform") ||
        obj.css("transform"),
        angle,
        x,
        y;

    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];

        angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

        x = parseFloat(values[4]);
        y = parseFloat(values[5]);

    } else {
        angle = 0;
        x = 0;
        y = 0;
    }

    return {
        angle: angle,
        x: x,
        y: y
    };
}

//Animation background

function translate(param) {
    var jQuerywrap = jQuery(param.objectsParrent),
        wrapW = jQuerywrap.innerWidth(),
        wrapH = jQuerywrap.innerHeight(),
        CenterX = wrapW / 2,
        CenterY = wrapH / 2;

    jQuery(window).resize(function () {
        param.objects.forEach(function (el) {
            jQuery(el.selector).each(function () {
                jQuery(this).css({
                    'transform': 'none',
                    'transition': 'none'
                });
            });
        });
    });

    function init(x, y) {
        param.objects.forEach(function (el) {
            jQuery(el.selector).each(function () {
                if (window.matchMedia('(min-width: ' + param.mediaTo + 'px)').matches) {
                    translateX = el.maxTranslate * x;
                    translateY = el.maxTranslate * y;

                    jQuery(this).css({
                        'transform': 'translate(' + translateX + 'px, ' + translateY + 'px)',
                        'transition': '.1s'
                    });
                } else {
                    jQuery(this).css({
                        'transform': 'none',
                        'transition': 'none'
                    });
                }
            });
        });
    }

    init(0, 0);

    jQuerywrap.on('mousemove', function (el) {
        var cursorX = el.clientX,
            cursorY = el.clientY,
            x = -(cursorX - CenterX) / CenterX,
            y = -(cursorY - CenterY) / CenterY;
        init(x, y);
    });
}

//Fixed object

function fixPosition(parrentObject, object, offsetTop, offsetBottom) {
    var jQueryobject = jQuery(object),
        jQueryparrentObject = jQuery(parrentObject),
        objOffsetY = jQueryobject.position().top,
        // objOffsetX,
        objHeight,
        objWidth,
        pObjOffsetY,
        pObjHeight,
        scrollHeight,
        startFixed,
        endFixed;

    function computedVars() {
        // objOffsetX = jQueryobject.offset().left;
        objHeight = jQueryobject.outerHeight();
        objWidth = jQueryobject.outerWidth();
        pObjOffsetY = jQueryparrentObject.offset().top;
        pObjHeight = jQueryparrentObject.outerHeight();
        scrollHeight = jQuery(window).scrollTop() + offsetTop;
        startFixed = pObjOffsetY + objOffsetY;
        endFixed = pObjOffsetY + pObjHeight - objHeight - offsetBottom;
    }

    function fixPositionInit() {
        if (window.matchMedia('(min-width: 992px)').matches) {
            computedVars();

            if (scrollHeight > startFixed && scrollHeight < endFixed) {
                jQueryobject.attr('style', '');
                jQueryobject.css({
                    'position': 'relative',
                    'top': scrollHeight - pObjOffsetY - objOffsetY + 'px'
                });
            } else if (scrollHeight > endFixed) {
                jQueryobject.attr('style', '');
                jQueryobject.css({
                    'position': 'relative',
                    'top': pObjHeight - objOffsetY - objHeight - offsetBottom + 'px'
                });
            }
        } else {
            jQueryobject.attr('style', '');
        }
    }

    jQuery(window).load(function () {
        fixPositionInit();
    });

    jQuery(window).resize(function () {
        fixPositionInit();
    });

    jQuery(window).scroll(function () {
        if (window.matchMedia('(min-width: 992px)').matches) {
            computedVars();

            if (scrollHeight > startFixed && scrollHeight < endFixed) {
                jQueryobject.attr('style', '');
                jQueryobject.css({
                    'position': 'fixed',
                    'top': offsetTop + 'px',
                    // 'left' : objOffsetX + 'px',
                    'width': objWidth + 'px'
                });
            } else if (scrollHeight >= endFixed) {
                jQueryobject.attr('style', '');
                jQueryobject.css({
                    'position': 'relative',
                    'top': pObjHeight - objOffsetY - objHeight - offsetBottom + 'px'
                });
            } else if (scrollHeight <= startFixed) {
                jQueryobject.attr('style', '');
                jQueryobject.css({
                    'position': 'relative',
                    'top': 0 + 'px'
                });
            }
        } else {
            jQueryobject.attr('style', '');
        }
    });
}

jQuery(document).ready(function () {
    //Header nav

    /*
    if (jQuery('body').hasClass('index') === true) {
        jQuery(window).scroll(function () {
            if (jQuery(window).scrollTop() > 0) {
                jQuery('header').addClass('header_lighten');
            } else {
                jQuery('header').removeClass('header_lighten');
            }
        });
    }
    */

    jQuery('body:not(.get_estimation) header').hover(function () {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            jQuery('body').css('overflow-y', 'hidden');
        }
    }, function () {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            jQuery('body').css('overflow-y', 'auto');
        }
    });

    jQuery('header .hamburger_menu').click(function () {
        if (jQuery(this).hasClass('is-active')) {
            jQuery(this).removeClass('is-active');
            if (jQuery(window).scrollTop() === 0) {
                jQuery('header').removeClass('header_lighten');
            }
            jQuery('body').css('overflow-y', 'auto');
        } else {
            jQuery(this).addClass('is-active');
            jQuery('header').addClass('header_lighten');
            jQuery('body').css('overflow-y', 'hidden');
        }
    });

    jQuery('body.career .photo_item').focus(function () {
        jQuery('body').css('overflow-y', 'hidden');
    }).focusout(function () {
        jQuery('body').css('overflow-y', 'auto');
    });

    jQuery('header nav li.drop_down').hover(function () {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            jQuery('header .menu_l1 > *').removeClass('menu_l1-active');
            jQuery('header .menu_l2 > *').removeClass('menu_l2-active');

            jQuery('header .menu_l2').css('height', jQuery('header .menu_l2 > *:first-child').height() + 'px');
            jQuery('header .menu_l1 > a:first-child').addClass('menu_l1-active');
            jQuery('header .menu_l2 > *:first-child').addClass('menu_l2-active');

            jQuery('.overlay').toggleClass('show');
        }
    }, function () {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            jQuery('.overlay').toggleClass('show');
        }
    });

    jQuery('header .menu_l1 > a').mouseover(function () {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            jQuery('header .menu_l1 > *').removeClass('menu_l1-active');
            jQuery('header .menu_l2 > *').removeClass('menu_l2-active');

            var eNumber = jQuery(jQuery(this)).index() + 1,
                eHeight = jQuery('header .menu_l2 > *:nth-child(' + eNumber + ')').height();

            jQuery(jQuery(this)).addClass('menu_l1-active');
            jQuery('header .menu_l2').css('height', eHeight + 'px');
            jQuery('header .menu_l2 > *:nth-child(' + eNumber + ')').addClass('menu_l2-active');
        }
    });

    jQuery(window).resize(function () {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            jQuery('header .menu_l2').css('height', jQuery('.menu_l2-active').height() + 'px');
        }
    });
});
