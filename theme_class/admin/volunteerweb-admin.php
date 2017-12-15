<?php
/**
 * VolunteerWebAdmin class responsible for hooks and code in admin area of theme
 *
 * @since
 * @package
 * @subpackage
 */
class VolunteerWebAdmin {

    /**
     * Class constructor
     *
     * @param {Object} $Custom_Admin_Columns instance of Custom_Admin_Columns
     */
    function __construct( $Custom_Admin_Columns ) {

        $this->custom_admin_columns = $Custom_Admin_Columns;
    }

    /**
     * Set up admin custom columns via instance of Custom_Admin_Columns
     *
     * @since 1.0.0
     * @access public
     * @param
     * @return
     */
    function setup_admin_columns() {
        $custom_headers = array(
            'misko' => 'Biblija'
        );

        $content_callbacks = array( 'misko' => array( $this, 'output' ) );
        $columns_to_remove = array( 'author', 'date' );
        $this->custom_admin_columns->set_post_type( 'division' );
        $this->custom_admin_columns->add_headers( $custom_headers );
        $this->custom_admin_columns->add_content_to_columns( $content_callbacks );
        $this->custom_admin_columns->remove_columns( $columns_to_remove );

        $this->custom_admin_columns->set_post_type( 'pages', true );
        $this->custom_admin_columns->add_headers( $custom_headers );
        $this->custom_admin_columns->add_content_to_columns( $content_callbacks );
        $this->custom_admin_columns->remove_columns( $columns_to_remove );
    }

    function output( $post_id ) {
        return $post_id;
    }

    function my_division_page_content() {
        echo '<h1> Hello Divisions</h1>';
        $screen = get_current_screen();
        var_dump( $screen );
    }

    function proba( $defaults ) {
        // var_dump( $defaults );
        // die();

        // $defaults['event_date']  = 'Event Date';
        // $defaults['ticket_status']    = 'Ticket Status';
        // $defaults['venue']   = 'Venue';
        // $defaults['author'] = 'Added By';
        unset( $defaults['author'] );
        return $defaults;
    }

    /**
     * Add custom field for assigning Managers to Create Division admin screen
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
     function add_managers_field_to_add_division_screen() {

         // get all managers
         $args = array( 'role' => 'division_manager' );
         $users = get_users( $args );
         // create html output
         $html = '<div class="form-field term-assign-managers"><h4 for="">Assign Managers</h4>';
         $html .= '<div class="user-list"><input class="js-user-search" type="text" placeholder="Search Division Managers"><br>';
         $select_html = '<select class="js-user-selection" name="assigned-managers[]" multiple hidden>';
         $table_html = '<table class="user-list__table js-user-list"><tr><th id="user-name" class="user-list__header js-user-list-header">User Name</th><th id="user-id" class="user-list__header js-user-list-header">User ID</th></tr>';

         // loop through users and depending on whether they are assigned or not add them respective attributes
         foreach ( $users as $user ) {

             $select_html .= '<option value="' . $user->ID . '" data-elem="' . $user->ID . '">' . $user->display_name . '</option>';
             $table_html .= '<tr class="user-list__item js-selectable-element" data-elem="' . $user->ID . '"><td>' . $user->display_name . '</td><td>' . $user->ID . '</td></tr>';

         }

         $select_html .= '</select>';
         $table_html .= '</table>';
         $select_html .= $table_html;
         $html .= $select_html;
         $html .= '</div></div>';



         echo $html;
    }

    /**
     * Add custom field for assigning Managers to Edit Division admin screen
     *
     * @since 1.0.0
     * @access public
     * @param {Object} $term current edited division
     * @return void
     */
    function add_managers_field_to_edit_division_screen( $term ) {

        // get assigned managers from term meta table
        $assigned_users = ( array ) get_term_meta( $term->term_id, 'assigned_managers', true );

        // get all managers
        $args = array( 'role' => 'division_manager' );
        $users = get_users( $args );

        // create html output
        $html = '<tr class="form-field term-assign-managers"><th scope="row"><label for="user-search">Assign Managers</label></th>';
        $html .= '<td class="user-list"><input class="js-user-search" type="text" id="user-search" placeholder="Search Division Managers">';
        $select_html = '<select class="js-user-selection" name="assigned-managers[]" multiple hidden>';
        $table_html = '<table class="user-list__table js-user-list"><tr><th id="user-name" class="user-list__header js-user-list-header">User Name</th><th id="user-id" class="user-list__header js-user-list-header">User ID</th></tr>';

        // loop through users and depending on whether they are assigned or not add them respective attributes
        foreach ( $users as $user ) {

            if ( in_array( $user->ID, $assigned_users ) ) {

                $select_html .= '<option value="' . $user->ID . '" selected data-elem="' . $user->ID . '">' . $user->display_name . '</option>';
                $table_html .= '<tr class="user-list__item js-selectable-element selected" data-elem="' . $user->ID . '"><td>' . $user->display_name . '</td><td>' . $user->ID . '</td></tr>';

            } else {

                $select_html .= '<option value="' . $user->ID . '" data-elem="' . $user->ID . '">' . $user->display_name . '</option>';
                $table_html .= '<tr class="user-list__item js-selectable-element" data-elem="' . $user->ID . '"><td>' . $user->display_name . '</td><td>' . $user->ID . '</td></tr>';

            }
        }

        $select_html .= '</select>';
        $table_html .= '</table>';
        $html .= $select_html;
        $html .= $table_html;
        $html .= '</td></tr>';

        echo $html;
    }

