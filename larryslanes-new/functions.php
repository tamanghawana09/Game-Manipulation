<?php
/**
 * Theme functions and definitions.
 *
 * For additional information on potential customization options,
 * read the developers' documentation:
 *
 * https://developers.elementor.com/docs/hello-elementor-theme/
 *
 * @package HelloElementorChild
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'HELLO_ELEMENTOR_CHILD_VERSION', '2.0.0' );

/**
 * Load child theme scripts & styles.
 *
 * @return void
 */
function hello_elementor_child_scripts_styles() {
    wp_enqueue_style( 'bootstrap-style', '//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' );
	wp_enqueue_style( 'hello-elementor-child-style', get_stylesheet_directory_uri() . '/style.css', ['hello-elementor-theme-style',], HELLO_ELEMENTOR_CHILD_VERSION );
	
	#wp_enqueue_style( 'OwlCarousel-style', '//cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css' );
	#wp_enqueue_style( 'flatpickr-style', '//cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css' );
	#wp_enqueue_style( 'flatpickr-dark', '//npmcdn.com/flatpickr/dist/themes/dark.css' );
	wp_enqueue_style( 'theme-style', get_stylesheet_directory_uri(). '/booking-style.css', array(), rand(10,100) );
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_scripts_styles', 20 );


function enqueue_custom_scripts_and_styles() {
    // Enqueue Owl Carousel JS
    wp_enqueue_script(
        'owl-carousel-js',
        'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
        array('jquery'), // Dependency
        '2.3.4',
        false // Load in header
    );

    // Enqueue Owl Carousel CSS
    wp_enqueue_style(
        'owl-carousel-css',
        'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css',
        array(),
        '2.3.4',
        'all'
    );

    // Enqueue Flatpickr JS
    wp_enqueue_script(
        'flatpickr-js',
        'https://cdn.jsdelivr.net/npm/flatpickr',
        array(),
        null,
        false // Load in header
    );

    // Enqueue Flatpickr Default CSS
    wp_enqueue_style(
        'flatpickr-css',
        'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
        array(),
        null,
        'all'
    );

    // Enqueue Flatpickr Dark Theme CSS
    /*wp_enqueue_style(
        'flatpickr-dark-css',
        'https://npmcdn.com/flatpickr/dist/themes/dark.css',
        array('flatpickr-css'), // Ensure the default Flatpickr CSS is loaded first
        null,
        'all'
    );*/
}

add_action('wp_enqueue_scripts', 'enqueue_custom_scripts_and_styles');


function wp_body_classes( $classes ) {
   if ( is_page() ) { 
		 $classes[] = 'elementor-page-not';
	}
     
    return $classes;
}
add_filter( 'body_class','wp_body_classes' );

function load_elementor_styles_on_custom_template() {
    // Check if Elementor is active
    if ( did_action('elementor/loaded') ) {
        // Force load the global styles
        \Elementor\Plugin::$instance->frontend->enqueue_styles();
        \Elementor\Plugin::$instance->frontend->enqueue_scripts();

        // If you know the specific template ID, you can load its CSS like this:
        $template_id = 13; // Replace with your actual template ID
        \Elementor\Plugin::$instance->frontend->get_builder_content($template_id, true);

    }
}
#add_action('wp_enqueue_scripts', 'load_elementor_styles_on_custom_template');

function load_elementor_footer_template() {
    if ( is_page('members-login') ) { // Replace with your condition
        if ( did_action('elementor/loaded') ) {
            \Elementor\Plugin::$instance->frontend->enqueue_styles();
            \Elementor\Plugin::$instance->frontend->enqueue_scripts();

            $footer_template_id = 16; // Replace with your actual footer template ID
            echo \Elementor\Plugin::instance()->frontend->get_builder_content_for_display($footer_template_id);
        }
    }
}
#add_action('wp_footer', 'load_elementor_footer_template');

function my_plugin_init_elementor_frontend() {
    do_action( 'elementor/frontend/init' );
}
add_action( 'wp', 'my_plugin_init_elementor_frontend' );