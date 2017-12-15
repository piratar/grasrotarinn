<?php
/*
Template Name: Custom WordPress Registration
*/
// Create a new user for testing
// $user = wp_insert_user(
//     array(
//    'user_login'    =>  'test-volunter',
//    'user_email'    =>  'milan@whitecitystudios.com',
//    'user_pass'     =>  '11111asd',
//    'first_name'    =>  'volonter',
//    'last_name'     =>  'volonter',
//    'description'   =>  'Ovde ide description koji mi zelimo da napisemo',
//    'role' => 'volunteer'
//
//     )
// );
$wp_user_query = new WP_User_Query( array( 'role' => 'volunteer' ) );
// Get the users
$users = $wp_user_query->get_results();
$edit_user = ( isset( $_GET['edit_user'] ) && $_GET['edit_user'] == '1' ) ? true : false;
$submit_user = ( isset( $_POST['submit_user'] ) ) ? true : false;



if ( is_user_logged_in() && current_user_can('volunteer') ) {
   // echo "user registrovan kao volonter";die();
   if ( $edit_user == true ) {
        // var_dump('edit user');die();
       $context = Timber::get_context();
       $context['current_user'] = new Timber\User();
       $context['post'] = new Timber\Post();
       Timber::render( array( 'page-my-profile-form.twig' ), $context );

    } else {

        $context = Timber::get_context();
        $context['current_user'] = new Timber\User();
        $context['post'] = new Timber\Post();
        Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );

    }


} else {

   wp_redirect( home_url() ); exit;

}
?>
