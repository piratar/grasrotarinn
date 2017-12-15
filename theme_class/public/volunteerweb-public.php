<?php
/**
 * ThemePublic class setup public hooks
 *
 * @since 1.0.0
 * @package VolunteerWeb
 * @subpackage VolunteerWeb/public
 */
class VolunteerWebPublic {

    /**
     * @var {String} $version
     * @access private
     */
    private $version;

    /**
     * Class construct setup version
     *
     * @since 1.0.0
     * @access public
     * @param {String}  theme version
     */
    function __construct( $ver ) {

        $this->version = $ver;

    }

    /**
     * Setup data for Task Filter default state
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function setup_filter_list_data() {
        // get data
        $term_filters_data = $this->get_term_filters();
        $data = array(
            'tasks' => $this->get_tasks(),
            'filters' => $term_filters_data['filters'],
            'parent_filters' => $term_filters_data['parent_filters']
        );
        // expose and prepare data
        global $task_filter_data;
        $task_filter_data = json_encode( $data );
    }

    /**
     * Get list of Tasks for Task Filter purposes
     *
     * @since 1.0.0
     * @access private
     * @param no params
     * @return {Array} $tasks list of formatted tasks
     */
    private function get_tasks() {
        // include language list
        get_template_part( 'theme_class/core/languages' );

        global $language_codes;

        $tasks = array();

        // Custom query
        $args = array(
            'numberposts'    => -1,
            'post_type'      => 'task',
            'meta_query'     => array(
                array(
                    'key'    => 'is_active',
                    'value'  => true
                )
            )
        );
        $task_list = get_posts( $args );

        foreach ( $task_list as $task_item ) {

            // initialize array for current task in the loop
            $task = array();
            $task_id = $task_item->ID;

            // get title, permalink, language of task, language skills and hours per week
            $task['title'] = $task_item->post_title;
            $task['link'] = get_post_permalink( $task_id );
            $task_language_code = get_post_meta( $task_id, 'task_language', true );
            if ( $task_language_code ) { $task['task_language'] = $language_codes[$task_language_code]; };
            $task['language_skills'] = array();
            $task_language_skills_codes = get_post_meta( $task_id, 'language_skills', true );
            if ( $task_language_skills_codes ) {
                foreach ( $task_language_skills_codes as $task_language_skills_code ) { $task['language_skills'] []= $language_codes[$task_language_skills_code]; }
            }
            $task['hours_per_week'] = get_field( 'estimated_hoursweek', $task_id );
            $task['all_terms'] = array();
            // setup task terms by taxonomies
            $task_terms_by_taxonomies = array(
                'task_category' => array(  ),
                'division' => array(  ),
                'skill' => array(  )
            );
            $task_terms = wp_get_post_terms( $task_id, array( 'task_category', 'division', 'skill' ) );
            foreach ( $task_terms as $term ) {
                // if it's category and only if non category has been assigned (to prevent more then one category to show in filters)
                // @TODO: check if previous condition should be implemented
                if ( $term->taxonomy == 'task_category' ) {
                    if ( empty( $task_terms_by_taxonomies[$term->taxonomy] ) ) {
                        $task_terms_by_taxonomies[$term->taxonomy]['name'] = $term->name;
                        $task_terms_by_taxonomies[$term->taxonomy]['icon'] = get_field( 'category_icon', $term->taxonomy . '_' . $term->term_id );
                    }
                } else {
                    $task_terms_by_taxonomies[$term->taxonomy] []= $term->name;
                }
                $task['all_terms'] []= $term->term_id;
            }
            $task['terms'] = $task_terms_by_taxonomies;
            $tasks []= $task;
        }

        return $tasks;
    }



