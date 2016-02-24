<?php
/**
 * Single Product Meta
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $post, $product;
?>

<hr class="separator separator--striped">
<footer class="entry__meta entry__meta--project row cf  push--top  push--bottom">
	<?php do_action( 'woocommerce_product_meta_start' ); ?>

	<?php if ( $product->is_type( array( 'simple', 'variable' ) ) && get_option( 'woocommerce_enable_sku' ) == 'yes' && $product->get_sku() ) : ?>
		<span itemprop="productID" class="sku_wrapper"><?php _e( 'SKU:', 'woocommerce' ); ?> <span class="sku"><?php echo $product->get_sku(); ?></span>.</span>
	<?php endif;

		$size = sizeof( get_the_terms( $post->ID, 'product_cat' ) );
		echo $product->get_categories( ' ', '<div class="entry__meta-box meta-box--categories col-12 hand-col-6">' . _n( '<span class="meta-box__box-title">Category:</span>', '<span class="meta-box__box-title">Categories:</span>', $size, 'woocommerce' ) . '', '</div>' );

		$size = sizeof( get_the_terms( $post->ID, 'product_tag' ) );
		echo $product->get_tags( ' ', '<div class="entry__meta-box meta-box--categories col-12 hand-col-6">' . _n( '<span class="meta-box__box-title">Tag:</span>', '<span class="meta-box__box-title">Tags:</span>', $size, 'woocommerce' ) . '', '</div>' );

		if (wpgrade::option('portfolio_single_show_share_links')): ?>
			<script type="text/javascript">/* --- MAKE POPUPS --- */function popitup(url, title) {newwindow=window.open(url,title,'height=300,width=600');if (window.focus) {newwindow.focus()}	return false; } </script>

			<div class="social-links  col-12 hand-col-6">
				<span class="social-links__message"><?php _e("Share", 'lens'); ?>: </span>
				<ul class="social-links__list">
				</ul>
			</div>
		<?php endif; ?>


	<?php do_action( 'woocommerce_product_meta_end' ); ?>

</footer><!-- .entry__meta .entry__meta-project -->