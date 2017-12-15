/****************************
* Navigation handler object *
****************************/

// Define animations
const containerAnimation = {
	prop: {
		translateY: [ '0%', '10%' ],
		scale: [ 1, 0.8 ],
		opacity: 1
	},
	opt: {
		duration: 200,
		display: 'block'
	}
}

const menuItemsAnimation = {
	prop: {
		opacity: [ 1, 0 ]
	}// options object will be defined inside the caller function openMenu()
	 // because of dynamic delay setting
}


/**
 * Main menu responsive handler
 *
 * @param {Object} jQuery
 *
 * @return {Object} init Initialization method
 */
function Navigation( $ ) {

	// Set up properties
	let isOpen = false,
		resetTimeout,
		$menuToggle = $( '.js-menu-toggle' ),
		$hamburgerLines = $( '.js-hamburger-lines' ),
		$menuContainer = $( '.js-menu-container' ),
		$menuItems = $( '.js-menu-item' );

	/**
	 * @private openMenu() opens menu and handles animations
	 *
	 * @param no params
	 *
	 * @return void
	 *
	 * @todo implement preventing scroll while menu is open
	 */
	function openMenu() {

		$menuContainer.velocity(containerAnimation.prop, containerAnimation.opt);
		$menuItems.each( ( index, el ) => {

			$( el ).velocity( menuItemsAnimation.prop, { duration: 200, delay: 200 + ( index * 50 ) } );

		});
		isOpen = true;
		$('body').addClass( 'no-scroll' );
		$hamburgerLines.addClass( 'is-open' );

	}

	/**
	 * @private closeMenu() closes menu and handles fade out animations
	 *
	 * @param no params
	 *
	 * @return void
	 */
	function closeMenu() {

		$menuContainer.velocity( 'reverse', { display: 'none' } );
		$menuItems.velocity( 'reverse' );
		$hamburgerLines.removeClass( 'is-open' );
		isOpen = false;
		$('body').removeClass('no-scroll');

	}

	/**
	 * @private reset() resets the state if user resize window
	 *
	 * @param no params
	 *
	 * @return void
	 */
	 function reset() {

		 if ( $( window ).width() > 1199 ) {

 		   $menuContainer.removeAttr( 'style' );
 		   $menuItems.removeAttr( 'style' );
 		   $menuToggle.removeClass( 'is-open' );
		   isOpen = false;

 		}

	 }

	/**
	 * @private onResizeReset() debounces calls for reset() method
	 *
	 * @param no params
	 *
	 * @return void
	 */
	 function onResize() {

		 clearTimeout( resetTimeout );

		 resetTimeout = setTimeout( reset, 300 );

	 }

	/**
	 * @public Initialization method, sets up event handlers
	 *
	 * @param no params
	 *
	 * @return void
	 */
	 function init() {

	 	// Attach event handler on hamburger button
	 	$menuToggle.on( 'click', ( e ) => {

			// If menu is open call openMenu() otherwise call closeMenu()
			if ( !isOpen ) {

				openMenu();

			} else {

				closeMenu();

			}

		});

		// Attach event handler for window resize
		$( window ).on( 'resize', ( e ) => {

			onResize();

		});

	 }

	return {
		init
	}

}

export default Navigation;
