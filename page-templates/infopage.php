<?php
/**
 * Template Name: Infopage
 *
 * The template for Infopages.
 *
 * @package  Volunteer
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

Timber::render( 'infopage.twig', $context );
