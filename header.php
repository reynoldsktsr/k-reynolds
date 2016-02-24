<?php //this is just for the doctype and <head> section
get_template_part( 'theme-partials/header/head' );

$class_name = '';
if ( is_page() && get_page_template_slug( get_the_ID() ) == 'template-journal.php' ) {
	$class_name .= ' blog';
}

$data_ajaxloading     = ( wpgrade::option( 'use_ajax_loading' ) && ! is_customize_preview() ) ? 'data-ajaxloading' : '';
$data_smoothscrolling = ( wpgrade::option( 'use_smooth_scroll' ) ) ? 'data-smoothscrolling' : '';

//we use this so we can generate links with post id
//right now we use it to change the Edit Post link in the admin bar
$data_currentID         = '';
$data_currentEditString = '';
$data_currentTaxonomy   = '';
if ( ( wpgrade::option( 'use_ajax_loading' ) ) && ! is_customize_preview() ) {
	global $wp_the_query;
	$current_object = $wp_the_query->get_queried_object();

	if ( ! empty( $current_object->post_type )
	     && ( $post_type_object = get_post_type_object( $current_object->post_type ) )
	     && current_user_can( 'edit_post', $current_object->ID )
	     && $post_type_object->show_ui && $post_type_object->show_in_admin_bar ) {

		$data_currentID = 'data-curpostid="' . $current_object->ID . '"';
		if ( isset( $post_type_object->labels ) && isset( $post_type_object->labels->edit_item ) ) {
			$data_currentEditString = 'data-curpostedit="' . $post_type_object->labels->edit_item . '"';
		}
	} elseif ( ! empty( $current_object->taxonomy )
	           && ( $tax = get_taxonomy( $current_object->taxonomy ) )
	           && current_user_can( $tax->cap->edit_terms )
	           && $tax->show_ui ) {

		$data_currentID       = 'data-curpostid="' . $current_object->term_id . '"';
		$data_currentTaxonomy = 'data-curtaxonomy="' . $current_object->taxonomy . '"';
		if ( isset( $tax->labels ) && isset( $tax->labels->edit_item ) ) {
			$data_currentEditString = 'data-curpostedit="' . $tax->labels->edit_item . '"';
		}
	}
}

if ( wpgrade::option( 'header_inverse' ) ) {
	$class_name .= " header-inverse";
}

if ( wpgrade::option( 'enable_copyright_overlay' ) ) {
	$class_name .= '  is--copyright-protected  ';
}

$woo_support = '';
if ( ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) )
     && wpgrade::option( 'enable_woocommerce_support' )
) {
	$woo_support = " data-woocommerce_enabled";
}
?>
<body <?php body_class( $class_name );
echo ' ' . $data_ajaxloading . ' ' . $data_smoothscrolling . ' ' . $data_currentID . ' ' . $data_currentEditString . ' ' . $data_currentTaxonomy . ' ' . $woo_support; ?>>
<div class="pace">
	<div class="pace-activity"></div>
</div>
<?php if ( wpgrade::option( 'enable_copyright_overlay' ) ) : ?>
	<div class="copyright-overlay">
		<div class="copyright-overlay__container">
			<div class="copyright-overlay__content">
				<?php echo wpgrade::option( 'copyright_overlay_text' ) ?>
			</div>
		</div>
	</div>
<?php endif; ?>
<div id="page">
	<nav class="navigation  navigation--mobile">
		<h2 class="accessibility"><?php _e( 'Primary Mobile Navigation', 'lens' ) ?></h2>

		<div id="nav-wrapper" class="djax-updatable">
			<?php
			wpgrade_main_nav_mobile();
			?>
		</div>
		<div class="nav-meta">
			<?php
			get_sidebar( 'header' );

			wpgrade_social_nav();
			?>
			<div class="site-info">
				<?php
				$copyright = wpgrade_callback_theme_general_filters( wpgrade::option( 'copyright_text' ) );
				echo $copyright; ?>
			</div>
			<!-- .site-info -->
		</div>
	</nav>
	<div class="wrapper">
		<?php //get the main header section - logo, nav, footer
		get_template_part( 'theme-partials/header/site' );

		/**
		 * Display static content like:
		 * - a serialized list with the enqueued resources on page load
		 */
		do_action( wpgrade::shortname() . '_before_dynamic_content' );
