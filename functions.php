<?php
// require autoloader
require __DIR__ . '/vendor/autoload.php';

// import JWT library
use Firebase\JWT\JWT;

// Check if Timber plugin is present
if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});

	add_filter( 'template_include', function( $template ) {
		return get_stylesheet_directory() . '/assets/no-timber.html';
	});

	return;
}

// Locations for Twig templates
Timber::$dirname = array( 'templates', 'templates/components' );

// Theme theme main class
require get_template_directory() . '/theme_class/volunteerweb-class.php';
require get_template_directory() . '/theme_class/core/volunteerweb-core.php';
require get_template_directory() . '/theme_class/core/meta-boxes.php';
require get_template_directory() . '/theme_class/public/volunteerweb-public.php';
require get_template_directory() . '/theme_class/admin/volunteerweb-admin.php';
require get_template_directory() . '/theme_class/admin/custom-admin-columns.php';

// define secret key for JWT auth purposes
define( "JWT_KEY", "zVmNNSA;{GF50@^nTI|u Vwf!.H<cR%LcAI2UxQ=OhJb+U[yK#iI7//Vi;a(`vq7')" );

// Init setup
$volunteerweb = new VolunteerWeb(
	new VolunteerWebCore( new Meta_Boxes(), new JWT() ),
	new VolunteerWebPublic( '1.0.0' ),
	new VolunteerWebAdmin( new Custom_Admin_Columns() )
);
$volunteerweb->setup();
