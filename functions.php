<?php

// ensure EXT is defined
if ( ! defined('EXT')) {
	define('EXT', '.php');
}

// ensure REQUEST_PROTOCOL is defined
if ( ! defined('REQUEST_PROTOCOL')) {
	if (is_ssl()) {
		define( 'REQUEST_PROTOCOL', 'https:' );
	} else {
		define( 'REQUEST_PROTOCOL', 'http:' );
	}
}

// Loads the theme's translated strings
load_theme_textdomain( 'lens', get_template_directory() . '/languages/' );
#
# See: wpgrade-config.php -> include-paths for additional theme specific
# function and class includes
#

// Theme specific settings
// -----------------------

/*
 * Let WordPress manage the document title.
 * By adding theme support, we declare that this theme does not use a
 * hard-coded <title> tag in the document head, and expect WordPress to
 * provide it for us.
 */
add_theme_support( 'title-tag' );

// add theme support for post formats
// child themes note: use the after_setup_theme hook with a callback
$formats = array('quote', 'video', 'audio', 'gallery', 'image');
add_theme_support('post-formats', $formats);
add_theme_support( 'woocommerce' );

// Initialize system core
// ----------------------

require_once 'wpgrade-core/bootstrap'.EXT;

#
# Please perform any initialization via options in wpgrade-config and
# calls in wpgrade-core/bootstrap. Required for testing.
#

/**
 * http://codex.wordpress.org/Content_Width
 */
if ( ! isset($content_width)) {
	$content_width = 960;
}

/**
 * Add the global AddThis configuration in the <head>
 */
function lens_setup_addthis() {
	if ( ( is_singular('post') && lens_get_option( 'blog_single_show_share_links' ) ) ||
	     ( is_singular('lens_portfolio') && lens_get_option( 'portfolio_single_show_share_links' ) ) ) {
		//here we will configure the AddThis sharing globally
		get_template_part( 'inc/addthis/addthis-js-config' );
	}
}
add_action( 'wp_head', 'lens_setup_addthis' );

function wupdates_check_vpz6M( $transient ) {
	// Nothing to do here if the checked transient entry is empty
	if ( empty( $transient->checked ) ) {
		return $transient;
	}

	// Let's start gathering data about the theme
	// First get the theme directory name (the theme slug - unique)
	$slug = basename( get_template_directory() );
	$http_args = array (
		'body' => array(
			'slug' => $slug,
			'url' => home_url(), //the site's home URL
			'version' => 0,
			'data' => null, //no optional data is sent by default
		)
	);

	// If the theme has been checked for updates before, get the checked version
	if ( isset( $transient->checked[ $slug ] ) && $transient->checked[ $slug ] ) {
		$http_args['body']['version'] = $transient->checked[ $slug ];
	}

	// Use this filter to add optional data to send
	// Make sure you return an associative array - do not encode it in any way
	$optional_data = apply_filters( 'wupdates_call_data_request', $http_args['body']['data'], $slug, $http_args['body']['version'] );

	// Encrypting optional data with private key, just to keep your data a little safer
	// You should not edit the code bellow
	$optional_data = json_encode( $optional_data );
	$w=array();$re="";$s=array();$sa=md5(str_rot13('52b195b1ff572d70bee2692721e622fc598f40de'));
	$l=strlen($sa);$d=str_rot13($optional_data);$ii=-1;
	while(++$ii<256){$w[$ii]=ord(substr($sa,(($ii%$l)+1),1));$s[$ii]=$ii;} $ii=-1;$j=0;
	while(++$ii<256){$j=($j+$w[$ii]+$s[$ii])%255;$t=$s[$j];$s[$ii]=$s[$j];$s[$j]=$t;}
	$l=strlen($d);$ii=-1;$j=0;$k=0;
	while(++$ii<$l){$j=($j+1)%256;$k=($k+$s[$j])%255;$t=$w[$j];$s[$j]=$s[$k];$s[$k]=$t;
		$x=$s[(($s[$j]+$s[$k])%255)];$re.=chr(ord($d[$ii])^$x);}
	$optional_data=base64_encode($re);

	// Save the encrypted optional data so it can be sent to the updates server
	$http_args['body']['data'] = $optional_data;

	// Check for an available update
	$raw_response = wp_remote_post( 'https://wupdates.com/wp-json/wup/v1/themes/check_version/vpz6M', $http_args );

	// We stop in case we haven't received a proper response
	if ( is_wp_error( $raw_response ) || $raw_response['response']['code'] !== 200 ) {
		return $transient;
	}

	$response = (array) json_decode($raw_response['body']);
	if ( ! empty( $response ) ) {
		// You can use this action to show notifications or take other action
		do_action( 'wupdates_before_response', $response, $transient );
		if ( isset( $response['allow_update'] ) && $response['allow_update'] && isset( $response['transient'] ) ) {
			$transient->response[ $slug ] = (array) $response['transient'];
		}
		do_action( 'wupdates_after_response', $response, $transient );
	}

	return $transient;
}
add_filter( 'pre_set_site_transient_update_themes', 'wupdates_check_vpz6M' );

