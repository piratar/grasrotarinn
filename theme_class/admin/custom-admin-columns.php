<?php
/**
 * Custom Admin Columns class responsible for customizing admin pages with table lists of posts, custom post types, etc
 *
 * @since 1.0.0
 * @package VolunteerWeb
 * @subpackage VolunteerWeb/admin
 */
class Custom_Admin_Columns {

    /**
     * Class constructor
     *
     * @param no params
     */
    function __construct() {
        $this->post_type = 'post';
        $this->is_hierarchical = false;
        $this->custom_headers = null;
        $this->columns_content_callbacks = null;
        $this->columns_to_remove = null;
    }

    /**
     * Setting current post type
     *
     * @since 1.0.0
     * @access public
     * @param {String} $post_type
     * @param {Boolean} $is_hierarchical
     * @return void
     */
    function set_post_type( $post_type, $is_hierarchical = false ) {
        $this->post_type = $post_type;
        if ( $is_hierarchical ) $this->is_hierarchical = true;
    }

    /**
     * Add column headers to list table
     *
     * @since 1.0.0
     * @access public
     * @param {String} $post_name name of the post type
     * @param {Array} $column_headers array of header's name and display name pair
     * @param {Boolean} $custom_post_type whether it's custom post type or not
     * @return post
     */
    function add_headers( $column_headers ) {

        $this->custom_headers = $column_headers;

        if ( $this->is_hierarchical || $this->post_type === 'page' ) {
            add_filter( 'manage_pages_columns', array( $this, 'fill_columns_headers' ) );
        } else {
            add_filter( 'manage_' . $this->post_type . '_posts_columns', array( $this, 'fill_columns_headers' ) );
        }


    }

    function fill_columns_headers( $headers ) {
        return array_merge( $headers, $this->custom_headers );
    }

    function add_content_to_columns( $content_callbacks ) {
        $this->columns_content_callbacks = $content_callbacks;

        if ( $this->post_type === 'page' ) {
            add_action( 'manage_pages_custom_column', array( $this, 'fill_columns_content' ), 10, 2 );
        } else {
            add_action( 'manage_' . $this->post_type . '_posts_custom_column', array( $this, 'fill_columns_content' ), 10, 2 );
        }
    }

    function fill_columns_content( $column_name, $post_id ) {

        $content = $this->columns_content_callbacks[$column_name]( $post_id );

        echo $content;
    }

    function remove_columns( $columns ) {
        $this->columns_to_remove = $columns;

        if ( $this->post_type === 'page' ) {
            add_filter( 'manage_pages_columns', array( $this, 'remove_cols' ) );
        } else {
            add_filter( 'manage_' . $this->post_type . '_posts_columns', array( $this, 'remove_cols' ) );
        }
    }

    function remove_cols( $columns ) {
        foreach ( $this->columns_to_remove as $column ) {
            unset( $columns[$column] );
        }

        return $columns;
    }

}

?>