    /**
     * Setup term filters for Task Filter
     *
     * @since 1.0.0
     * @access private
     * @param no params
     * @return {Array} $filters formatted array of terms by taxonomies for filtering purposes
     */
    private function get_term_filters() {
        // list of taxonomies task_category, division, skill
        $filters = array(
            'task_category' => array(  ),
            'division' => array(  ),
            'skill' => array(  )
        );
        // list of parent filters which will be used for collapsable filters list
        $parent_filters = array();
        // list of child taxonomies
        $child_filters = array(
            'task_category' => array(  ),
            'division' => array(  ),
            'skill' => array(  )
        );
        // get terms
        $terms = get_terms(
            array(
                'taxonomy' => array( 'task_category', 'division', 'skill' ),
                'hide_empty' => false
            )
        );

        // put each term in the right taxonomy
        // if it's child put it in child_filters
        foreach ( $terms as $term ) {
            $term_data = array(
                'id' => $term->term_id,
                'name' => $term->name
            );
            // if is tas_category get category icon
            if ( $term->taxonomy == 'task_category' ) {
                $term_data['category_icon'] = get_field( 'category_icon', $term->taxonomy . '_' . $term->term_id );
            }
            // if term has parent put it in child_filters under parent id
            if ( $term->parent ) {
                // check if there is already set array key with parent id
                if ( isset( $child_filters[$term->taxonomy][$term->parent] ) ) {
                    $child_filters[$term->taxonomy][$term->parent] []= $term_data;
                } else {
                    $child_filters[$term->taxonomy][$term->parent] = array( $term_data );
                }

            } else { // if doesn't have a parent put it in the $filters array
                $filters[$term->taxonomy][$term->term_id] = $term_data;
                // if it's division term means that it's parent filter
                if ( $term->taxonomy == 'division' ) {
                    $parent_filters[$term->term_id] = array( 'collapsed' => true );
                }
            }

        }

        // add each elem of the child filter's to it's respective parent
        foreach ( $child_filters as $taxonomy_name => $taxonomy_filters ) {
            foreach ( $taxonomy_filters as $parent_id => $child_filter ) {
                $filters[$taxonomy_name][$parent_id]['children'] = $child_filter;
            }
        }

        // remove keys from parent filters to match the format of children
        foreach ( $filters as $taxonomy_name => $filter ) {
            $filters[$taxonomy_name] = array_values( $filters[$taxonomy_name] );
        }

        return array(
            'filters' => $filters,
            'parent_filters' => $parent_filters
        );
    }

    /**
     * Add user info to Timber context
     *
     * @since 1.0.0
     * @access private
     * @return {Array|Bool} user info array on success false if user isn't logged in
     */
    private function get_user_info() {
        // if logged in user is not volunteer return false
        if ( !current_user_can( 'volunteer' ) ) {
            return false;
        }
        // get current logged in user if any
        $current_user = wp_get_current_user();
        // check if there is logged in user and get info or return false
        if ( $current_user instanceof WP_USER ) {
            // get user meta
            $applied_tasks = get_user_meta( $current_user->ID, 'applied_tasks', true );
            $user_info = array(
                'id' => $current_user->ID,
                'name' => $current_user->user_login,
                'appliedTasks' => $applied_tasks ? $applied_tasks : []
            );
        } else {
            return false;
        }
        // return result
        return $user_info;
    }

    /**
     * Enque fronend styles and scripts
     *
     * @since 1.0.0
     * @access public
     */
    function enque_styles_and_scripts() {

        // Load styles
        wp_enqueue_style( 'volunteerweb-style', get_stylesheet_uri() );
        // Load fonts
        wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900' );
        // Load scripts
        wp_enqueue_script( 'velocityJS', 'https://cdnjs.cloudflare.com/ajax/libs/velocity/1.3.2/velocity.min.js', array('jquery'), '1.3.2', true );

    	wp_enqueue_script( 'volunteerweb-main-scripts', get_template_directory_uri() . '/assets/js/main.js', array( 'jquery' ), $this->version, true );

        wp_localize_script( 'volunteerweb-main-scripts', 'volunteerWeb', array(
                    'userInfo' => $this->get_user_info(),
                    'nonce'     => wp_create_nonce( 'wp_rest' ),
                    'login'       =>  rest_url( 'volunteerweb/v1/login' ),
                    'logout'       =>  rest_url( 'volunteerweb/v1/logout' ),
                    'register'       =>  rest_url( 'volunteerweb/v1/register' ),
                    'home'      => rest_url( '/volunteerweb/v1/' ),
                    'lostpassword'      => rest_url( '/volunteerweb/v1/lostpassword' ),
                    'applyfortask'      => rest_url( '/volunteerweb/v1/applyfortask' )
            ) );

        // recaptcha script
        wp_enqueue_script( 'google-recaptcha', 'https://www.google.com/recaptcha/api.js?onload=initRecaptchas&render=explicit', array( 'volunteerweb-main-scripts' ), $this->version, true );
        //
    	// wp_enqueue_script( 'theme-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), $this->version, true );
        if ( is_front_page() ) {
            wp_enqueue_script( 'volunteerweb-task-filter', get_template_directory_uri() . '/assets/js/task-filter.js', array(), $this->version, true );
            wp_enqueue_script( 'homepage', get_template_directory_uri() . '/assets/js/homepage.js', array( 'jquery' ), $this->version, true );
        }
    	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    		wp_enqueue_script( 'comment-reply' );
    	}
        if ( is_page( 'my-profile' )) {
            wp_enqueue_script( 'my-profile', get_template_directory_uri() . '/assets/js/volunteer-profile.js', array( 'jquery' ), $this->version, true );

        }

    }

    /**
     * Setup hooks for all core setup
     *
     * @since 1.0.0
     * @access public
     */
    function setup_hooks() {

        add_action( 'wp_enqueue_scripts', array( $this, 'enque_styles_and_scripts' ) );

        add_action( 'init', array( $this, 'setup_filter_list_data' ) );

    }

}

 ?>
