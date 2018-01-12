<?php
//import JWT auth library
// use Firebase\JWT\JWT;

/**
 * VolunteerWebCore class setup theme support and other core stuff
 *
 * @since 1.0.0
 * @package VolunteerWeb
 * @subpackage VolunteerWeb/core
 */
class VolunteerWebCore extends TimberSite {

    /**
     * Class constructor / call parent constructor
     *
     * @param {Object} $Meta_Boxes instance of Meta_boxes class
     * @param {Object}   JWT auth class instance / implementation JSON Web Token auth for PHP
     */
    function __construct( $Meta_Boxes, $JWT ) {

        parent::__construct();

        $this->meta_boxes = $Meta_Boxes;
        $this->JWT = $JWT;
        $this->fun = null;

        $this->meta_options = array(
            array(
                'type' => 'wp_editor',
                'name' => 'description',
                'display_name' => 'Description',
                'field_name' => 'divisiondescription',
                'screen' => 'division',
                'context' => 'normal',
                'priority' => 'high',
                'callback_args' => null,
            ),
            array(
                'type' => 'input_text',
                'name' => 'say_somethin',
                'display_name' => 'Say Something',
                'field_name' => 'saysomething',
                'screen' => 'division',
                'context' => 'normal',
                'priority' => 'high',
                'callback_args' => null,
            ),
            array(
                'type' => 'add_managers',
                'name' => 'add_managers',
                'display_name' => 'Add Managers',
                'field_name' => 'addmanagers',
                'screen' => 'division',
                'context' => 'normal',
                'priority' => 'high',
                'callback_args' => null,
            ),
            array(
                'type' => 'add_task_language',
                'name' => 'task_language',
                'display_name' => 'Add Task Language',
                'field_name' => 'addtasklanguage',
                'screen' => 'task',
                'context' => 'side',
                'priority' => 'low',
                'callback_args' => null,
            ),
            array(
                'type' => 'add_language_skills',
                // 'name' => 'add_language_skills',
                'name' => 'language_skills',
                'display_name' => 'Add Language Skills',
                'field_name' => 'addlanguageskills',
                'screen' => 'task',
                'context' => 'side',
                'priority' => 'low',
                'callback_args' => null,
            ),
            array(
                'type' => 'task_name',
                'name' => 'task_id',
                'display_name' => 'Task Name',
                'field_name' => '',
                'screen' => 'application',
                'context' => 'normal',
                'priority' => 'low',
                'callback_args' => null,
            ),
            array(
                'type' => 'user_info',
                'name' => 'user_id',
                'display_name' => 'User Info',
                'field_name' => '',
                'screen' => 'application',
                'context' => 'normal',
                'priority' => 'low',
                'callback_args' => null,
            ),
            array(
                'type' => 'application_status',
                'name' => 'application_status',
                'display_name' => 'Application Status',
                'field_name' => 'applicationstatus',
                'screen' => 'application',
                'context' => 'normal',
                'priority' => 'low',
                'callback_args' => null,
            ),


        );

        $this->meta_boxes->setup_meta_boxes_data( $this->meta_options );

    }

    /**
     * Add theme support for default functionalities
     *
     * @since 1.0.0
     * @access public
     */

