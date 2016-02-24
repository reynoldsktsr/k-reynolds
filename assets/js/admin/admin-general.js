;
(function ($) {
	$(document).ready(function () {

		// classify the gallery number
		$('#pixgallery').on('html-change-post', function() {
			var $gallery = $( this ).children('ul'),
				nr_of_images = $gallery.children('li').length,
				metabox_class = '';

			if ( nr_of_images == 0 ) {
				metabox_class = 'no-image';
			} else if ( nr_of_images == 1 ) {
				metabox_class = 'single-image';
			} else {
				metabox_class = 'multiple-images';
			}

			if ( metabox_class !== '' ) {
				$( '#lens_gallery, #portfolio_gallery')
					.removeClass('no-image single-image multiple-images')
					.addClass(metabox_class);
			}

		});

	});


	$(window).load( function() {

		// slight fix for lens customizer
		$('#customize-control-lens_options-use_google_fonts label, #customize-control-lens_options-header_inverse label' ).css('color', '#b1b5b9');

		check_typography_use( $('#customize-control-lens_options-use_google_fonts input')[0] );

		$('#customize-control-lens_options-use_google_fonts input' ).change( function(){
			check_typography_use( this );
		});

	});

	var check_typography_use = function ( el ) {
		var val = $(el).prop("checked");

		if ( val ) {
			$( '#customize-control-lens_options-google_main_font, #customize-control-lens_options-google_body_font, #customize-control-lens_options-google_menu_font' ).show();
		} else {
			$( '#customize-control-lens_options-google_main_font, #customize-control-lens_options-google_body_font, #customize-control-lens_options-google_menu_font' ).hide();
		}

	};

	// Redefines jQuery.fn.html() to add custom events that are triggered before and after a DOM element's innerHtml is changed
	// html-change-pre is triggered before the innerHtml is changed
	// html-change-post is triggered after the innerHtml is changed
	var eventName = 'html-change';
	// Save a reference to the original html function
	jQuery.fn.originalHtml = jQuery.fn.html;
	// Let's redefine the html function to include a custom event
	jQuery.fn.html = function() {
		var currentHtml = this.originalHtml();
		if(arguments.length) {
			this.trigger(eventName + '-pre', jQuery.merge([currentHtml], arguments));
			jQuery.fn.originalHtml.apply(this, arguments);
			this.trigger(eventName + '-post', jQuery.merge([currentHtml], arguments));
			return this;
		} else {
			return currentHtml;
		}
	};

})(jQuery, window);

(function( $ ) {
	var pointers_array = [],
		number_of_pointers = null,
		button = null;


	//these hold the ajax responses
	var responseRaw = null;
	var res = null;
	var stepNumber = 0;
	var numberOfSteps = 10;

	/****** TAGS ***/

	$.qjax = function( o ) {
		var opt = $.extend( {
				timeout: null,
				onStart: null,
				onStop: null,
				onError: null,
				onTimeout: null,
				onQueueChange: null,
				queueChangeDelay: 0,
				ajaxSettings: {
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					type: 'GET'
				}
			}, o ), _queue = [], _currentReq = null, _timeoutRef = null, _this = this, _started = false,

			TriggerStartEvent = function() {
				if ( !_started ) {
					_started = true;
					//If we have a timeout handler, a timeout interval, and we have at least one thing in the queue...
					if ( opt.onTimeout && opt.timeout && $.isFunction( opt.onTimeout ) ) {
						//Kill the old timeout handle
						if ( _timeoutRef ) {
							clearTimeout( _timeoutRef );
						}
						//Create a new timeout, that calls the event when elapsed.
						_timeoutRef = setTimeout( $.proxy( function() {
							opt.onTimeout.call( this, _currentReq.options );
						}, this ), opt.timeout );
					}
					//If we have an onStart handler, call it.
					if ( opt.onStart && $.isFunction( opt.onStart ) ) {
						opt.onStart( this, _currentReq.options );
					}
				}
			},
			TriggerStopEvent = function() {
				//If we've started, and the queue is empty...
				if ( _started && _queue.length <= 0 ) {
					_started = false;
					if ( _timeoutRef ) {
						clearTimeout( _timeoutRef );
					}
					//Mark as stopped, and fire the onStop handler if possible.
					if ( opt.onStop && $.isFunction( opt.onStop ) ) {
						opt.onStop( this, _currentReq.options );
					}
				}
			},
			TriggerQueueChange = function() {
				if ( opt.onQueueChange ) {
					opt.onQueueChange.call( _this, _queue.length );
				}
				//Only start a new request if we have at least one, and another isn't in progress.
				if ( _queue.length >= 1 && !_currentReq ) {
					//Pull off the next request.
					_currentReq = _queue.shift();
					if ( _currentReq.options.isCallback ) {
						//It's a queued function... just call it.
						_currentReq.options.complete();
					} else {
						//Create the new ajax request, and assign any promise events.
						TriggerStartEvent();
						var request = $.ajax( _currentReq.options );
						for ( var i in _currentReq.promise ) {
							for ( var x in _currentReq.promise[i] ) {
								request[i].call( this, _currentReq.promise[i][x] );
							}
						}
					}
				}
			};

		var QueueObject = function( options, complete, context ) {
			this.options = options;
			this.complete = complete;
			this.context = context;
			this.promise = {done: [], then: [], always: [], fail: []};
		};
		QueueObject.prototype._promise = function( n, h ) {
			if ( this.promise[n] ) {
				this.promise[n].push( h );
			}
			return this;
		};
		QueueObject.prototype.done = function( handler ) {
			return this._promise( 'done', handler );
		};
		QueueObject.prototype.then = function( handler ) {
			return this._promise( 'then', handler );
		};
		QueueObject.prototype.always = function( handler ) {
			return this._promise( 'always', handler );
		};
		QueueObject.prototype.fail = function( handler ) {
			return this._promise( 'fail', handler );
		};

		this.Clear = function() {
			_queue = [];
		};
		this.Queue = function( obj, thisArg ) {
			var _o = {}, origComplete = null;
			if ( obj instanceof Function ) {
				//If the obj var is a function, set the options to reflect that, and set the origComplete var to the passed function.
				_o = {isCallback: true};
				origComplete = obj;
			} else {
				//The obj is an object of ajax settings. Extend the options with the instance ones, and store the complete function.
				_o = $.extend( {}, opt.ajaxSettings, obj || {} );
				origComplete = _o.complete;
			}
			//Create our own custom complete handler...
			_o.complete = function( request, status ) {
				if ( status == 'error' && opt.onError && $.isFunction( opt.onError ) ) {
					opt.onError.call( _currentReq.context || this, request, status );
				}
				if ( _currentReq ) {
					if ( _currentReq.complete ) {
						_currentReq.complete.call( _currentReq.context || this, request, status );
					}
					TriggerStopEvent();
					_currentReq = null;
					TriggerQueueChange();
				}
			};
			//Push the queue object into the queue, and notify the user that the queue length changed.
			var obj = new QueueObject( _o, origComplete, thisArg );
			_queue.push( obj );
			setTimeout( TriggerQueueChange, opt.queueChangeDelay );
			return obj;
		};
		return this;
	};
})( jQuery );

