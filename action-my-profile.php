<?php
$submit_user = ( isset( $_POST['submit_user'] ) ) ? true : false;
// $upload_dir = wp_upload_dir( $upload_dir['basedir'] );
// var_dump($upload_dir);die();

if ( $submit_user ) {

    $user_name = $_POST['fullname'];

    $user_email = $_POST['email'];
    $user_phone = $_POST['phone'];
    $user_description = $_POST['description'];

    // var_dump( $user_name, $user_email, $user_phone, $user_description);die();
$user_args = array(
    'display_name'  => $user_name,
    'user_email'    => $user_email,
    'phone_number'  => $phone_number,
    'description'   => $user_description
);
   wp_update_user( $user_args );


    $context = Timber::get_context();
    $context['current_user'] = new Timber\User();
    $context['post'] = new Timber\Post();
    Timber::render( array( 'page-my-profile.twig' ), $context );
} else {
    var_dump(' not submit');die();

}