    function add_theme_support() {
    	/*
    	 * Make theme available for translation.
    	 * Translations can be filed in the /languages/ directory.
    	 * If you're building a theme based on Akademia, use a find and replace
    	 * to change 'akademia' to the name of your theme in all the template files.
    	 */
    	load_theme_textdomain( 'volunteerweb', get_template_directory() . '/languages' );

    	// Add default posts and comments RSS feed links to head.
    	add_theme_support( 'automatic-feed-links' );

    	/*
    	 * Let WordPress manage the document title.
    	 * By adding theme support, we declare that this theme does not use a
    	 * hard-coded <title> tag in the document head, and expect WordPress to
    	 * provide it for us.
    	 */
    	add_theme_support( 'title-tag' );

    	/*
    	 * Enable support for Post Thumbnails on posts and pages.
    	 *
    	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
    	 */
    	add_theme_support( 'post-thumbnails' );

    	// Registe menus
    	register_nav_menus( array(
    		'main_menu' => esc_html__( 'Main Menu', 'volunteerweb' ),
            'footer_menu' => esc_html__( 'Footer Menu', 'volunteerweb' ),

    	) );

    	/*
    	 * Switch default core markup for search form, comment form, and comments
    	 * to output valid HTML5.
    	 */
    	add_theme_support( 'html5', array(
    		'search-form',
    		'comment-form',
    		'comment-list',
    		'gallery',
    		'caption',
    	) );

    	// Set up the WordPress core custom background feature.
    	add_theme_support( 'custom-background', apply_filters( 'theme_custom_background_args', array(
    		'default-color' => 'ffffff',
    		'default-image' => '',
    	) ) );

        /**
         * Set proper picture sizes for responsive use accross site
         */
        update_option( 'medium_size_w', 400 );
        update_option( 'medium_size_h', 225 );
        update_option( 'medium_large_size_w', 800 );
        update_option( 'medium_large_size_h', 800 );
        update_option( 'large_size_w', 1440 );
        update_option( 'large_size_h', 810 );

    }

    /**
     * Setup user roles and capabilities
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function setup_user_roles() {
        $roles_to_remove = array( 'subscriber', 'contributor', 'author', 'editor', 'division_manager', 'volunteer', 'admin' );

        foreach ( $roles_to_remove as $role ) {
            remove_role( $role );
        }

        $roles_to_add = array(
            array(
                'name' => 'admin',
                'display_name' => 'Admin',
                'capabilities' => array( 'delete_app' => true,  'edit_apps' => true, 'edit_others_apps' => true, 'read_apps' => true, 'read_private_apps' => true, 'edit_app' => true, 'publish_tasks' => true, 'edit_tasks' => true, 'manage_categories' => true, 'edit_posts' => true, 'edit_published_posts' => true, 'read' => true, 'delete_posts' => true, 'publish_posts' => true, 'list_users' => true, 'create_users' => true, 'promote_users' => true )
            ),
            array(
                'name' => 'division_manager',
                'display_name' => 'Division Manager',
                'capabilities' => array( 'edit_apps' => true, 'edit_others_apps' => true, 'read_apps' => true, 'read_private_apps' => true, 'edit_app' => true,  'edit_division' => true, 'read' => true )

            ),
            array(
                'name' => 'volunteer',
                'display_name' => 'Volunteer',
                'capabilities' => array( 'read' => false, 'apply_for_tasks' => true )
            )
        );

        foreach ( $roles_to_add as $role ) {
            add_role( $role['name'], $role['display_name'], $role['capabilities'] );
        }

        $admin = get_role( 'administrator' );
        $admin->add_cap( 'read_app', true );
        $admin->add_cap( 'edit_app', true );
        $admin->add_cap( 'delete_app', true );
        $admin->add_cap( 'edit_apps', true );
        $admin->add_cap( 'edit_others_apps', true );
        $admin->add_cap( 'publish_apps', true );
        //
        // $admin->remove_cap( 'edit_divisions' );
    }

    /**
     * Initialize widgets area
     *
     * @since 1.0.0
     * @access public
     */
     function widgets_init() {

     	register_sidebar( array(
     		'name'          => esc_html__( 'Sidebar', 'volunteerweb' ),
     		'id'            => 'sidebar-1',
     		'description'   => esc_html__( 'Add widgets here.', 'volunteerweb' ),
     		'before_widget' => '<section id="%1$s" class="widget %2$s">',
     		'after_widget'  => '</section>',
     		'before_title'  => '<h2 class="widget-title">',
     		'after_title'   => '</h2>',
     	) );

     }