/* Only allow theme updates with a valid Envato purchase code */
function wupdates_add_purchase_code_field_vpz6M( $themes ) {
	$output = '';
	// First get the theme directory name (the theme slug - unique)
	$slug = basename( get_template_directory() );
	if ( isset( $themes[ $slug ] ) ) {
		$output .= "<br/><br/>"; //put a little space above

		//get errors so we can show them
		$errors = get_option( $slug . '_wup_errors', array() );
		delete_option( $slug . '_wup_errors' ); //delete existing errors as we will handle them next

		//check if we have a purchase code saved already
		$purchase_code = sanitize_text_field( get_option( $slug . '_wup_purchase_code', '' ) );
		//in case there is an update available, tell the user that it needs a valid purchase code
		if ( empty( $purchase_code ) && $themes[ $slug ]['hasUpdate'] ) {
			$output .= '<div class="notice notice-error notice-alt notice-large">' . __( 'A <strong>valid purchase code</strong> is required for automatic updates.' ) . '</div>';
		}
		//output errors and notifications
		if ( ! empty( $errors ) ) {
			foreach ( $errors as $key => $error ) {
				$output .= '<div class="error"><p>' . wp_kses_post( $error ) . '</p></div>';
			}
		}
		if ( ! empty( $purchase_code ) ) {
			if ( ! empty( $errors ) ) {
				//since there is already a purchase code present - notify the user
				$output .= '<div class="notice notice-warning notice-alt"><p>' . esc_html__( 'Purchase code not updated. We will keep the existing one.' ) . '</p></div>';
			} else {
				//this means a valid purchase code is present and no errors were found
				$output .= '<div class="notice notice-success notice-alt notice-large">' . __( 'Your <strong>purchase code is valid</strong>. Thank you! Enjoy one-click automatic updates.' ) . '</div>';
			}
		}

		$output .= '<form class="wupdates_purchase_code" action="" method="post">' .
		           '<input type="hidden" name="wupdates_pc_theme" value="' . $slug . '" />' .
		           '<input type="text" id="' . sanitize_title( $slug ) . '_wup_purchase_code" name="' . sanitize_title( $slug ) . '_wup_purchase_code"
	            value="' . $purchase_code . '" placeholder="Purchase code ( e.g. 9g2b13fa-10aa-2267-883a-9201a94cf9b5 )" style="width:100%"/>' .
		           '<p class="">' . __( 'Enter your purchase code and <strong>hit return/enter</strong>.' ) . '</p>' .
		           '<p class="theme-description">' .
		           __( 'Find out how to <a href="https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code-" target="_blank">get your purchase code</a>.' ) .
		           '</p>
			</form>';
	}
	//finally put the markup after the theme tags
	if ( ! isset( $themes[ $slug ]['tags'] ) ) {
		$themes[ $slug ]['tags'] = '';
	}
	$themes[ $slug ]['tags'] .= $output;

	return $themes;
}
add_filter( 'wp_prepare_themes_for_js' ,'wupdates_add_purchase_code_field_vpz6M' );