    /**
     * Handle managers assignment on new Division creation
     *
     * @since 1.0.0
     * @access public
     * @param {Number} $term_id id of the currently edited / created division
     * @return void
     */
    function assign_managers_on_create_division( $term_id ) {
        // get assigned managers if any
        if ( !empty( $_POST['assigned-managers'] ) && $assigned_managers = ( array ) $_POST['assigned-managers'] ) {
            // be sure that every value in array is an integer
            $assigned_managers = array_map( 'intval', $assigned_managers );
            // assign managers to division
            update_term_meta( $term_id, 'assigned_managers', $assigned_managers );
            // add divisions to manager
            $this->add_division_to_users( $term_id, $assigned_managers );
        }

    }

    /**
     * Handle managers assignment on new edit Division
     *
     * @since 1.0.0
     * @access public
     * @param {Number} $term_id id of the currently edited / created division
     * @return void
     */
    function assign_managers_on_edit_division( $term_id ) {
        // get managers that should be assigned if any
        if ( !empty( $_POST['assigned-managers'] ) ) {
            // be sure that every item in array is integer
            $managers_to_assign = array_map( 'intval', ( array ) $_POST['assigned-managers'] );
        } else {
            $managers_to_assign = array();
        }
        // get already assigned managers if any
        $already_assigned_managers = get_term_meta( $term_id, 'assigned_managers', true );
        $already_assigned_managers = !empty( $already_assigned_managers ) ? $already_assigned_managers : array();

        // managers present in both arrays
        $present_in_both = array_intersect( $managers_to_assign, $already_assigned_managers );

        // whether we should update? if both arrays are empty or are the same we return there's no need for update
        if ( ( empty( $managers_to_assign ) && empty( $already_assigned_managers ) ) ||
            ( count( $managers_to_assign ) == count( $already_assigned_managers ) && count( $managers_to_assign ) == count( $present_in_both ) )
        ) {
            return;
        }

        // if there is new assigned managers add division to their meta table
        if ( $managers_to_add = array_diff( $managers_to_assign, $present_in_both ) ) {
            $this->add_division_to_users( $term_id, $managers_to_add );
        }
        // if there is any removed managers remove division from their meta table
        if ( $managers_to_remove = array_diff( $already_assigned_managers, $present_in_both ) ) {
            $this->remove_division_from_users( $term_id, $managers_to_remove );
        }

        update_term_meta( $term_id, 'assigned_managers', $managers_to_assign );

    }

    /**
     * Add divisions to users
     *
     * @since 1.0.0
     * @access private
     * @param {Number} $division_id id of division to add
     * @param {Array} $user_ids user ids to which to add division
     * @return void
     */
    function add_division_to_users( $division_id, $user_ids ) {
        // var_dump( array( $division_id, $user_ids ) );die;
        // loop through users
        foreach ( $user_ids as $user_id ) {

            // get currently added divisions if any
            $assigned_divisions = get_user_meta( $user_id, 'divisions', true );
            $assigned_divisions = !empty( $assigned_divisions ) ? $assigned_divisions : array();
            // add the new one
            $assigned_divisions[] = $division_id;
            update_user_meta( $user_id, 'divisions', $assigned_divisions );
        }


    }

