<?php
/**
 * The site's entry point.
 *
 * Loads the relevant template part,
 * the loop is executed (when needed) by the relevant template part.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();

    //$is_elementor_theme_exist = function_exists( 'elementor_theme_do_location' );
?>
<main id="content" <?php post_class( 'site-main' ); ?>>
    <div class="page-content pt-3 pb-5">
        
        <?php get_template_part('booked_it/booking-header'); ?>
        
        <div class="section d-none" id="booking-step-2">
            <div class="container-fluid px-5 mb-5">
                <div class="row justify-content-between backskip-row">
                    <a href="#back" id="btn-back" class="btn text-light bg-theme-trans"> &#11207; Back</a>
                    <a href="#skip" id="btn-skip" class="btn text-dark bg-white">Skip &#11208;&#11208;</a>
                </div>
            </div><!-- //Container -->
            
            <div class="container-md">
                <div class="row align-items-center">
                    <div class="col-md-12 text-center">
                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/10/faviconV2.png" alt="Larrys Lanes" />
                    </div><!-- //Col -->
            
                    <div class="col-md-12 pt-4 pt-md-0 text-center">
                        <!--<div class="h6 text-dark text-uppercase font-weight-bold mb-1">Booking For</div>
                        <h2 class="heading-poster display-5 mb-1">
                            <span class="venue-text text-white text-uppercase d-block">Hartlepool</span>
                        </h2>-->
                        
                        <div class="divider">
                            <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Asset-6.svg" alt="Divider" />
                        </div>
                        
                    </div><!-- //Col -->
                </div>
                
            </div><!-- //Container -->
            
            <div class="container py-5">
                <h2 class="heading-poster display-5 text-center mb-4 pb-2 transform-rotate">
                    <span class="py-2 px-3 text-white text-uppercase bg-theme-blue d-inline-block"><?php _e("Date, Time, & Guests"); ?></span>
                </h2>
                
				<form id="step-2-form">
    				<div class="row search-area-1">
                        <div class="col-md-4 transform-rotate">
                            <div class="position-relative mb-3">
                                <label for="inputDate" class="d-none">Choose a date</label>
                                <input type="date" class="form-control date pe-5 booking-date flatpickr flatpickr-input" id="inputDate" placeholder="DD/MM/YYYY" value="<?php #echo date('Y-m-d'); ?>" min="<?php echo date('Y-m-d'); ?>" />
                                
                                <span class="position-absolute absolute-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                    </svg>
                                </span>
                            </div>
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 transform-rotate">
                            <div class="position-relative mb-3">
                                <?php
                                    // Example: Retrieve the selected number of guests from a query parameter, session, or other source
                                    $selected_guests = isset($_GET['guests']) ? (int) $_GET['guests'] : null;
                                    
                                    // Maximum number of guests options
                                    $max_guests = 29;
                                ?>
                                
                                <select id="no_people" class="no_people custom-select form--select">
                                    <option value="">Select Guests</option>
                                    <?php for ($i = 1; $i <= $max_guests; $i++) : ?>
                                        <option value="<?php echo $i; ?>" <?php selected($i, $selected_guests); ?>>
                                            <?php echo $i; ?>
                                        </option>
                                    <?php endfor; ?>
                                    <option value="30" <?php selected(30, $selected_guests); ?>>30 or More</option>
                                </select>
                            </div>
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 transform-rotate">
                            <div class="position-relative mb-3">
                                <?php get_template_part('booked_it/time-dropdown'); ?>
                            </div>    
                        </div><!-- //Col -->
                    
                    </div>
                </form>
                
                <div class="wrap-md">
                    <div class="h6 text-white my-4 text-center">Larrys Lanes is strictly an over 18’s venue.</div>
                            
                    <div class="d-flex justify-content-around py-3 align-items-center transform-rotate">
                        <span class="roxyball-logo"><img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/10/faviconV2.png" alt="Larrys Lanes" /></span>
                        <span class="button"><a href="#activitiesbox" id="available-step-2" class="btn btn-theme-style text-white"><span>Next</span></a></span>
                    </div>
                </div>
                
            </div><!-- // Container -->
            
        </div><!-- //Section -->
        
        
        <div class="section d-none" id="booking-step-3">
            <div class="container-fluid px-5 mb-5">
                <div class="row justify-content-between backskip-row">
                    <a href="#back" id="btn-back" class="btn text-light bg-theme-trans"> &#11207; Back</a>
                    <a href="#skip" id="btn-skip" class="btn text-dark bg-white">Skip &#11208;&#11208;</a>
                </div>
            </div><!-- //Container -->
            
            <div class="container-md">
                <div class="row align-items-center">
                    <div class="col-md-12 text-center">
                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/10/faviconV2.png" alt="Larrys Lanes" />
                    </div><!-- //Col -->
            
                    <div class="col-md-12 pt-4 pt-md-0 text-center">
                        <!--<div class="h6 text-dark text-uppercase font-weight-bold mb-1">Booking For</div>
                        <h2 class="heading-poster display-5 mb-1">
                            <span class="venue-text text-white text-uppercase d-block">Hartlepool</span>
                        </h2>-->
                        
                        <div class="divider">
                            <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Asset-6.svg" alt="Divider" />
                        </div>
                        
                        <div class="d-flex justify-content-center py-3">
                            <span class="selected-datetime h5 py-2 px-3 mx-1 bg-white-90">15/08/2025 @15:00</span>
                            <span class="selected-people h5 py-2 px-3 mx-1 bg-white-90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                x4</span>
                        </div>
                        
                    </div><!-- //Col -->
                </div>
                
            </div><!-- //Container -->
            
            <div class="container py-5">
                <h2 class="heading-poster display-5 text-center mb-5 transform-rotate">
                    <span class="py-2 px-3 text-white text-uppercase bg-theme-blue d-inline-block"><?php _e("Select Activities"); ?></span>
                </h2>
                <form id="step-3-form">
                    <div class="row activities packages_n_games">
    					
                        <div class="col-md-4 bowling-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ ten-pin-bowling">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/ten-pin-bowling.jpg" alt="Ten Pin Bowling" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-8">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Ten Pin Bowling</h3>
                                            <h5 class="h5 heading-font">£10.00</h5>
                                            <p>Per Person</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Ten-Pin-Bowling.svg" alt="Ten Pin Bowling" />
                                    </div>
                                </div><!-- //Game-Panel -->
                                
                                <div class="mt-2 activities">
    								<span class="select-game py-3 w-100 text-uppercase custom-checkbox-container">
    								 <input type="checkbox" name="activities[]" id="ten-pin-bowling" class="custom-checkbox" data-title="Ten Pin Bowling" data-catid="13177">
    								    <label class="custom-label" for="ten-pin-bowling">
    								        <span class="text-select">Select</span>
                                            <span class="text-added">Added</span>
                                        </label>
                                    </span>
                                </div>
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 bowling-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ american-pool">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/american-pool.jpg" alt="American Pool" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-8">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">American Pool</h3>
                                            <h5 class="h5 heading-font">£18.00</h5>
                                            <p>Per Game</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/American-Pool.svg" alt="American Pool" />
                                    </div>
                                </div><!-- //Game-Panel -->
                                
                                <div class="mt-2 activities">
    								<span class="select-game py-3 w-100 text-uppercase custom-checkbox-container">
    								 <input type="checkbox" name="activities[]" id="american-pool" class="custom-checkbox" data-title="American Pool" data-catid="13178">
    								    <label class="custom-label" for="american-pool">
    								        <span class="text-select">Select</span>
                                            <span class="text-added">Added</span>
                                        </label>
                                    </span>
                                </div>
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 bowling-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ crazy-pool">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/crazy-pool.jpg" alt="Crazy Pool" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-8">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Crazy Pool</h3>
                                            <h5 class="h5 heading-font">£8.00</h5>
                                            <p>Per Game</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Crazy-pool.svg" alt="Crazy Pool" />
                                    </div>
                                </div><!-- //Game-Panel -->
                                
                                <div class="mt-2 activities">
    								<span class="select-game py-3 w-100 text-uppercase custom-checkbox-container">
    								 <input type="checkbox" name="activities[]" id="crazy-pool" class="custom-checkbox" data-title="Crazy Pool" data-catid="13179">
    								    <label class="custom-label" for="crazy-pool">
    								        <span class="text-select">Select</span>
                                            <span class="text-added">Added</span>
                                        </label>
                                    </span>
                                </div>
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 bowling-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ shuffleboard">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/shuffleboard.jpg" alt="Shuffleboard" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-8">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Shuffleboard</h3>
                                            <h5 class="h5 heading-font">£20.00</h5>
                                            <p>Per Game</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Shuffleboard.svg" alt="Shuffleboard" />
                                    </div>
                                </div><!-- //Game-Panel -->
                                
                                <div class="mt-2 activities">
    								<span class="select-game py-3 w-100 text-uppercase custom-checkbox-container">
    								 <input type="checkbox" name="activities[]" id="shuffleboard" class="custom-checkbox" data-title="Shuffleboard" data-catid="13180">
    								    <label class="custom-label" for="shuffleboard">
    								        <span class="text-select">Select</span>
                                            <span class="text-added">Added</span>
                                        </label>
                                    </span>
                                </div>
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 bowling-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ bank-shuffleboard">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/bank-shuffleboard.jpeg" alt="Bank Shuffleboard" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-8">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Bank Shuffleboard</h3>
                                            <h5 class="h5 heading-font">£20.00</h5>
                                            <p>Per Game</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Backshot-shuffleboard.svg" alt="Bank Shuffleboard" />
                                    </div>
                                </div><!-- //Game-Panel -->
                                
                                <div class="mt-2 activities">
    								<span class="select-game py-3 w-100 text-uppercase custom-checkbox-container">
    								 <input type="checkbox" name="activities[]" id="bank-shuffleboard" class="custom-checkbox" data-title="Bank Shuffleboard" data-catid="13181">
    								    <label class="custom-label" for="bank-shuffleboard">
    								        <span class="text-select">Select</span>
                                            <span class="text-added">Added</span>
                                        </label>
                                    </span>
                                </div>
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 bowling-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ ping-pong">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/ping-pong.jpg" alt="Ping Pong" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-8">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Ping Pong</h3>
                                            <h5 class="h5 heading-font">£16.00</h5>
                                            <p>Per Game</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/PingPong.svg" alt="Ping Pong" />
                                    </div>
                                </div><!-- //Game-Panel -->
                                
                                <div class="mt-2 activities">
    								<span class="select-game py-3 w-100 text-uppercase custom-checkbox-container">
    								 <input type="checkbox" name="activities[]" id="ping-pong" class="custom-checkbox" data-title="Ping Pong" data-catid="13182">
    								    <label class="custom-label" for="ping-pong">
    								        <span class="text-select">Select</span>
                                            <span class="text-added">Added</span>
                                        </label>
                                    </span>
                                </div>
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 bowling-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ beer-pong">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/beer-pong.jpg" alt="Beer Pong" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-8">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Beer Pong</h3>
                                            <h5 class="h5 heading-font">£20.00</h5>
                                            <p>Per Game</p>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Beer-Pong.svg" alt="Beer Pong" />
                                    </div>
                                </div><!-- //Game-Panel -->
                                
                                <div class="mt-2 activities">
    								<span class="select-game py-3 w-100 text-uppercase custom-checkbox-container">
    								 <input type="checkbox" name="activities[]" id="beer-pong" class="custom-checkbox" data-title="Beer Pong" data-catid="13183">
    								    <label class="custom-label" for="beer-pong">
    								        <span class="text-select">Select</span>
                                            <span class="text-added">Added</span>
                                        </label>
                                    </span>
                                </div>
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                    </div>
                </form>
                
                <div class="fixed-bottom position-fixed w-100 bg-white">
                    <div class="d-flex justify-content-around py-3 transform-rotate">
                        <span class="button"><a href="#activitiesbox" id="available-step-3" class="btn btn-theme-style text-white"><span>Next</span></a></span>
                    </div>
                </div>
				

            </div><!-- // Container -->
            
        </div><!-- //Section -->
        
		 <div class="section d-none" id="booking-step-4">
				<div class="container">
				    <h2 class="heading-poster display-5 text-center mt-4 mb-5 transform-rotate">
				        <span class="py-2 px-3 text-white text-uppercase bg-theme-blue d-inline-block">Select Times</span>
				    </h2>
				<div class="booking-availability" id="booking-availability" data-venue_id="15912" data-date="2024-12-31" data-interval="10">
					  
					  <?php get_template_part('booked_it/time_slots/ten-pin-bowling-time-slots', null, [
							'zone_id' => '3376',
							'category' => '13177',
							'pid' => '',
							'price' => 10,
							'time_diff'=>10,
							'heading'=>'Ten Pin Bowling'
						]);
						get_template_part('booked_it/time_slots/americanpool-time-slots', null, [
							'zone_id' => '3377',
							'category' => '13178',
							'pid' => '',
							'price' => 18,
							'time_diff'=>60,
							'heading'=>'American Pool'
						]);
						get_template_part('booked_it/time_slots/crazypool-time-slots', null, [
							'zone_id' => '3378',
							'category' => '13179',
							'pid' => '',
							'price' => 8,
							'time_diff'=>60,
							'heading'=>'Crazy Pool'
						]);
						get_template_part('booked_it/time_slots/shuffleboard-time-slots', null, [
							'zone_id' => '3379',
							'category' => '13180',
							'pid' => '',
							'price' => 20,
							'time_diff'=>60,
							'heading'=>'Shuffleboard'
						]);
						get_template_part('booked_it/time_slots/back-shuffleboard-time-slots', null, [
							'zone_id' => '3380',
							'category' => '13181',
							'pid' => '',
							'price' => 20,
							'time_diff'=>60,
							'heading'=>'Bank Shuffleboard'
						]);
						get_template_part('booked_it/time_slots/pingpong-time-slots', null, [
							'zone_id' => '3381',
							'category' => '13182',
							'pid' => '',
							'price' => 16,
							'time_diff'=>60,
							'heading'=>'Ping Pong'
						]);
						get_template_part('booked_it/time_slots/beerpong-time-slots', null, [
							'zone_id' => '3376',
							'category' => '13183',
							'pid' => '',
							'price' => 20,
							'time_diff'=>60,
							'heading'=>'Beer Pong'
						]);?>
					
                </div> <!-- // Times Box -->
				    <div class="fixed-bottom position-fixed w-100 bg-white">
                    <div class="d-flex justify-content-around py-3 transform-rotate">
                        <span class="button"><a href="#activitiesbox" id="available-step-4" class="btn btn-theme-style text-white"><span>Next</span></a></span>
                    </div>
                </div>
		</div>	<!-- //Section -->
		
    </div><!-- //Page Content -->
</main>

<?php get_footer('packages'); ?>