    /**
     * Register custom post type Division
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function register_custom_post_types() {

        ### Task custom post type ###
        $labels = array(
                'name'               => 'Verk',
                'singular_name'      => 'Task',
                'menu_name'          => 'Verk',
                'name_admin_bar'     => 'Task',
                'add_new'            => 'Bæta við',
                'add_new_item'       => 'Nýtt verk',
                'new_item'           => 'New Task',
                'edit_item'          => 'Breyta Verk',
                'view_item'          => 'View Task',
                'all_items'          => 'Allar Verk',
                'search_items'       => 'Search Tasks',
                'parent_item_colon'  => 'Parent Tasks:',
                'not_found'          => 'No reviews found.',
                'not_found_in_trash' => 'No reviews found in Trash.',
            );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'tasks' ),
            'capability_type'      => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 5,
            'menu_icon'          => 'dashicons-star-half',
            'supports'           => array( 'title' ),
            'taxonomies'         => array( 'task_category', 'division', 'skill' )
        );

        register_post_type( 'task', $args );

        ### Application custom post type ###
        $labels = array(
            'name'               => 'Umsóknir',
            'singular_name'      => 'Application',
            'menu_name'          => 'Umsóknir',
            'name_admin_bar'     => 'Application',
            'add_new'            => 'Bæta við',
            'add_new_item'       => 'Bæta við umsókn',
            'new_item'           => 'New Application',
            'edit_item'          => 'Edit Application',
            'view_item'          => 'View Application',
            'all_items'          => 'Allar umsóknir',
            'search_items'       => 'Search Applications',
            'parent_item_colon'  => 'Parent Applications:',
            'not_found'          => 'No applications found.',
            'not_found_in_trash' => 'No applications found in Trash.',
        );

        $args = array(
            'labels'               => $labels,
            'public'               => false,
            'show_ui'              => true,
            'query_var'            => false,
            'rewrite'              => array( 'slug' => 'applications' ),
            'capability_type'      => 'app',
            'capabilities' => array(

                'edit_post'             => 'edit_app',
                'read_post'             => 'read_app',
                'delete_post'           => 'delete_app',
                'delete_posts'          => 'delete_apps',
                'edit_posts'            => 'edit_apps',
                'edit_others_posts'     => 'edit_others_apps',
                'publish_posts'         => 'publish_apps',
                'read_private_posts'    => 'read_private_apps',

			),
            'has_archive'          => false,
            'hierarchical'         => false,
            'publicaly_queryable'  => false,
            'menu_position'        => 6,
            'menu_icon'            => 'dashicons-clipboard',
            'supports'             => array( '' ),
        );

        register_post_type( 'application', $args );

    }

    /**
     * Register custom taxonomies
     *
     * @since 1.0.0
     * @access public
     * @param
     * @return
     */
    function register_custom_taxonomies() {

        ### Task Category custom taxonomy ###
        $labels = array(
                'name'              => 'Málefni',
                'singular_name'     => 'Category',
                'search_items'      => 'Search Categories',
                'all_items'         => 'All Categories',
                'parent_item'       => 'Parent Category',
                'parent_item_colon' => 'Parent Category:',
                'edit_item'         => 'Edit Category',
                'update_item'       => 'Update Category',
                'add_new_item'      => 'Add New Category',
                'new_item_name'     => 'New Category Name',
                'menu_name'         => 'Málefni'
            );

            $args = array(
                'hierarchical'        => true,
                'labels'              => $labels,
                'public'              => true,
                'publicly_queryable'  => false,
                'show_in_nav_menus'   => false,
                'show_admin_column'   => true
            );

        register_taxonomy( 'task_category', array( 'task' ), $args );

        register_taxonomy_for_object_type( 'task_category', 'task' );

        ### Division custom taxonomy ###
        $labels = array(
                'name'              => 'Hópur',
                'singular_name'     => 'Division',
                'search_items'      => 'Search Divisions',
                'all_items'         => 'All Divisions',
                'parent_item'       => 'Parent Division',
                'parent_item_colon' => 'Parent Division:',
                'edit_item'         => 'Edit Division',
                'update_item'       => 'Update Division',
                'add_new_item'      => 'Add New Division',
                'new_item_name'     => 'New Division Name',
                'menu_name'         => 'Hópur'
            );

            $args = array(
                'hierarchical'        => true,
                'labels'              => $labels,
                'public'              => true,
                'publicly_queryable'  => false,
                'show_in_nav_menus'   => false,
                'show_admin_column'   => true
            );

        register_taxonomy( 'division', array( 'task' ), $args );

        register_taxonomy_for_object_type( 'division', 'task' );

        ### Skill custom taxonomy ###
        $labels = array(
                'name'              => 'Verk',
                'singular_name'     => 'Skill',
                'search_items'      => 'Search Skills',
                'all_items'         => 'All Skills',
                'parent_item'       => 'Parent Skill',
                'parent_item_colon' => 'Parent Skill:',
                'edit_item'         => 'Edit Skill',
                'update_item'       => 'Update Skill',
                'add_new_item'      => 'Add New Skill',
                'new_item_name'     => 'New Skill Name',
                'menu_name'         => 'Verk'
            );

            $args = array(
                'hierarchical'        => true,
                'labels'              => $labels,
                'public'              => true,
                'publicly_queryable'  => false,
                'show_in_nav_menus'   => false,
                'show_admin_column'   => true
            );

        register_taxonomy( 'skill', array( 'task' ), $args );

        register_taxonomy_for_object_type( 'skill', 'task' );
    }

