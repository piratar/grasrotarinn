/***************************
* Img to Background module *
***************************/

/**
 * Img to Background module
 *
 * Get all images with provided selector
 * and set them as background on their parent element
 * @param {Object} jQuery
 */
function imgToBackground( $ ) {

    /**
     * Set background pictures from img elements
     *
     * @since 1.0.0
     * @access public
     * @param {String} imgSelector css selector for images
     * @param {String} parentSelector css selector for prent element
     */
    function makeImgBackground( imgSelector, parentSelector ) {

        // Get all images based on provided selector
        const $images = $( imgSelector );

        // For each image select currentSrc prop and set it as parent background
        // and then hide original image
        $images.each( ( index, image ) => {

            // Get current image
            const $image = $( image );
            // Set parent element background-image to be current image currentSrc
            $image.parent( parentSelector ).css( 'background-image', `url( ${$image.prop( 'currentSrc' )} )` );
            // Hide original image from page
            $image.hide();

        });

    }

    return {
        makeImgBackground
    };

}

export default imgToBackground;
