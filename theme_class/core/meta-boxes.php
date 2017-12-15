<?php
/**
 * Wrapper for esier and structured creation of additional fields/meta boxes
 *
 * @since 1.0.0
 * @package VolunteerWeb
 * @subpackage VolunteerWeb/Core
 */
class Meta_Boxes {

    function __construct() {
        $this->prefix = null;
        $this->post_type = null;
        $this->post_type_display_name = null;
        $this->meta_boxes = array();
        $this->meta_box_helpers = array(
            'input_text' => array( 'generate_html' => array( $this, 'generate_input_text_html' ), 'save_field_data' => array( $this, 'prepare_input_text_data' ) ),
            'wp_editor' => array( 'generate_html' => array( $this, 'generate_wp_editor_html' ), 'save_field_data' => array( $this, 'prepare_wp_editor_data' ) ),
            'add_managers' => array( 'generate_html' => array( $this, 'generate_add_managers_html' ), 'save_field_data' => array( $this, 'prepare_add_managers_data' ) ),
            'add_task_language' => array( 'generate_html' => array( $this, 'generate_add_task_language_html' ), 'save_field_data' => array( $this, 'prepare_add_task_language_data' ) ),
            'add_language_skills' => array( 'generate_html' => array( $this, 'generate_add_language_skills_html'), 'save_field_data' => array( $this, 'prepare_add_language_skills_data') ),
            'task_name' => array( 'generate_html' => array( $this, 'generate_task_name_html'), 'save_field_data' => array( $this, 'prepare_task_name_data') ),
            'user_info' => array( 'generate_html' => array( $this, 'generate_user_info_html'), 'save_field_data' => array( $this, 'prepare_user_info_data') ),
            'application_status' => array( 'generate_html' => array( $this, 'generate_app_status_html'), 'save_field_data' => array( $this, 'prepare_app_status_data') )

        );
    }

    /**
     * Create html output for input text field
     *
     * @since 1.0.0
     * @access private
     * @param {Array} $meta_box_data
     * @param {Object} $post instance of WP_Post object for current post
     * @return void
     */
    private function generate_input_text_html( $meta_box_data, $post ) {
        $content = sanitize_text_field( get_post_meta( $post->ID, $meta_box_data['name'], true ) );
        ?>
        <input type="text" name="<?php echo $meta_box_data['field_name']; ?>" <?php echo !empty( $content ) ? 'value="' . $content .'"' : ''; ?>>
        <?php
    }

    private function prepare_input_text_data( $field_data ) {
        // prepare text value for db saving
        $sanitized_value = sanitize_text_field( $field_data );

        return $sanitized_value;
    }

    /**
     * Create html output for WYSIWYG editor
     *
     * @since 1.0.0
     * @access private
     * @param {Array} $meta_box_data
     * @param {Object} $post instance of WP_Post object for current post
     * @return void
     */
    private function generate_wp_editor_html( $meta_box_data, $post ) {
        $content = html_entity_decode( get_post_meta( $post->ID, $meta_box_data['name'], true ) );
        wp_editor( $content, $meta_box_data['field_name'] );
    }

    /**
     * Prepare data from wp editor for saving
     *
     * @since 1.0.0
     * @access private
     * @param {Mixed} $field_data
     * @return {Mixed} $sanitized_value
     */
    private function prepare_wp_editor_data( $field_data ) {
        // echo 'JAAAA';
        // die();
        $sanitized_value = sanitize_textarea_field( htmlentities( $field_data ) );

        return $sanitized_value;
    }

    /**
     * Create html output for add managers field
     *
     * @since 1.0.0
     * @access private
     * @param {Array} $meta_box_data
     * @param {Object} $post instance of WP_Post object for current post
     * @return void
     */
    private function generate_add_managers_html( $meta_box_data, $post ) {
        // create content variables
        // one main which will hold whole html
        // one for hidden <select> elem which will be hidden and used for submission
        // and one for <table> eleme which will be presented to user
        $html = '<div class="user-list"><input class="js-user-search" type="text" placeholder="Search Division Managers"><br>';
        $select_html = '<select class="js-user-selection" name=' . $meta_box_data['field_name'] . '[]" multiple="multiple" hidden>';
        $table_html = '<table class="user-list js-user-list"><tr><th id="user-name" class="user-list__header js-user-list-header">User Name</th><th id="user-id" class="user-list__header js-user-list-header">User ID</th></tr>';
        // get all users
        $args = array( 'role' => 'division_manager' );
        $users = get_users( $args );

        // get assigned users info
        $assigned_users =  ( array ) get_post_meta( $post->ID, $meta_box_data['name'], true );
        $assigned_users = $assigned_users ? $assigned_users : array();
        // create two user list assigned and not assigned
        $assigned_users_list = array();
        $unassigned_users_list = array();

        // loop through users and depending on whether they are assigned or not add them respective attributes
        foreach ( $users as $user ) {

            if ( in_array( $user->ID, $assigned_users ) ) {

                $select_html .= '<option value="' . $user->ID . '" selected data-elem="' . $user->ID . '">' . $user->display_name . '</option>';
                $table_html .= '<tr class="js-selectable-element selected" data-elem="' . $user->ID . '"><td>' . $user->display_name . '</td><td>' . $user->ID . '</td></tr>';

            } else {

                $select_html .= '<option value="' . $user->ID . '" data-elem="' . $user->ID . '">' . $user->display_name . '</option>';
                $table_html .= '<tr class="js-selectable-element" data-elem="' . $user->ID . '"><td>' . $user->display_name . '</td><td>' . $user->ID . '</td></tr>';

            }
        }

        $select_html .= '</select>';
        $table_html .= '</table>';

        $html .= $select_html . '<br>' . $table_html . '</div>';



        echo $html;
    }

