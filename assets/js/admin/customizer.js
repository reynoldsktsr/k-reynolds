/**
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $, window ) {

	//these hold the ajax responses
	var responseRaw = null;
	var res = null;
	var stepNumber = 0;
	var numberOfSteps = 10;

	// when the customizer is ready prepare our fields events
	wp.customize.bind( 'ready', function() {
		import_demodata();
	} );

	function import_demodata() {

		//The demo data import-----------------------------------------------------
		var importButton = jQuery( '#wpGrade_import_demodata_button' ),
			container = jQuery( '#customize-control-lens_options-import_demodata_button_control' );

		var saveData = {
			container: container,
			ajaxUrl: $( 'input[name=wpGrade_import_ajax_url]', container ).val(),
			optionSlug: $( 'input[name=wpGrade_options_page_slug]', container ).val(),
			nonceImportPostsPages: $( 'input[name=wpGrade-nonce-import-posts-pages]', container ).val(),
			nonceImportThemeOptions: $( 'input[name=wpGrade-nonce-import-theme-options]', container ).val(),
			nonceImportWidgets: $( 'input[name=wpGrade-nonce-import-widgets]', container ).val(),
			ref: $( 'input[name=_wp_http_referer]', container ).val()
		};

		//this is the ajax queue
		var this_data = {},
			resultcontainer = $( '.wpGrade-import-results', this_data.container );
		qInst = $.qjax( {
			timeout: 3000,
			ajaxSettings: {
				type: "POST",
				url: ajaxurl
			},
			onQueueChange: function( length ) {

				if ( length == 0 ) {
					if ( res.errors == false ) {

						setTimeout( function() {
							resultcontainer.append( '<i>' + lens_admin_js_texts.import_all_done + '</i><br />' );
						}, 1000 );

						setTimeout( function() {
							resultcontainer.append( '<h3>' + lens_admin_js_texts.import_phew + '</h3><br /><p>' + lens_admin_js_texts.import_success_note + lens_admin_js_texts.import_success_reload + lens_admin_js_texts.import_success_warning + '</p>' );
						}, 1000 );

					} else {
						//we have errors
						//re-enable the import button
						button.removeClass( 'button-disabled' );

						setTimeout( function() {
							resultcontainer.append( '<i>' + lens_admin_js_texts.import_failed + '</i><br />' );
						}, 1000 );
					}

					// we are done, let the user see what has been done
					import_end_loading();
				}
			},
			onError: function() {
				//stop everything on error
				if ( res.errors != null && res.errors != false ) {
					qInst.Clear();

					// we are done, let the user see what has been done
					import_end_loading();
				}
			},
//				onTimeout: function(current) {
//				},
			onStart: function() {
				//show the loader and some messages
				import_start_loading();
			},
			onStop: function() {
				//stop everything on error
				if ( res.errors != null && res.errors != false ) {
					qInst.Clear();

					// we are done, let the user see what has been done
					import_end_loading();
				}
			}
		} );

		//bind to click
		importButton.bind( 'click', {set: saveData}, function( receivedData ) {

			this_data = receivedData.data.set;

			var button = $( this );

			if ( button.is( '.wpGrade_button_inactive' ) ) return false;

			var activate = confirm( lens_admin_js_texts.import_confirm );

			if ( activate == false ) return false;

			//show loader
			$( '.wpGrade-loading-wrap', this_data.container ).css( {
				opacity: 0,
				display: "block",
				visibility: 'visible'
			} ).removeClass( "hidden" ).animate( {opacity: 1} );
			//disable the import button
			button.addClass( 'button-disabled' );
			resultcontainer.removeClass( 'hidden' );
			resultcontainer.append( '<br /><i>' + lens_admin_js_texts.import_working + '</i><br />' );

			//queue the calls
			ajax_import_theme_options(resultcontainer, this_data);
			ajax_import_widgets(resultcontainer, this_data);
			ajax_import_posts_pages_stepped(resultcontainer, this_data);

			return false;
		} );
	}

	function ajax_import_posts_pages_stepped(resultcontainer, this_data) {
		//add to queue the calls to import the posts, pages, custom posts, etc
		stepNumber = 0;
		while ( stepNumber < numberOfSteps ) {
			stepNumber++;
			qInst.Queue( {
					type: "POST",
					url: this_data.ajaxUrl,
					data: {
						action: 'wpGrade_ajax_import_posts_pages',
						_wpnonce: this_data.nonceImportPostsPages,
						_wp_http_referer: this_data.ref,
						step_number: stepNumber,
						number_of_steps: numberOfSteps
					}
				} )
				.fail( function( response ) {
					responseRaw = response;
					res = wpAjax.parseAjaxResponse( response, 'notifier' );
					resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_posts_failed + '</i><br />' );
				} )
				.done( function( response ) {
					responseRaw = response;
					res = wpAjax.parseAjaxResponse( response, 'notifier' );
					if ( res != null && res.errors != null ) {
						if ( res.errors == false ) {
							if ( res.responses[0] != null ) {
								resultcontainer.append( '<i>' + lens_admin_js_texts.import_posts_step + ' ' +  + res.responses[0].supplemental.stepNumber + ' of ' + res.responses[0].supplemental.numberOfSteps + '</i><br />' );
								//for debuging purposes
								resultcontainer.append( '<div style="display:none;visibility:hidden;">Return data:<br />' + res.responses[0].data + '</div>' );
							} else {
								resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_posts_failed + '</i><br />' + lens_admin_js_texts.import_error + ' ' + res.responses[0].data );
							}
						}
						else {
							if ( res.responses[0] != null ) {
								resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_posts_failed + '</i><br />( ' + res.responses[0].errors[0].message + ' )<br/>' );
							} else {
								resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_posts_failed + '</i><br />' + lens_admin_js_texts.import_error + ' ' + res.responses[0].data );
							}
						}
					} else {
						resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_posts_failed + ' ' + lens_admin_js_texts.import_try_reload + ' </i><br />' );
					}
				} );
		}
	}

	function ajax_import_theme_options(resultcontainer, this_data) {
		//make the call for importing the theme options
		qInst.Queue( {
				type: "POST",
				url: this_data.ajaxUrl,
				data: {
					action: 'wpGrade_ajax_import_theme_options',
					_wpnonce: this_data.nonceImportThemeOptions,
					_wp_http_referer: this_data.ref
				}
			} )
			.fail( function( response ) {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse( response, 'notifier' );
				resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_theme_options_failed + '</i><br />' );
			} )
			.done( function( response ) {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse( response, 'notifier' );
				if ( res != null && res.errors != null ) {
					if ( res.errors == false ) {
						resultcontainer.append( '<i>' + lens_admin_js_texts.import_theme_options_done + '</i><br />' );
						//for debuging purposes
						resultcontainer.append( '<div style="display:none;visibility:hidden;">Return data:<br />' + res.responses[0].data + '</div>' );
					}
					else {
						resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_theme_options_error + ': ' + res.responses[0].errors[0].message + ' )<br/><br/>' );
					}
				} else {
					resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_theme_options_failed + '</i><br />' );
				}
			} );
	}

	function ajax_import_widgets(resultcontainer, this_data) {
		//make the call for importing the widgets and the menus
		qInst.Queue( {
				type: "POST",
				url: this_data.ajaxUrl,
				data: {
					action: 'wpGrade_ajax_import_widgets',
					_wpnonce: this_data.nonceImportWidgets,
					_wp_http_referer: this_data.ref
				}
			} )
			.fail( function() {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse( response, 'notifier' );
				resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_widgets_failed + '</i><br />' );
			} )
			.done( function( response ) {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse( response, 'notifier' );
				if ( res != null && res.errors != null ) {
					if ( res.errors == false ) {
						resultcontainer.append( '<i>' + lens_admin_js_texts.import_widgets_done + '</i><br />' );

						//for debuging purposes
						resultcontainer.append( '<div style="display:none;visibility:hidden;">Return data:<br />' + res.responses[0].data + '</div>' );
					}
					else {
						resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_widgets_error + ': '  + res.responses[0].errors[0].message + ' )<br/><br/>' );
					}
				} else {
					resultcontainer.append( '<i style="color:red">' + lens_admin_js_texts.import_widgets_failed + '</i><br />' );
				}
			} );
	}

	var import_start_loading = function() {
		// make the iframe preview loading
		wp.customize.previewer.send( 'loading-initiated' );

	};

	var import_end_loading = function() {
		// and refresh the iframe
		wp.customize.previewer.refresh();
	};

} )( jQuery, window );
