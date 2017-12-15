/*******************
* Homepage scripts *
*******************/

import imgToBackground from '../common/img-to-background';

const imgToBg = imgToBackground( jQuery );

/********************
* Page loaded calls *
********************/


jQuery( window ).load( ( $ ) => {

    jQuery( function( $ ) {

    imgToBg.makeImgBackground( '.js-hero-image', '.js-hero-section-background' );
    imgToBg.makeImgBackground( '.js-about-image', '.js-about-background' );

    let numOfTasks = jQuery('.task-preview').length;
    $('.js-tasks-number').append(numOfTasks);



    });

});

jQuery( function( $ ) {

    $('.js-filter-scroll').on('click', function() {
        $('html, body').animate({
            scrollTop: $('.task-list').offset().top
        },
        'slow' );
    });

});
