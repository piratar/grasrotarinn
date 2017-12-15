<?php
/**
 * VolunteerWeb theme main class
 *
 * @since 1.0.0
 * @package VolunteerWeb
 */
class VolunteerWeb {

    /**
     * @var {String} $name
     * @access private
     */
    private $name;

    /**
     * @var {String} $version
     * @access private
     */
    private $version;

    /**
     * @var {Object} $volunteerweb_core instance of VolunteerWeb_Core
     * @access private
     */
    var $volunteerweb_core;

    /**
     * @var {Object} $volunteerweb_public instance of VolunteerWeb_Public
     * @access private
     */
    private $volunteerweb_public;

    /**
     * @var {Object} $volunteerweb_public instance of VolunteerWeb_Public
     * @access private
     */
    private $volunteerweb_admin;

    /**
     * Setup volunteerweb name and version and load all dependencies
     *
     * @since 1.0.0
     * @access public
     */
    function __construct( $VolunteerWeb_Core, $VolunteerWeb_Public, $VolunteerWeb_Admin ) {

        $this->name = 'volunteerweb';
        $this->version = '1.0';

        $this->volunteerweb_core = $VolunteerWeb_Core;
        $this->volunteerweb_public = $VolunteerWeb_Public;

        $this->volunteerweb_admin = $VolunteerWeb_Admin;

    }

    /**
     * Setup all theme functionalities
     *
     * @since 1.0.0
     * @access public
     */
    function setup() {
        // init setups
        $this->volunteerweb_core->setup_hooks();
        $this->volunteerweb_public->setup_hooks();
        $this->volunteerweb_admin->setup_hooks();

    }

}


?>
