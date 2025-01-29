<h2>Actions</h2>
<?php 
$d1 = new DateTime($order->date);
$d1->modify('-' . $options['deadline_modify_period']['interval'] . ' ' . $options['deadline_modify_period']['type']);
#var_dump($order->date);
#$order_created = new DateTime($order->created);
$booking_date = new DateTime($order->date);
$current_time = new DateTime();

$interval = $booking_date->diff($current_time);
#var_dump($interval->h + ($interval->days * 24));
if ($interval->h + ($interval->days * 24) < 120) {
    $can_modify = false;
} else {
    $can_modify = true;
}
?>
<?php if (
	isset($_REQUEST['order_id']) && $_REQUEST['order_id'] && 
	isset($_SESSION['pht_membership']) && $_SESSION['pht_membership'] && 
	!(isset($options['show_buttons_on_sub_orders']) && $options['show_buttons_on_sub_orders'])
) : ?>
	<div class="actions row">
		<div class="b-action">
			<a href="<?=get_site_url();?>/my-account"><?=__('Back to main account');?></a>
		</div>
	</div>
<?php else: ?>
	<div class="actions row">
		<?php if (isset($options['resend_confirmation']) && $options['resend_confirmation'] == 1) : ?>
			<div class="b-action">
				<a class="resend" href="#" data-toggle="bit-modal" data-target="#reset-confirmation">
					<?=__('Resend Confirmation') ?>
				</a>
			</div>
		<?php endif; ?>
		<?php if (isset($options['download_confirmation']) && $options['download_confirmation'] == 1) : ?>
			<div class="b-action">
				<a
					class="download loading"
					href="<?=get_site_url();?>/download-confirmation"
					data-default="Download Order Confirmation PDF"
					data-loading="Downloading ..."
				>
					<?=__('Download Confirmation PDF') ?>
				</a>
			</div>
		<?php endif; ?>
		<?php if (isset($options['refund']) && $options['refund'] == 1) : ?>
			<?php if ($order->remaining_payment > 0): ?>
				<div class="b-action">
					<a 
						class="refund"
						href="https://bookedit.licklist.co.uk/iframe/payment/orders/refund_request/<?=$order->venue_id?>/<?=$order->id?>?token=<?=$order->token?>"
						target="_blank"
					>
						<?=__('Request a refund') ?>
					</a>
				</div>
			<?php endif; ?>
		<?php endif; ?>
		<?php if (isset($options['send_message']) && $options['send_message'] == 1) : ?>
			<div class="b-action">
				<a class="send-message" href="#" data-toggle="bit-modal" data-target="#send-message-modal">
					<?=__('Contact Us');?>
				</a>
			</div>
		<?php endif; ?>
		<?php if (
			isset($options['tickets_data']) && $options['tickets_data'] &&
			isset($order->populate_tickets) && $order->populate_tickets
		) : ?>
			<div class="b-action">
				<a class="populate-tickets" href="#" data-toggle="bit-modal" data-target="#populate-tickets-modal">
					<?=__('Populate Guest Details');?>
				</a>
			</div>
		<?php endif; ?>
		<?php #var_dump($order->id); ?>
		<?php if ((isset($options['modify']) && $options['modify'] == 1 && $can_modify)
		||
		$order->id=="4019190") : ?>
			<div class="b-action">
				<?php if (isset($options['modify_url']) && $options['modify_url']): ?>
					<a 
						href="<?=$options['modify_url'] . (strpos($options['modify_url'], '?') === false ? '?' : '&') . 'mode=edit';?>" 
						class="<?=(
							isset($options['modify_url_placement']) && $options['modify_url_placement'] ? 
							'iframe-modal' : ''
						);?> modify refreshable"
					>
						<?=__('Modify Booking') ?>
					</a>
				<?php else: ?>
					<a 
						href="https://bookedit.licklist.co.uk/popup/payment/orders/modify/<?=$order->venue_id?>/<?=$order->id?>?token=<?=$order->token?>" 
						class="iframe-modal modify refreshable"
					>
						<?=__('Modify Booking') ?>
					</a>
				<?php endif; ?>
			</div>
		<?php endif;?>
		<?php if (isset($options['view_other_bookings']) && $options['view_other_bookings'] == 1) : ?>
			<div class="b-action">
				<a class="logout" href="<?=get_site_url();?>/logout-again">View My Other Bookings</a>
			</div>
		<?php endif;?>
		<?php if (!($order->Waiver === false)) : ?>
			<div class="b-action">
				<a class="waiver" target="_blank" href="https://bookedit.licklist.co.uk/iframe/payment/waivers/add/<?=$order->id;?>/<?=$order->token;?>">Sign a Waiver</a>
			</div>
		<?php endif; ?>
		<div class="b-action">
			<a class="pre-order-drinks" href="<?=get_site_url();?>/drinks-menu">Pre-order Drinks</a>
		</div>
		<div class="b-action">
			<a class="logout" href="<?=get_site_url();?>/logout">Log out</a>
		</div>
	</div>
<?php endif; ?>