    /**
     * Call setup_render_hooks() on instance of Meta_boxes
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function setup_meta_boxes_render() {
        $this->meta_boxes->setup_render_hooks();
    }

    /**
     * Call setup_save_hooks() on instance of Meta_boxes
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function setup_meta_boxes_save() {
        $this->meta_boxes->setup_save_hooks();
    }

    /**
    * Responsive images support helper method
    *
    * @since 1.0.0
    * @access public
    * @param {String} $image_id id of the image from media library
    * @param {String} $image_size image size from wp image sizes
    * @param {String} $elem_attr attribute to be added on inserted img element
    */
    function show_image( $image_id, $image_size, $elem_attr = null ) {

        echo wp_get_attachment_image( $image_id, $image_size, false, $elem_attr );

    }

    /**
    * Responsive images URL helper method
    *
    * @since 1.0.0
    * @access public
    * @param {String} $image_id id of the image from media library
    * @param {String} $image_size image size from wp image sizes
    */
    function image_url( $image_id, $image_size ) {

        return wp_get_attachment_image_url( $image_id, $image_size );

    }

    /**
     * Add rewrite for single task path to be redirected to React Module on homepage
     *
     * @since 1.0.0
     * @access public
     * @param
     * @return
     */
    function add_tasks_rewrite() {
        add_rewrite_rule( '^tasks/(.*)', 'index.php?page_id=72&task=$matches[1]', 'top' );
        add_rewrite_tag( '%task%', '([^&]+)' );
    }

    /**
     * Add filter to prevent redirect when we're doing redirect from tasks to homepage for Task Filter purposes
     *
     * @since 1.0.0
     * @access public
     * @param {Boolean} p
     * @return {Boolean} p
     */
    function filter_homepage_redirect( $redirect ) {
        if ( is_page() && $front_page = get_option( 'page_on_front' ) ) {
        if ( is_page( $front_page ) )
            $redirect = false;
        }

        return $redirect;
    }

    /**
    * Check if there is reCatcha answer provided and verify it
    *
    * @since 1.0.0
    * @access private
    * @param {String} $recaptcha_token
    * @return {Bool}
    */
    private function check_recaptcha( $recaptcha_token ) {

        // prepare reCaptcha data
        $recaptcha_data = [
            'secret' => '6LftfzUUAAAAAEF07u657yXr8V0TCmbkuSe07ClX',
            'response' => $recaptcha_token
        ];
        $recaptcha_data = http_build_query( $recaptcha_data );

        $context_opts = [
            'http' => [
                'method' => 'POST',
                'content' => $recaptcha_data,
                'timeout' => 10
            ]
        ];
        $context = stream_context_create( $context_opts );

        // send request to google server
        $recaptcha_response = @file_get_contents( 'https://www.google.com/recaptcha/api/siteverify', false, $context );

        // if something goes wrong with request throw error
        if ( $recaptcha_response === false ) {

            return false;
        }
        $response_obj = json_decode( $recaptcha_response );
        if ( !isset( $response_obj->success ) || $response_obj->success !== true ) {

            return false;
        }
        // all good - reCaptcha answer is verified
        return true;
    }

