require(['./../js/require.config.js'], function () {
    "use strict"
    require(['jquery', 'swiper'], function($, Swiper) {
        navMouseover($)
        initSwiper($, Swiper)
    })
})
function navMouseover($) {
    $('nav.wrap li').on('mouseover', function () {
        $(this).find('span.iconfont').addClass('turn-up-down')
    }).on('mouseout', function () {
        $(this).find('span.iconfont').removeClass('turn-up-down')
    })
}

function initSwiper($, Swiper) {
    // var Swiper = require('./../swiper/swiper.min')
    var swiper = new Swiper('.swiper-container', { loop: true, autoplay: true })
}