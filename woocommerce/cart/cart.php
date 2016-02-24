<?php
/**
 * Cart Page
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.3.8
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

wc_print_notices();

do_action( 'woocommerce_before_cart' ); ?>

<form action="<?php echo esc_url( WC()->cart->get_cart_url() ); ?>" method="post" class="cart-form">

	<?php do_action( 'woocommerce_before_cart_table' ); ?>

	<table class="shop_table cart" cellspacing="0">
		<thead>
		<tr>
			<th class="product-thumbnail">&nbsp;</th>
			<th class="product-name"><?php _e( 'Product', 'woocommerce' ); ?></th>
			<th class="product-quantity"><?php _e( 'Quantity', 'woocommerce' ); ?></th>
			<th class="product-subtotal"><?php _e( 'Price', 'woocommerce' ); ?></th>
			<th class="product-remove">&nbsp;</th>
		</tr>
		</thead>
		<tbody>
		<?php do_action( 'woocommerce_before_cart_contents' );

		get_template_part('woocommerce/cart/cart-loop');

		do_action( 'woocommerce_cart_contents' );
		?>

	</tbody>
</table>

<!-- Totals -->
<?php woocommerce_cart_totals(); ?>

<tr class="cart-buttons">
	<td colspan="4" class="actions">

		<?php if ( WC()->cart->coupons_enabled() ) { ?>
			<div class="coupon"  style="display:none;">

				<label for="coupon_code"><?php _e( 'Coupon', 'woocommerce' ); ?>:</label> <input name="coupon_code" class="input-text" id="coupon_code" value="" /> <input type="submit" class="btn btn--medium" name="apply_coupon" value="<?php _e( 'Apply Coupon', 'woocommerce' ); ?>" />

				<?php do_action('woocommerce_cart_coupon'); ?>

			</div>
		<?php } ?>

		<?php if ( !wpgrade::option('use_ajax_loading') ) { ?>
			<input type="submit" class="button" name="update_cart" value="<?php _e( 'Update Cart', 'woocommerce' ); ?>" />
		<?php } ?>

		<?php wp_nonce_field('woocommerce-cart') ?>
	</td>
	<td class="product-remove"></td>

</tr>

<?php do_action( 'woocommerce_after_cart_contents' ); ?>

<?php do_action( 'woocommerce_after_cart_table' ); ?>

</form>

<?php do_action( 'woocommerce_after_cart' ); ?>
