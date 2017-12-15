<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

//Category icon
$categories = $post->terms( 'task_category' );
$cover_image = get_field( 'category_icon', 'task_category' . '_' . $categories[0]->id );
$context['category_icon'] = $cover_image;

get_template_part( 'theme_class/core/languages' );

global $language_codes;

//Multiple task lang skills
$language_skills = $post->language_skills;
//On which lang is task
$task_language = $post->task_language;
$tsk_lang =  $task_language ? $language_codes[$task_language] : '';
//Taxonomies
$language_skills_array =  array();
$category = array();
$division = array();
$skills =  array();
$all_terms = Timber::get_terms( array( 'category', 'division', 'skill' ));


if ( $language_skills ) {

	foreach ( $language_skills as $lang_code ) {

		$language_skills_array []= $language_codes[$lang_code];

	}
}

foreach ( $all_terms as $term ) {

	if ($term->taxonomy == 'category') {

		$category []= $term;

	} else if ( $term->taxonomy == 'division' ) {

		$division []= $term;


	} else if ( $term->taxonomy == 'skill' ) {

		$skills []= $term;
	}
}

$context['categories'] = $category;
$context['division'] = $division;
$context['skills'] = $skills;
$context['language_skills'] = 	$language_skills_array;
$context['task_language'] = $tsk_lang;

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