    /**
     * Handle user login
     *
     * @since 1.0.0
     * @access public
     * @param
     * @return
     */
    function user_login_handler( $data ) {

        // response data
        $response = [];
        // if user is already logged in exit;
        if ( is_user_logged_in() ) {
            $response['error'] = 'You are already logged in';
            return $response;
        }

        // check and sanitize data
        if ( !$data['username'] ) {
            $response['error'] = 'Please insert username or e-mail';

            return $response;
        } else {
            $username = sanitize_user( $data['username'] );
        }
        if ( !$data['password'] ) {
            $response['error'] = 'Please insert password';

            return $response;
        } else {
            $password = sanitize_text_field( $data['password'] );
        }

        // check if user exists
        if ( !strpos( $username, '@' ) ) {
            $user = get_user_by( 'login', $username );
        } else {
            $user = get_user_by( 'email', $username );
        }

        // username or email doesn't exist
        if ( !$user ) {
            $response['error'] = 'Username or email doesn\'t exists';

            return $response;
        }

        // check if user is admin send them to proper login
        if ( user_can( $user->ID, 'administrator' ) ) {
            $response['error'] = 'Please use admin login. Thank you';

            return $response;
        }

        // password check
        if ( !wp_check_password( $password, $user->user_pass ) ) {
            $response['error'] = 'Please check password';

            return $response;
        }

        // if there is no submitted reCaptcha answer throw error
        if ( !isset( $data['g-recaptcha-response'] ) ) {
            $response['error'] = 'You have to provide reCaptcha answer';

            return $response;
        }

        // if something goes wrong with verifying reCaptcha throw error
        if ( !$this->check_recaptcha( $data['g-recaptcha-response'] ) ) {
            $response['error'] = 'We couldn\'t verify your reCaptcha response. Please try again.';

            return $response;
        }

        // username checked, password checked, it can be logged in
        wp_set_current_user( $user->ID, $user->user_login );
        wp_set_auth_cookie( $user->ID, true );
        do_action( 'wp_login', $user->user_login );

        // create JWT with user info
        $token = array(
            "iss" => get_bloginfo( 'url' ),
            "iat" => time(),
            "data" => [
                "id" => $user->ID,
                "name" => $user->user_login,
                "role" => $user->roles[1]
            ]
        );
        $jwt = $this->JWT->encode( $token, JWT_KEY );
        // get user meta
        $applied_tasks = get_user_meta( $user->ID, 'applied_tasks', true );
        $response['user'] = array(
            'id' => $user->ID,
            'name' => $user->user_login,
            'appliedTasks' => $applied_tasks ? $applied_tasks : []
        );
        $response['jwt'] = $jwt;
        $response['error'] = false;

        return $response;
    }

    /**
     * Handle user logout
     *
     * @since 1.0.0
     * @access public
     * @param
     * @return
     */
    function user_logout_handler( $data ) {

        // response data
        $response = [];

        // log out the user
        wp_logout();
        $response['error'] = false;

        // return data
        return $response;
    }

