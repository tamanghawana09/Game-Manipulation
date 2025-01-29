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

<div class="pp-container text-center">
<?php
if ( post_password_required() && !is_user_logged_in() ) { ?>
    <style>
    .pp-container {
        text-align: center !important;
        margin: 0 auto;
        width: 600px;
        background: #ffffff;
        padding: 40px;
    }
    .post-password-form p {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .post-password-form input[type='submit'] {
        color: #ffffff;
    }
    </style>
<?php
    // Custom message or content for password-protected pages
    echo '<h2>This page is protected</h2>';
    echo '<p>Please enter the password to view this content.</p>';
    echo get_the_password_form(); // Displays the password form
    return;
} 

?>
</div>

<main id="content" <?php post_class( 'site-main' ); ?>>
    <div class="page-content pt-3 pb-5">
        
        <?php //get_template_part('booked_it/booking-header'); ?>
        <div class="position-absolute return-home"><a href="https://www.larryslanes.com/" class="btn px-4 bg-white"><span>Return Home</span></a></div>
        
        <div class="section" id="booking-step-2">
            <div class="container-fluid px-5 mb-5 d-none">
                <div class="row justify-content-between backskip-row">
                    <a href="#back" id="btn-back" class="btn text-light bg-theme-trans"> &#11207; Back</a>
                    <!--<a href="#skip" id="btn-skip" class="btn text-dark bg-white">Skip &#11208;&#11208;</a>-->
                </div>
            </div><!-- //Container -->
            
            <div class="container-md">
                <div class="row align-items-center">
                    <div class="col-md-12 text-center">
                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/larrylane.png" width="140" alt="Larrys Lanes" />
                    </div><!-- //Col -->
            
                    <div class="col-md-12 pt-2 text-center">
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
            
            <div class="container-lg py-5">
                <h2 class="heading-poster display-5 text-center mb-4 pb-2 transform-rotate">
                    <span class="py-2 px-3 text-white text-uppercase bg-theme-blue d-inline-block"><?php _e("Date, Time, & Guests"); ?></span>
                </h2>
                
				<form id="step-2-form" class="position-relative">
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
                            <div class="position-relative dropdown dropdown-ppl  mb-3">
                                <?php
                                    // Example: Retrieve the selected number of guests from a query parameter, session, or other source
                                    $selected_guests = isset($_GET['guests']) ? (int) $_GET['guests'] : null;
                                    
                                    // Maximum number of guests options
                                    $max_guests = 29;
                                ?>
                                
                                <?php /*<select id="no_people" class="no_people custom-select form--select" onchange="updateKidsSelect(this.value)">
                                    <option value="">Select Adults</option>
                                    <?php for ($i = 1; $i <= $max_guests; $i++) : ?>
                                        <option value="<?php echo $i; ?>" <?php selected($i, $selected_guests); ?>>
                                            <?php echo $i; ?>
                                        </option>
                                    <?php endfor; ?>
                                    <option value="30" <?php selected(30, $selected_guests); ?>>30 or More</option>
                                </select>*/?>
                                <button name="button1" class="dropdown-toggle people-toggle btn-block text-left text-dark bg-white" 
                                    type="button" id="dp_people" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                  <span class="val">No. of People</span>
                                </button>
                                
                                <div class="dropdown-menu dropdown-menu-center w-100 dp_people" aria-labelledby="dp_people">
                                  <div class="dropdown-item d-flex px-2 border-bottom bg-white">
                                    <div class="col-6 text-dark">Adults</div>
                                    <div class="input-group flex-nowrap input-number-group">
                                      <div class="input-group-button">
                                        <span class="input-number-decrement btn btn-dark">-</span>
                                      </div>
                                      <input class="input-number px-2 ad" type="number" value="0" min="1" max="30" name="adult">
                                      <div class="input-group-button">
                                        <span class="input-number-increment btn btn-dark">+</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div class="dropdown-item d-flex px-2 bg-white">
                                    <div class="col-6 text-dark">Kids</div>
                                    <div class="input-group flex-nowrap input-number-group">
                                      <div class="input-group-button">
                                        <span class="input-number-decrement btn btn-dark">-</span>
                                      </div>
                                      <input class="input-number px-2 kd" type="number" value="0" min="0" max="30" name="kids">
                                      <div class="input-group-button">
                                        <span class="input-number-increment btn btn-dark">+</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div class="dropdown-item d-flex px-2 bg-white">
                                    <div class="col-6 text-dark">Concessions</div>
                                    <div class="input-group flex-nowrap input-number-group">
                                      <div class="input-group-button">
                                        <span class="input-number-decrement btn btn-dark">-</span>
                                      </div>
                                      <input class="input-number px-2 dca" type="number" value="0" min="0" max="30" name="concession">
                                      <div class="input-group-button">
                                        <span class="input-number-increment btn btn-dark">+</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div class="col-12 mb-1"><small>Concession rate is disabled, their carers & over 60s (ID may be asked for)</small></div>

                                  <div class="dropdown-item text-center bg-white">
                                    <button name="button2" class="btn btn-block text-white">Confirm</button>
                                  </div>
                                </div>
                                
                            </div>
                        </div><!-- //Col -->
                        <?php /*<div class="col-md-3 transform-rotate">
                            <div class="position-relative mb-3">
                                <?php
                                    // Example: Retrieve the selected number of guests from a query parameter, session, or other source
                                    $selected_guests = isset($_GET['guests']) ? (int) $_GET['guests'] : null;
                                    
                                    // Maximum number of guests options
                                    $max_guests = 29;
                                ?>
                                
                                <select id="no_people_kids" class="no_people_kids custom-select form--select">
                                    <option value="">Select Kids</option>
                                    <?php for ($i = 1; $i <= $max_guests; $i++) : ?>
                                        <option value="<?php echo $i; ?>" <?php selected($i, $selected_guests); ?>>
                                            <?php echo $i; ?>
                                        </option>
                                    <?php endfor; ?>
                                    <option value="30" <?php selected(30, $selected_guests); ?>>30 or More</option>
                                </select>
                                
                            </div>
                        </div>*/?><!-- //Col -->
                        
                        <div class="col-md-4 transform-rotate">
                            <div class="position-relative mb-3">
                                <?php get_template_part('booked_it/time-dropdown'); ?>
                            </div>    
                        </div><!-- //Col -->
                    
                    </div>
                </form>
                
                <div class="wrap-md">
                    <!-- <div class="h6 text-white my-4 text-center">Larrys Lanes is strictly an over 18’s venue.</div> -->
                            
                    <div class="d-flex justify-content-around py-3 align-items-center transform-rotate">
                        <span class="site-logo"><img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/larrylane.png" alt="Larrys Lanes" /></span>
                        <span class="button"><a href="#activitiesbox" id="available-step-2" class="btn btn-theme-style text-white"><span>Next</span></a></span>
                    </div>
                </div>
                
            </div><!-- // Container -->
            
        </div><!-- //Section -->
        
        
        <div class="section d-none" id="booking-step-3">
            <div class="container-fluid px-5 mb-5">
                <div class="row justify-content-between backskip-row">
                    <a href="#back" id="btn-back" class="btn btn-goback text-light bg-theme-trans"> &#11207; Back</a>
                    <!-- <a href="#skip" id="btn-skip" class="btn text-dark bg-white">Skip &#11208;&#11208;</a> -->
                </div>
            </div><!-- //Container -->
            
            <div class="container-md">
                <div class="row align-items-center">
                    <div class="col-md-12 text-center">
                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/larrylane.png" width="140" alt="Larrys Lanes" />
                    </div><!-- //Col -->
            
                    <div class="col-md-12 pt-4 pt-md-0 text-center">
                        <!--<div class="h6 text-dark text-uppercase font-weight-bold mb-1">Booking For</div>
                        <h2 class="heading-poster display-5 mb-1">
                            <span class="venue-text text-white text-uppercase d-block">Hartlepool</span>
                        </h2>-->
                        
                        <div class="divider">
                            <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Asset-6.svg" alt="Divider" />
                        </div>
                        
                        <!-- <div class="d-flex justify-content-center py-3">
                            <span class="selected-datetime h5 py-2 px-3 mx-1 bg-white-90">15/08/2025 @15:00</span>
                            <span class="selected-people h5 py-2 px-3 mx-1 bg-white-90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                x4</span>
                        </div> -->
                        
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
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ bowling">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/11/Bowling.jpeg" alt="Bowling" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-12">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Bowling</h3>
                                            <h5 class="h6">Adults <span class="bowlAdlPrice">£7.00</span> / Child <span class="bowlChlPrice">£5.00</span> 
                                                / Concession £3.00
                                            </h5>
                                            <!-- <p>per person per game</p> -->
                                            <!--<div class="concessions">
                                                <span class="select-game w-100 custom-checkbox-container">
                                                    <input type="checkbox" name="concessions[]" id="concessions" class="custom-checkbox" data-title="Concessions" />
                                                    <label class="custom-label small-label text-dark" for="concessions">Concessions <small>Concession rate is disabled, their carers & over 60s (ID may be asked for)</small></label> 
                                                </span>
                                            </div>-->
                                        </div>
                                    </div>
                                    <!--<div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Ten-Pin-Bowling.svg" alt="Bowling" />
                                    </div>-->
                                </div><!-- //Game-Panel -->

                                
                                <div class="row justify-content-between">
                                    <div class="col-xs-6">
                                        <div class="mt-2 activities">
            								<span class="select-game py-2 w-100 text-uppercase custom-checkbox-container">
            								 <input type="checkbox" name="activities[]" id="bowling" class="custom-checkbox" data-title="Bowling" data-catid="13953">
            								    <label class="custom-label" for="bowling">
            								        <span class="text-select">Select</span>
                                                    <span class="text-added">Added</span>
                                                </label>
                                            </span>
                                        </div>
                                       
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="select_game py-2">
                                            <select name="bowling" id="" class="">
                                                <option value="">Select Game</option>
                                                <option value="1">1 Game</option>
                                                <option value="2">2 Games</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 familydeal-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ bowling">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/11/Bowling.jpeg" alt="Bowling Family Deal" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-12">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Bowling Family Deal</h3>
                                            <h5 class="h6">Starting from <span class="bowlFmlPrice">£20.00</span></h5>
                                            <!-- <p>per person per game</p> -->
                                        </div>
                                    </div>
                                    <!--<div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Ten-Pin-Bowling.svg" alt="Bowling" />
                                    </div>-->
                                </div><!-- //Game-Panel -->

                                
                                <div class="row justify-content-between">
                                    <div class="col-xs-6">
                                        <div class="mt-2 activities">
            								<span class="select-game py-2 w-100 text-uppercase custom-checkbox-container">
            								 <input type="checkbox" name="activities[]" id="bowling_family" class="custom-checkbox" data-title="BowlingFamily" data-catid="99">
            								    <label class="custom-label" for="bowling_family">
            								        <span class="text-select">Select</span>
                                                    <span class="text-added">Added</span>
                                                </label>
                                            </span>
                                        </div>
                                       
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="select_game py-2">
                                            <select name="bowling_family" id="" class="">
                                                <option value="">Select Game</option>
                                                <option value="1">1 Game</option>
                                                <option value="2">2 Games</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 darts-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ darts">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/11/Dart.jpeg" alt="Darts" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-12">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Darts</h3>
                                            <h5 class="h6">Standard Price £6.50</h5>
                                            <!-- <p>per person per game</p> -->
                                        </div>
                                    </div>
                                    <!--<div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/American-Pool.svg" alt="Darts" />
                                    </div>-->
                                </div><!-- //Game-Panel -->
                                
                                <div class="row justify-content-between">
                                    <div class="col-xs-6">
                                        <div class="mt-2 activities">
            								<span class="select-game py-2 w-100 text-uppercase custom-checkbox-container">
            								 <input type="checkbox" name="activities[]" id="darts" class="custom-checkbox" data-title="Darts" data-catid="13956">
            								    <label class="custom-label" for="darts">
            								        <span class="text-select">Select</span>
                                                    <span class="text-added">Added</span>
                                                </label>
                                            </span>
                                        </div>                                        
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="select_game py-2">
                                            <select name="darts" id="" class="">
                                                <option value="">Select Time</option>
                                                <option value="1">30 Minutes</option>
                                                <option value="2">60 Minutes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 pool-tables-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ pool-tables">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/11/Pool.jpeg" alt="Pool Tables" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-12">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Pool Tables</h3>
                                            <h5 class="h6">Standard Price £5.00</h5>
                                            <!-- <p>per person per game</p> -->
                                        </div>
                                    </div>
                                    <!--<div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Crazy-pool.svg" alt="Crazy Pool" />
                                    </div>-->
                                </div><!-- //Game-Panel -->
                                
                                <div class="row justify-content-between">
                                    <div class="col-xs-6">

                                        <div class="mt-2 activities">
            								<span class="select-game py-2 w-100 text-uppercase custom-checkbox-container">
            								 <input type="checkbox" name="activities[]" id="pool-tables" class="custom-checkbox" data-title="Pool Tables" data-catid="13954">
            								    <label class="custom-label" for="pool-tables">
            								        <span class="text-select">Select</span>
                                                    <span class="text-added">Added</span>
                                                </label>
                                            </span>
                                        </div>
                                       
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="select_game py-2">
                                            <select name="pool" id="" class="">
                                                <option value="">Select Time</option>
                                                <option value="1">30 Minutes</option>
                                                <option value="2">60 Minutes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 shuffleboard-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ shuffleboard">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/11/Shuffleboard.jpeg" alt="Curling" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-12">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Shuffleboard</h3>
                                            <h5 class="h6">Standard Price £15.00</h5>
                                            <!-- <p>per person per game</p> -->
                                        </div>
                                    </div>
                                    <!--<div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Shuffleboard.svg" alt="Curling" />
                                    </div>-->
                                </div><!-- //Game-Panel -->

                                <div class="row justify-content-between">
                                    <div class="col-xs-6">
                                        <div class="mt-2 activities">
            								<span class="select-game py-2 w-100 text-uppercase custom-checkbox-container">
            								 <input type="checkbox" name="activities[]" id="shuffleboard" class="custom-checkbox" data-title="Shuffleboard" data-catid="13955">
            								    <label class="custom-label" for="shuffleboard">
            								        <span class="text-select">Select</span>
                                                    <span class="text-added">Added</span>
                                                </label>
                                            </span>
                                        </div>
                                          
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="select_game py-2">
                                            <select name="shuffleboard" id="" class="">
                                                <option value="">Select Time</option>
                                                <option value="1">30 Minutes</option>
                                                <option value="2">60 Minutes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                            </div><!-- //Game-Panel -->
                        </div><!-- //Col -->
                        
                        <div class="col-md-4 tables-box">
                            <div class="game-panel p-3 mb-4 bg-white shadow rounded-sm activities_ tables">
                                <div class="game-image mb-3">
                                    <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/11/Book-table.jpeg" alt="Bank Shuffleboard" />
                                </div>
                                <div class="game-panel-content row no-gutters">
                                    <div class="col-12">
                                        <div class="title-and-price">
                                            <h3 class="heading-poster">Want to book a table?</h3>
                                            <h5 class="h6">2 Hour Booking</h5>
                                            <!-- <p>per person per game</p> -->
                                        </div>
                                    </div>
                                    <!--<div class="col-4">
                                        <img src="<?php echo get_home_url(); ?>/wp-content/uploads/2024/08/Backshot-shuffleboard.svg" alt="Bank Shuffleboard" />
                                    </div>-->
                                </div><!-- //Game-Panel -->
                                

                                <div class="row justify-content-between">
                                    <div class="col-xs-12">
                                        <div class="mt-2 activities">
            								<span class="select-game py-2 w-100 text-uppercase custom-checkbox-container">
            								 <input type="checkbox" name="activities[]" id="tables" class="custom-checkbox" data-title="Tables" data-catid="5344">
            								    <label class="custom-label" for="tables">
            								        <span class="text-select">Select</span>
                                                    <span class="text-added">Added</span>
                                                </label>
                                            </span>
                                        </div>
                                          
                                    </div>
                                    <!--<div class="col-xs-6">
                                        <div class="select_game py-2">
                                            <select name="select" id="" class="">
                                                <option value="">Select Time</option>
                                                <option value="30">30 Minutes</option>
                                                <option value="60">60 Minutes</option>
                                            </select>
                                        </div>
                                    </div>-->
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
            
            <div class="container-fluid px-5 mb-5">
                <div class="row justify-content-between backskip-row">
                    <a href="#back" id="btn-back" class="btn btn-goback btn-goback-step3 text-light bg-theme-trans"> &#11207; Back</a>
                    <!--<a href="#skip" id="btn-skip" class="btn text-dark bg-white">Skip &#11208;&#11208;</a>-->
                </div>
            </div><!-- //Container -->

				<div class="container">
				    <h2 class="heading-poster display-5 text-center mt-4 mb-5 transform-rotate">
				        <span class="py-2 px-3 text-white text-uppercase bg-theme-blue d-inline-block">Select Times</span>
				    </h2>

                    <!-- prev 15912 -->
    				<div class="booking-availability" id="booking-availability" data-venue_id="12605" data-date="2024-12-31" data-interval="10" data-event_id="Larry" data-strict="1">
					  
					  <?php 
                        get_template_part('booked_it/time_slots/bowling-time-slots', null, [
							'zone_id' => '895',
							'category' => '13953',
							'pid' => '118686796',
							'cid' => '118687182',
							'dcaid' => '121597514',
							'price' => 5.5,
							'time_diff'=>10,
							'heading'=>'Bowling'
						]);
                        get_template_part('booked_it/time_slots/family-bowling-time-slots', null, [
                            'zone_id' => '895',
                            'category' => '99',
                            'pid' => '35754924',
                            'price' => 5.5,
                            'time_diff'=>10,
                            'heading'=>'Family Deal',
                            'wrapper_class' => 'bowlingfamily-time'
                        ]);
						get_template_part('booked_it/time_slots/darts-time-slots', null, [
							'zone_id' => '3594',
							'category' => '13956',
							'pid' => '118688033',
							'price' => 6.5,
							'time_diff'=>30,
							'heading'=>'Darts'
						]);
						get_template_part('booked_it/time_slots/pool-tables-time-slots', null, [
							'zone_id' => '3592',
							'category' => '13954',
							'pid' => '118688027',
							'price' => 5,
							'time_diff'=>30,
							'heading'=>'Pool Tables'
						]);
						get_template_part('booked_it/time_slots/shuffleboard-time-slots', null, [
							'zone_id' => '3593',
							'category' => '13955',
							'pid' => '118688029',
							'price' => 15,
							'time_diff'=>30,
							'heading'=>'Shuffleboard'
						]);
						get_template_part('booked_it/time_slots/tables-time-slots', null, [
							'zone_id' => '1143',
							'category' => '5344',
							'pid' => '43814400',
							'price' => 20,
							'time_diff'=>120,
							'overlapping_time'=>30,
							'heading'=>'Tables'
						]);
						?>
					
                </div> <!-- // Times Box -->
				    <div class="fixed-bottom position-fixed w-100 bg-white">
                    <div class="d-flex justify-content-around py-3 transform-rotate">
                        <span class="button"><a href="#activitiesbox" id="available-step-4" class="btn btn-theme-style text-white disabled"><span>Next</span></a></span>
                    </div>
                </div>
		</div>	<!-- //Section -->
		
    </div><!-- //Page Content -->
</main>
<script>
    function updateKidsSelect(adults) {
        var kidsSelect = document.getElementById('no_people_kids');
        var maxKids = 30 - adults;
        kidsSelect.innerHTML = '';
        for (var i = 0; i <= maxKids; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = i;
            kidsSelect.add(option);
        }
        //kidsSelect.add(new Option('30 or More', '30'));
    }
</script>
<?php get_footer('packages'); ?>