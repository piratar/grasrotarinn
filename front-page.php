<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/views/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

global $task_filter_data;

$active_args = array(
                    'post_type'        => 'task',
                    'meta_query'       => array(
                        array(
                            'key'         => 'is_active',
                            'value'       => '1',
                        ),
                    ),
                );
//Is task active
$is_active_tasks = get_posts( $active_args );
$active_tasks_number = count($is_active_tasks);

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['active_tasks'] = $active_tasks_number;
$context['state'] = $task_filter_data;

Timber::render( array( 'front-page.twig', 'page.twig' ), $context );