    /**
     * Handle user login
     *
     * @since 1.0.0
     * @access public
     * @param
     * @return
     */
    function user_register_handler( $data ) {

        // data variables
        $response = [];

        if ( !$data['username'] ) {
            $response['error'] = 'Please insert your username';

            return $response;
        } else {
            $username = sanitize_text_field( $data['username'] );
        }
        if ( !$data['email'] ) {
            $response['error'] = 'Please insert e-mail';

            return $response;
        } else {
            $email = sanitize_email( $data['email'] );
        }
        if ( !$data['password'] ) {
            $response['error'] = 'Please insert password';

            return $response;
        } else {
            $password = sanitize_text_field( $data['password'] );
        }
        if ( !$data['fullname'] ) {
            $response['error'] = 'Please insert your full name';

            return $response;
        } else {
            $full_name = sanitize_text_field( $data['fullname'] );
        }
        if ( !$data['phone'] ) {
            $response['error'] = 'Please insert your telephone';

            return $response;
        } else {
            $phone = intval( $data['phone'] );
        }
        if ( !$data['aboutme'] ) {
            $response['error'] = 'Please insert something about yourself';

            return $response;
        } else {
            $about_me = sanitize_textarea_field( $data['aboutme'] );
        }

        // if there is no submitted reCaptcha answer throw error
        if ( !isset( $data['g-recaptcha-response'] ) ) {
            $response['error'] = 'You have to provide reCaptcha answer';

            return $response;
        }

        // if something goes wrong with verifying reCaptcha throw error
        if ( !$this->check_recaptcha( $data['g-recaptcha-response'] ) ) {
            $response['error'] = 'We couldn\'t verify your reCaptcha response. Please try again.';

            return $response;
        }

        // data checked and sanitized, format it for insertion
        $user_data = array(
            'user_login' => $username,
            'user_pass' => $password,
            'user_email' => $email,
            'description' => $about_me
        );
        // insert new user
        $user_id = wp_insert_user( $user_data );

        // if there was an error, get message and throw error
        if ( is_wp_error( $user_id ) ) {
            $response['error'] = $user_id->get_error_message();

            return $response;
        }
        // new user inserted, set volunteer role
        $new_volunteer = new WP_User( $user_id );
        $new_volunteer->remove_role( 'subscriber' );
        $new_volunteer->set_role( 'volunteer' );
        // store phone number
        update_user_meta( $user_id, 'phone_number', $phone );
        // log in user
        wp_set_current_user( $user_id, $username );
        wp_set_auth_cookie( $user_id, true );
        do_action( 'wp_login', $username );

        // create JWT with user info
        $token = array(
            "iss" => get_bloginfo( 'url' ),
            "iat" => time(),
            "data" => [
                "id" => $new_volunteer->ID,
                "name" => $new_volunteer->user_login,
                "role" => $new_volunteer->roles[1]
            ]
        );
        $jwt = $this->JWT->encode( $token, JWT_KEY );

        // prepare response
        $response['user'] = array(
            'id' => $new_volunteer->ID,
            'name' => $new_volunteer->user_login,
            'appliedTasks' => [],
            'role' => $new_volunteer->roles[1]
        );
        $response['jwt'] = $jwt;
        $response['error'] = false;

        return $response;
    }

    /**
     * Handler for /lostpassword endpoint
     *
     * @since 1.0.0
     * @access private
     * @param {Array} $data request data
     * @return {Array|WP_Error}
     */
    function lost_password_handler( $data ) {

        $current_user = wp_get_current_user();

        return $current_user;

    }