    /**
     * Remove divisions to users
     *
     * @since 1.0.0
     * @access private
     * @param {Number} $division_id id of division to add
     * @param {Array} $user_ids user ids to which to add division
     * @return void
     */
    function remove_division_from_users( $division_id, $user_ids ) {
        // var_dump( $user_ids );die;
        // loop through users
        foreach ( $user_ids as $user_id ) {

            // get currently added divisions if any
            $assigned_divisions = get_user_meta( $user_id, 'divisions', true );
            $assigned_divisions = !empty( $assigned_divisions ) ? $assigned_divisions : null;

            // remove division if there is anything to be removed
            if ( $assigned_divisions ) {
                $divisions_to_assign = array_filter( $assigned_divisions, function ( $division ) use ( $division_id ) { return $division !== $division_id; } );
                update_user_meta( $user_id, 'divisions', $divisions_to_assign );
            }
        }
    }

    /**
     * Clean up / remove division from users on division deletion
     *
     * @since 1.0.0
     * @access public
     * @param {Number} $term_id
     * @return void
     */
    function remove_division_from_users_on_delete_term( $term_id ) {
        // get assigned managers if any
        $assigned_managers = get_term_meta( $term_id, 'assigned_managers', true );
        // var_dump( $assigned_managers );die;
        $assigned_managers = !empty( $assigned_managers ) ? $assigned_managers : null;
        // var_dump( $assigned_managers );die;

        if ( $assigned_managers ) {
            $this->remove_division_from_users( $term_id, $assigned_managers );
        }

    }

    /**
     * Enque admin styles and scripts
     *
     * @since 1.0.0
     * @access public
     * @param {}
     * @return void
     */
    function enque_styles_and_scripts( $hook ) {

        global $post_type;

        ### Styles ###
        wp_enqueue_style( 'admin-styles', get_template_directory_uri() . '/admin-styles.css' );

        ### Scripts ###
        // load only on division taxonomy new / edit new screen
        if ( ( $hook == 'edit-tags.php' || $hook == 'term.php' ) && $_GET['taxonomy'] == 'division' ) {

            wp_enqueue_script( 'user-list.js', get_template_directory_uri() . '/assets/js/admin-division.js', array( 'jquery' ), '1.0.0', true );

        }

        // Load script only on task post type
        if ( ( $hook == 'post-new.php' || $hook == 'post.php' ) && $post_type == 'task' ) {

            wp_enqueue_script( 'task', get_template_directory_uri() . '/assets/js/admin-task.js', array( 'jquery' ), '1.0.0', true );

        }
        if ( $hook == 'post-new.php' ||  $hook == 'post.php' && $post_type == 'application' ) {

            wp_enqueue_script( 'application', get_template_directory_uri() . '/assets/js/admin-application.js', array( 'jquery' ), '1.0.0', true );

        }

    }
    function volunteer_profile_update() {

        $user_id = get_current_user_id();
        $user_name = sanitize_text_field( $_POST['fullname'] );
        $user_email = sanitize_email( $_POST['email'] );
        $user_phone = intval( $_POST['phone'] );
        $user_description = sanitize_textarea_field( $_POST['description'] );

        //Upload image
        if(!empty($_FILES['uploaded_file']))
         {
           $path =  get_template_directory() . "/assets/img/";
           $path = $path . basename( $_FILES['uploaded_file']['name']);

           if( move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $path) ) {
               echo "The file ".  basename( $_FILES['uploaded_file']['name']).
              " has been uploaded";

            } else{
                echo "There was an error uploading the file, please try again!";
            }

         }
             $volunteer_profile_image = get_template_directory_uri() . "/assets/img/".  basename( $_FILES['uploaded_file']['name']);

        $user_args = array(
            'ID'           => $user_id,
            'display_name'  => $user_name,
            'user_email'    => $user_email,
            'description'   => $user_description
        );

        $id = wp_update_user( $user_args );

        if ( is_wp_error( $id ) ) {

              global $update_error;
            //   $update_error = $id->get_error_message();

        } else {

            update_user_meta( $id, 'phone_number', $user_phone );
            if (basename( $_FILES['uploaded_file']['name'])) {
                        update_user_meta( $id, 'profile_image', $volunteer_profile_image );
            }

             wp_redirect( home_url( '/my-profile' ) ); die;

        }
        return $user_id;
    }

    function setup_admin_pages() {
        add_menu_page( 'My Division', 'My Division', 'edit_division', 'my-division', array( $this, 'my_division_page_content' ) );
    }

    //Style my login page - Did it here because I read it on WP codex
    function wp_admin_login_custom_logo() { ?>
    <style type="text/css">
        #login h1 a, .login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri() . '/assets/img/gras-r-tarinn.svg'; ?>);
            height:65px;
            width:320px;
            background-size: 320px 65px;
            background-repeat: no-repeat;
        	padding-bottom: 30px;
            border-color: none;
        }
        body {
            background-color: #503087 !important;

        }
        .login form {
            border-radius: 10px;
        }
        .login #backtoblog a, .login #nav a {
            color: #fff !important;
        }
        #wp-submit {
            background-color: #4daf6f !important;
        }
        .wp-core-ui .button-primary {
            border: none !important;
            border-color: #fff !important;
            background: none !important;
            box-shadow: none !important;
            text-shadow: none !important;
        }
        }
    </style>