    private function prepare_add_managers_data( $field_data ) {
        // be sure that every item in array is a number
        $field_data = array_map( 'intval', $field_data );

        return $field_data;
    }

    /**
     * Generate html for add language field
     *
     * @since 1.0.0
     * @access private
     * @param
     * @return
     */
    function generate_add_task_language_html( $meta_box_data, $post ) {
        // import languages
        get_template_part( 'theme_class/core/languages' );

        global $language_codes;

        $selected_language = get_post_meta( $post->ID, $meta_box_data['name'], true );
        ?>
        <select type="text" name="<?php echo $meta_box_data['field_name']; ?>"/>
            <option value="">Select language</option>
            <?php
            foreach ( $language_codes as $code => $language ) {
                ?>
                <option value="<?php echo $code; ?>" <?php selected( $selected_language, $code ); ?>>
                    <?php echo $language ?>
                </option>
                <?php
            } ?>
        </select>
        <?php
    }

    /**
     * Sanitize add language intput field value
     *
     * @since 1.0.0
     * @access private
     * @param
     * @return
     */
    function prepare_add_task_language_data( $field_data ) {
        // be sure it's string with two letters
        $selected_language = preg_match( '/^[a-z]{2}$/', trim( $field_data ) ) ? $field_data : '';

        return $selected_language;
    }

    /**
     * Generate html for add language skills field
     *
     * @since 1.0.0
     * @access private
     * @param
     * @return
     */

    function generate_add_language_skills_html( $meta_box_data, $post ) {
        // import languages
        get_template_part( 'theme_class/core/languages' );

        global $language_codes;

        $selected_language = get_post_meta( $post->ID, $meta_box_data['name'], true );
        ?>
        <!-- Hidden select with data  -->
        <select multiple hidden class="js-language-skills" name="<?php echo $meta_box_data['field_name']; ?>[]">
            <option value="value">Select Language Skills</option>
            <?php foreach ( $selected_language as $code ): ?>
                    <option selected class="js-lang-option-select" value="<?php echo $code; ?>"> <?php echo $language_codes[$code]; ?></option>
            <?php endforeach; ?>
        </select>
        <!-- <input type="text" name="kako" value="zasto"> -->
        <!-- Select option for user in admin pannel -->
        <select class="js-language-select">
            <option value="">Select Language Skills</option>
            <?php
            foreach ($language_codes as $code => $language ) {
                ?>
                <!-- <option value="<?php echo $code; ?>" <?php selected($selected_language, $code); ?>> -->
                    <!-- <?php echo $language ?> -->
                <option class="lang-value" value="<?php echo $code; ?>">
                    <?php echo $language; ?>
                </option>
                <?php
            } ?>
        </select>
        <div class="container-lang-skills">
            <h4>This skills are choosed</h4>
        </div>
        <?php
    }
    /**
     * Sanitize add language Skills intput field value
     *
     * @since 1.0.0
     * @access private
     * @param
     * @return
     */
     function prepare_add_language_skills_data( $field_data ) {
         //String -> 2 letters
        function check_language_code( $selected_language ) {
            return preg_match( '/^[a-z]{2}$/', trim( $selected_language) );
        }
        $lang_codes = array_filter( $field_data, 'check_language_code' );
        return $lang_codes;
     }

     function generate_task_name_html() {
         global $post;
         // get task name related to particular application
         $task_id = get_post_meta( $post->ID , 'task_id', true );
         ?>
         <div class="application__task">
             <h3 class="application__task-title"> <?php echo get_the_title( $task_id ); ?> </h3>
         </div>
         <?php
     }

     function prepare_task_name_data( $filed_data ) {
         return $field_data;
     }

     function generate_user_info_html() {
         global $post;
         // get user data related to particular application
         $user_id = get_post_meta( $post->ID , 'user_id', true );
         $user = get_userdata( $user_id );
         // get why me field
         $why_me = get_post_meta( $post->ID, 'why_me', true );
         ?>

            <div class="application__user">

                <div class="application__user-data">
                    <p class="application__user-label">User Name: </p>
                    <p class="application__user-info"> <?php echo $user->user_login; ?> </p>
                </div>

                <div class="application__user-data">
                    <p class="application__user-label">User Email: </p>
                    <p class="application__user-info"> <?php echo $user->user_email; ?> </p>
                </div>

                <div class="application__whyme">
                    <?php echo $why_me; ?>

                </div>

            </div>

         <?php
     }