    /**
     * Apply for Task route handler
     *
     * @since 1.0.0
     * @access public
     * @param {Array}      request data
     * @return
     */
    function apply_for_task_handler( $data ) {
        // response data
        $response = [];

        // get request headers and extract origin fiedl from it for later use
        $headers = apache_request_headers();
        // get host info
        $host_url = get_bloginfo( 'url' );

        // check if authorization token is present
        if ( !isset( $data['jwt'] ) ) {
            // logout user for security sake
            wp_logout();
            // throw error
            $response['error'] = 'Your user session has expired, please log-in again. Thank you.';
            $response['logged_out'] = true;
            return $response;
        }
        // get auth token
         $auth = $data['jwt'];

        // decode and check token
        try {

            $token = $this->JWT->decode( $auth, JWT_KEY, [ 'HS256' ] );
            // if request didn't come from volunteerweb throw error
            if ( $token->iss !== $host_url ) {
				$response['error'] = 'you are not allowed to do this.';
                return $response;
            }
            // if token is older than 14 days, logout user and throw error
            if ( ( $token->iat + DAY_IN_SECONDS * 14 ) < time() ) {
                wp_logout();
                $response['error'] = 'Your user session has expired, please log-in again. Thank you.';
                $response['logged_out'] = true;
                return $response;
            }

        } catch ( Exception $e ) {

            $response['error'] = $e->getMessage();
            return $response;
        }
        // get user info from it
        $vol_id = $token->data->id;
        $vol_role = $token->data->role;
        // check if user is volunteer
        if ( $vol_role !== 'volunteer' ) {
            $response['error'] = 'You have to be logged in as Volunteer to be able to apply for Tasks. Log-in or create Volunteer account. Thank you.';

            return $response;
        }

        // sanitize incomnig data
        $why_me = sanitize_textarea_field( $data['whyme'] );
        // if why me field is empty return error
        if ( empty( $why_me ) ) {
            $response['error'] = 'Please provide why me info. Thanks';
            return $response;
        }

        // check that user didn't already applied for that task
        $applied_tasks = get_user_meta( $vol_id, 'applied_tasks', true );
        if ( !$applied_tasks ) $applied_tasks = [];
        if ( in_array( $data['task_id'], $applied_tasks ) ) {
            $response['error'] = 'You already applied for this task. Thank you';
            return $response;
        }

        // if there is no submitted reCaptcha answer throw error
        if ( !isset( $data['g-recaptcha-response'] ) ) {
            $response['error'] = 'You have to provide reCaptcha answer';

            return $response;
        }

        // if something goes wrong with verifying reCaptcha throw error
        if ( !$this->check_recaptcha( $data['g-recaptcha-response'] ) ) {
            $response['error'] = 'We couldn\'t verify your reCaptcha response. Please try again.';

            return $response;
        }

        // create application
        $application_args = [
            'post_type' => 'application',
            'post_status' => 'publish',
            'meta_input' => [
                'user_id' => $vol_id,
                'task_id' => (int) $data['task_id'],
                'why_me' => $why_me,
                'application_status' => 'pending'
            ]
        ];
        $application = wp_insert_post( $application_args, true );
        if ( is_wp_error( $application ) ) {
            $response['error'] = $application->get_error_message();

            return $response;
        }
        // update usermeta
        $applied_tasks[] = (int) $data['task_id'];
        update_user_meta( $vol_id, 'applied_tasks', $applied_tasks );
        // return new state
        $response['applied_tasks'] = $applied_tasks;

        return $response;
    }

    /**
     * Register rest api routes for sign-in / registration / lost password and volunteer application
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function register_volunteer_routes() {

        // base url
        $namespace = 'volunteerweb/v1';

        // login endpoint options
        $login_options = array(
            'methods'   => 'POST',
            'callback'  => array( $this, 'user_login_handler' )
        );

        // logout endpoint options
        $logout_options = array(
            'methods'   => 'POST',
            'callback'  => array( $this, 'user_logout_handler' )
        );

        // register endpoint options
        $register_options = array(
            'methods'   => 'POST',
            'callback'  => array( $this, 'user_register_handler' )
        );

        // lost password endpoint options
        $lost_password_options = array(
            'methods' => 'POST',
            'callback' => array( $this, 'lost_password_handler' )
        );

        // lost password endpoint options
        $apply_for_task = array(
            'methods' => 'POST',
            'callback' => array( $this, 'apply_for_task_handler' )
        );

        // register login route
        register_rest_route( $namespace, '/login', array( $login_options )  );
        // register logout route
        register_rest_route( $namespace, '/logout', array( $logout_options )  );
        // register user registration route
        register_rest_route( $namespace, '/register', array( $register_options )  );
        // register lost password route
        register_rest_route( $namespace, '/lostpassword', array( $lost_password_options )  );
        // register apply for task route
        register_rest_route( $namespace, '/applyfortask', array( $apply_for_task )  );
    }

    /**
     * Add user info to Timber context
     *
     * @since 1.0.0
     * @access private
     * @return {Array|Bool} user info array on success false if user isn't logged in
     */
    function get_user_info() {
        // get current logged in user if any
        $current_user = wp_get_current_user();
        // check if there is logged in user and get info or return false
        if ( $current_user instanceof WP_USER ) {
            $user_info = array(
                'id' => $current_user->ID,
                'name' => $current_user->user_login
            );
        } else {
            $user_info = false;
        }
        // return result
        return $user_info;
    }