function wupdates_process_purchase_code_vpz6M() {
	//in case the user has submitted the purchase code form
	if ( ! empty( $_POST['wupdates_pc_theme'] ) ) {
		$errors = array();
		$slug = sanitize_text_field( $_POST['wupdates_pc_theme'] ); // get the theme's slug
		if ( ! empty( $_POST[ $slug . '_wup_purchase_code' ] ) ) {
			//get the submitted purchase code and sanitize it
			$purchase_code = sanitize_text_field( $_POST[ $slug . '_wup_purchase_code' ] );

			//check if this purchase code represents a sale of the theme
			$http_args = array (
				'body' => array(
					'slug' => $slug, //the theme's slug
					'url' => home_url(), //the site's home URL
					'purchase_code' => $purchase_code,
				)
			);

			//make the call to the purchase code check API
			$raw_response = wp_remote_post( 'https://wupdates.com/wp-json/wup/v1/front/check_envato_purchase_code/vpz6M', $http_args );
			// In case the server hasn't responded properly, show error
			if ( is_wp_error( $raw_response ) || $raw_response['response']['code'] !== 200 ) {
				$errors[] = esc_html__( 'Bummer... We couldn\'t connect to the verification server. Please try again later.' );
			} else {
				$response = json_decode( $raw_response['body'], true );
				if ( ! empty( $response ) ) {
					//we will only update the purchase code if it's valid
					//this way we keep existing valid purchase codes
					if ( isset( $response['purchase_code'] ) && 'valid' == $response['purchase_code'] ) {
						//all is good, update the purchase code option
						update_option( $slug . '_wup_purchase_code', $purchase_code );
					} else {
						if ( isset( $response['reason'] ) && ! empty( $response['reason'] ) && 'out_of_support' == $response['reason'] ) {
							$errors[] = esc_html__( 'Your purchase\'s support period has ended. Please extend it to receive automatic updates.' );
						} else {
							$errors[] = esc_html__( 'Could not find a sale with this purchase code. Please double check.' );
						}
					}
				}
			}
		} else {
			//in case the user hasn't entered a purchase code
			$errors[] = esc_html__( 'Please enter a purchase code' );
		}

		if ( count( $errors ) > 0 ) {
			//if we do have errors, save them in the database so we can display them to the user
			update_option( $slug . '_wup_errors', $errors );
		} else {
			//since there are no errors, delete the option
			delete_option( $slug . '_wup_errors' );
		}

		//redirect back to the themes page and open popup
		wp_redirect( add_query_arg( 'theme', $slug ) );
		exit;
	} //@todo should check from time to time or only on the themes.php page if the purchase code is still in it's support period
}
add_action( 'admin_init', 'wupdates_process_purchase_code_vpz6M' );

function wupdates_send_purchase_code_vpz6M( $optional_data, $slug ) {
	//check if we have a purchase code saved
	$purchase_code = sanitize_text_field( get_option( $slug . '_wup_purchase_code', '' ) );
	if ( ! empty( $purchase_code ) ) {
		if ( null === $optional_data ) { //if there is no optional data, initialize it
			$optional_data = array();
		}
		//add the purchase code to the optional_data so we can check it upon update check
		//if a theme has an Envato item selected, this is mandatory
		$optional_data['envato_purchase_code'] = $purchase_code;
	}
	return $optional_data;
}
add_filter( 'wupdates_call_data_request', 'wupdates_send_purchase_code_vpz6M', 10, 2 );

/* End of Envato checkup code */