<?php }
//Sortable column in admin panel
    function my_sortable_task_column( $columns ) {

        $columns['taxonomy-task_category'] = 'taxonomy-task_category';
        $columns['taxonomy-division'] = 'taxonomy-division';
        $columns['taxonomy-skill'] = 'taxonomy-skill';

        return $columns;

    }

    //Sort columns ASC - DESC
    function my_task_orderby( $clauses, $wp_query ) {

        global $wpdb;

        if( isset( $wp_query->query['orderby'] ) && $wp_query->query['orderby'] === 'taxonomy-task_category' ) {

            $clauses['join'] .= <<<SQL
LEFT OUTER JOIN {$wpdb->term_relationships} ON {$wpdb->posts}.ID = {$wpdb->term_relationships}.object_id
LEFT OUTER JOIN {$wpdb->term_taxonomy} USING (term_taxonomy_id)
LEFT OUTER JOIN {$wpdb->terms} USING (term_id)
SQL;

            $clauses['where'] = "AND ( taxonomy = 'task_category' )";
            $clauses['groupby'] = "object_id";
            $clauses['orderby'] = "GROUP_CONCAT({$wpdb->terms}.name ORDER BY name ASC)";

            if( strtoupper( $wp_query->get( 'order' ) ) === 'ASC') {

                $clauses['orderby'] .= 'ASC';

            } else {

                $clauses['orderby'] .= 'DESC';

            }

        } else if( isset( $wp_query->query['orderby'] ) && $wp_query->query['orderby'] === 'taxonomy-division') {

            $clauses['join'] .= <<<SQL
LEFT OUTER JOIN {$wpdb->term_relationships} ON {$wpdb->posts}.ID = {$wpdb->term_relationships}.object_id
LEFT OUTER JOIN {$wpdb->term_taxonomy} USING (term_taxonomy_id)
LEFT OUTER JOIN {$wpdb->terms} USING (term_id)
SQL;

            $clauses['where'] = "AND (taxonomy = 'division')";
            $clauses['groupby'] = "object_id";
            $clauses['orderby'] = "GROUP_CONCAT({$wpdb->terms}.name ORDER BY name ASC)";

            if(strtoupper($wp_query->get('order')) === 'ASC') {

                $clauses['orderby'] .= 'ASC';

            } else {

                $clauses['orderby'] .= 'DESC';

            }

        } else if( isset( $wp_query->query['orderby'] ) && $wp_query->query['orderby'] === 'taxonomy-skill' ) {

            $clauses['join'] .= <<<SQL
LEFT OUTER JOIN {$wpdb->term_relationships} ON {$wpdb->posts}.ID = {$wpdb->term_relationships}.object_id
LEFT OUTER JOIN {$wpdb->term_taxonomy} USING (term_taxonomy_id)
LEFT OUTER JOIN {$wpdb->terms} USING (term_id)
SQL;

            $clauses['where'] = "AND (taxonomy = 'skill' )";
            $clauses['groupby'] = "object_id";
            $clauses['orderby'] = "GROUP_CONCAT({$wpdb->terms}.name ORDER BY name ASC)";

            if( strtoupper( $wp_query->get( 'order' ) ) === 'ASC' ) {

                $clauses['orderby'] .= 'ASC';

            } else {

                $clauses['orderby'] .= 'DESC';

            }
        }

        return $clauses;

      }

    function register_application_column( $columns ) {
         unset( $columns['title'] );
         $columns['task_title'] = __( 'Verk', 'volunteerweb' );
         $columns['application_status'] = __( 'Staða umsóknar', 'volunteerweb' );
         return $columns;
    }

    function custom_application_column( $column_name, $post_id ) {

      switch ( $column_name ) {
            case 'task_title':
                // get application edit permalink
                $application_link = get_edit_post_link( $post_id );
                // get task title based on its id
                $task_id = get_post_meta($post_id, 'task_id', true);
                $task_title = get_the_title( $task_id );
                echo "<a href=\"$application_link\">$task_title</a>";

            break;

            case 'application_status':
                 // get application edit permalink
                $application_link = get_edit_post_link( $post_id );
                $app_status = get_post_meta($post_id, 'application_status', true);
               echo "<a href=\"$application_link\">$app_status</a>";

            break;
      }

    }

    /**
    * Filter applications on edit applications screen
    * to show only applications which have assigned divisions to which currently logged-in manager is assigned to
    *
    * @since 1.0.0
    * @access public
    * @param {Object} $query global query object
    * @return {void}
    */
    function show_custom_applications_to_manager( $query ) {

        global $parent_file;

        if ( is_admin() && $query->is_main_query() && 'edit.php?post_type=application' == $parent_file && current_user_can( 'division_manager' ) ) {

            //Current user ID
            $user_id = get_current_user_id();
            // Current Manager divisions
            $user_divisions = get_user_meta( $user_id, 'divisions' );
            $user_divisions = implode( ',', $user_divisions[0] );

            //If user has any division
            if ( !empty( $user_divisions ) ) {

                global $wpdb;
                //Get all task from current manager divisions
                $tasks_in_manager_divisions = $wpdb->get_results( "SELECT ID
                                                FROM wp_posts
                                                INNER JOIN wp_postmeta
                                                    ON wp_posts.ID = wp_postmeta.post_id
                                                INNER JOIN wp_term_relationships
                                                    ON wp_posts.ID = wp_term_relationships.object_id
                                                INNER JOIN  wp_term_taxonomy
                                                    ON wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
                                                    WHERE wp_posts.post_type = 'task' AND wp_posts.post_status = 'publish' AND wp_postmeta.meta_key = 'is_active' AND wp_postmeta.meta_value = '1'
                                                    AND wp_term_taxonomy.taxonomy = 'division' AND wp_term_taxonomy.term_id IN ($user_divisions)
                                                    GROUP BY ID", ARRAY_N
                                            );

                //Array of task in manager divisions IDs
                $task_ids = [];
                foreach ( $tasks_in_manager_divisions as $task_id_array ) {

                    $task_ids[] = $task_id_array[0];

                }

                //Make string form tasks in manager divisions - return ID - not needed for now
                // $task_array_ids = implode( ',', $task_ids );

                // prepare meta query args
                $meta_query_args = array(
                        array(
                            'key'         => 'task_id',
                            'value'       => $task_ids ,
                        )
                );
                // set meta query
                $query->set( 'meta_query', $meta_query_args );

            } else { //End of if manager has any division

                // ### HACK TO PREVENT ANY APPLICATION SHOWING UP ###
                // if manager is not assigned to any division, there is no applications to show
                $query->set( 'post__in', array(0) );

            }

        } //End - if we are in admin pannel

    }


    function setup_hooks() {

        add_action( 'admin_init', array( $this, 'setup_admin_columns' ) );
        // add_action( 'admin_menu', array( $this, 'setup_admin_pages' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enque_styles_and_scripts' ) );
        add_action( 'manage_division_posts_columns', array( $this, 'proba' ));
        add_action( 'division_add_form_fields', array( $this, 'add_managers_field_to_add_division_screen' ) );
        add_action( 'division_edit_form_fields', array( $this, 'add_managers_field_to_edit_division_screen' ) );
        add_action( 'created_term', array( $this, 'assign_managers_on_create_division' ) );
        add_action( 'edit_term', array( $this, 'assign_managers_on_edit_division' ) );
        add_action( 'pre_delete_term', array( $this, 'remove_division_from_users_on_delete_term' ) );
        //Custom application columns
        add_action( 'manage_application_posts_custom_column' , array( $this, 'custom_application_column' ), 10, 2 );

        add_action( 'admin_post_volunteer_update', array( $this, 'volunteer_profile_update' ) );
        add_action( 'login_enqueue_scripts',  array( $this, 'wp_admin_login_custom_logo' ) );
        //Manager app
        add_action( 'pre_get_posts', array( $this, 'show_custom_applications_to_manager' ) );
        //Sortable bu A-Z
        add_action( 'posts_clauses', array( $this, 'my_task_orderby' ), 10, 2 );

        //Manager app
        // add_filter( 'init', array( $this, 'show_custom_applications_to_manager' ) );
        //Sortable columns
        add_filter( 'manage_edit-task_sortable_columns', array($this, 'my_sortable_task_column') );
        //Application columns
        add_filter( 'manage_application_posts_columns', array( $this, 'register_application_column' ) );
    }

}

 ?>