     /**
      * Extend Timber context
      *
      * @since 1.0.0
      * @access public
      * @param {Object} $context object populated with site data
      * @return {Object} $context
      */
     function add_to_context( $context ) {
 		$context['menu'] = new TimberMenu( 'main_menu' );
        $context['footer_menu'] = new TimberMenu( 'footer_menu' );
 		$context['volunteerweb'] = $this;
        $context['user_info'] = $this->get_user_info();
 		return $context;
 	}

 	function myfoo( $text ) {
 		$text .= ' bar!';
 		return $text;
 	}

 	function add_to_twig( $twig ) {
 		/* this is where you can add your own functions to twig */
 		$twig->addExtension( new Twig_Extension_StringLoader() );
 		$twig->addFilter( 'myfoo', new Twig_SimpleFilter( 'myfoo', array( $this, 'myfoo' ) ) );
 		return $twig;
 	}

    /**
      * Allow upload of svg images
      *
      * @since 1.0.0
      * @access public
      */
    function allow_svg_upload( $mimes ) {

      $mimes['svg'] = 'image/svg+xml';

      return $mimes;

    }

    /**
     * Redirect volunteers to homepage from wp admin / wp login screens
     *
     * @since 1.0.0
     * @access public
     * @param
     * @return
     */
    function redirect_volunteers_from_admin_pages(  ) {
        if ( ( is_admin() || $GLOBALS['pagenow'] == 'wp-login.php' ) && current_user_can( 'volunteer' ) ) {
            wp_redirect( home_url() );
            exit;
        }
    }

    //Add custom field to user with Volunteer role
    function custom_user_profile_fields( ) {

        $wp_user_query = new WP_User_Query( array( 'role' => 'volunteer' ) );
        // Get the users
        $users = $wp_user_query->get_results();

        if (!empty($users)) {
            // Loop through each user
            foreach ($users as $user) {
                // var_dump( $user );die();
                // Add the meta_key and the value
                $users_meta = get_user_meta($user->ID);
                // $users_meta_number = get_user_meta($user->phone_number);
                if ( !$user->phone_number && !$user->profile_image ) {
                    // if (isset( $user->phone_number ) || isset( $user->profile_image ) ) {

                    add_user_meta($user->ID, 'phone_number', 'phone_number', false);
                    add_user_meta($user->ID, 'profile_image', get_template_directory_uri() . '/assets/img/profile-pic.jpg', false);

                }
            }
        } else {
            echo 'No users found.';
        }
    }
    //login logo URL
    function custom_loginlogo_url($url) {
        return home_url();
    }
    /**
     * Setup hooks for all core setup
     *
     * @since 1.0.0
     * @access public
     */
    function setup_hooks() {
        // Actions
        add_action( 'init', array( $this, 'setup_user_roles' ) );
        add_action( 'init', array( $this, 'register_custom_taxonomies' ) );
        add_action( 'init', array( $this, 'register_custom_post_types' ) );
        add_action( 'init', array( $this, 'setup_meta_boxes_save' ) );
        // add_action( 'init', array( $this, 'add_tasks_rewrite' ) );
        add_action( 'add_meta_boxes', array( $this, 'setup_meta_boxes_render' ) );
        add_action( 'after_setup_theme', array( $this, 'add_theme_support' ) );
        add_action( 'widgets_init', array( $this, 'widgets_init' ) );
        add_action( 'upload_mimes', array( $this, 'allow_svg_upload' ) );
        add_action( 'init', array( $this, 'custom_user_profile_fields' ) );
        // redirect volunteers from wp admin / wp login pages
        add_action( 'init', array( $this, 'redirect_volunteers_from_admin_pages' ) );

        // wp_rest_api
        add_action( 'rest_api_init', array( $this, 'register_volunteer_routes' ) );
        // save fields state
        // add_action( 'save_post', array( $this, 'save_division_description' ) );
        //Add new field to register user

        add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
        add_filter( 'login_headerurl', array( $this, 'custom_loginlogo_url' ) );
        // hide admin bar on frontend
        add_filter( 'show_admin_bar', '__return_false' );
        // hide ACF page in admin menu
        add_filter('acf/settings/show_admin', '__return_false');
        // add_filter( 'redirect_canonical', array( $this, 'filter_homepage_redirect' ) );

    }

}

 ?>