     function prepare_user_info_data( $filed_data ) {
         return $field_data;
     }

     function generate_app_status_html( $meta_box_data, $post ) {

         $app_status = get_post_meta( $post->ID, $meta_box_data['name'], true );
         ?>

         <div class="application__status-wrapper">

             <div class="application__choises">
                 <!-- <button type="button" class="application__pending" name="pending">Pending</button> -->
                 <button type="button" class="application__approve" name="approve">Í skoðun</button>
                 <button type="button" class="application__decline" name="decline">Decline</button>
                 <input id="application_pending" class="application__radio-hidden" type="radio" <?php checked( $app_status, 'pending' ); ?> name="<?php echo $meta_box_data['field_name']; ?>" value="Í skoðun">
                 <input id="application_approve" class="application__radio-hidden" type="radio" <?php checked( $app_status, 'approve' ); ?> name="<?php echo $meta_box_data['field_name']; ?>" value="samþykkt">
                 <input id="application_decline" class="application__radio-hidden" type="radio" <?php checked( $app_status, 'declined' ); ?> name="<?php echo $meta_box_data['field_name']; ?>" value="declined">
             </div>
             <?php
             if ($app_status == '') {
                 $app_status = 'Í skoðun';
             }
             ?>
             <div class="application__status">
                Application is <p class="application__current-status"><?php echo $app_status; ?></p>
             </div>

         </div>

         <?php
     }

     function prepare_app_status_data( $field_data ) {

        return $field_data;

     }
    #############################
    ### CONSTRUCTOR FUNCTIONS ###
    #############################

    /**
     * Construct callback function for add_meta_box action hook for each meta box
     *
     * @since 1.0.0
     * @access private
     * @param {Array} $meta_box_data
     * @return void echo output
     */
    private function render_callback_constructor( $meta_box_data ) {

        return function( $post ) use ( $meta_box_data ) {
            ob_start();

            wp_nonce_field( $meta_box_data['name'] . $post->ID, $meta_box_data['field_name'] . $post->ID );
            $this->meta_box_helpers[$meta_box_data['type']]['generate_html']( $meta_box_data, $post );

            $html = ob_get_clean();

            echo $html;
        };
    }

    /**
     * Construct callback function for save_post action hook for each meta box
     *
     * @since 1.0.0
     * @access public
     * @param {Array} $meta_box_data
     * @return void
     */
    private function save_callback_constructor( $meta_box_data ) {

        return function( $post_id ) use ( $meta_box_data ) {

            // check if field is set
            if ( ! isset( $_POST[$meta_box_data['field_name']] ) ) {
                return;

            }
            // veriy nonce
            if (  ! isset( $_POST[$meta_box_data['field_name'] . $post_id] ) || ! wp_verify_nonce( $_POST[$meta_box_data['field_name'] . $post_id], $meta_box_data['name'] . $post_id ) ) {
                return;
            }
            // prepare content and save it
            $content = $this->meta_box_helpers[$meta_box_data['type']]['save_field_data']( $_POST[$meta_box_data['field_name']] );
            if ( $content ) {
                update_post_meta( $post_id, $meta_box_data['name'], $content );
            }

        };
    }

    /**
     * Setup callbacks for each meta box for add_meta_boxe & save_post hooks
     *
     * @since 1.0.0
     * @access private
     * @param no params
     * @return void
     */
    private function setup_meta_box_callbacks() {
        foreach ( $this->meta_boxes as $key => $meta_box ) {
            $this->meta_boxes[$key]['render_callback'] = $this->render_callback_constructor( $this->meta_boxes[$key] );
            // $this->meta_boxes[$key]['render_callback_wrapper'] = $this->render_callback_wrapper_constructor( $this->meta_boxes[$key] );
            $this->meta_boxes[$key]['save_callback'] = $this->save_callback_constructor( $this->meta_boxes[$key] );
            // $this->meta_boxes[$key]['save_callback_wrapper'] = $this->save_callback_wrapper_constructor( $this->meta_boxes[$key] );
        }
    }

    /**
     * Setup data for meta boxes
     *
     * @since 1.0.0
     * @access public
     * @param {Array} $meta_boxes_data two-dimensional array with array for each meta mox
     * @return void
     */
    function setup_meta_boxes_data( $meta_boxes_data ) {

        $this->meta_boxes = $meta_boxes_data;

        $this->setup_meta_box_callbacks();
    }

    /**
     * Hook each meta box render_callback to add_meta_boxes hook
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function setup_render_hooks() {

        foreach ( $this->meta_boxes as $meta_box ) {

            add_meta_box( $meta_box['name'], $meta_box['display_name'], $meta_box['render_callback'], $meta_box['screen'], $meta_box['context'], $meta_box['priority'], $meta_box['callback_args'] );

        }
    }

    /**
     * Hook each meta box save_callback to save_post hook
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    function setup_save_hooks() {

        foreach ( $this->meta_boxes as $meta_box ) {

            add_action( 'save_post', $meta_box['save_callback'] );

        }
    }


}
?>
