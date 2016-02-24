<div id="main" class="content djax-updatable">
    <?php
    $gallery_ids = get_post_meta( $post->ID, wpgrade::prefix() . 'main_gallery', true );
    if (!empty($gallery_ids)) {
        $gallery_ids = explode(',',$gallery_ids);
    } else {
        $gallery_ids = array();
    }

    if ( !empty($gallery_ids) ) {
        $attachments = get_posts( array(
            'post_type' => 'attachment',
            'posts_per_page' => -1,
            'orderby' => "post__in",
            'post__in'     => $gallery_ids
        ) );
    } else {
        $attachments = array();
    }

    $show_gallery_title = get_post_meta( $post->ID, wpgrade::prefix() . 'show_gallery_title', true );
    if (empty($show_gallery_title)) {
        $show_gallery_title = false;
    }

    $has_post_thumbnail = has_post_thumbnail();
    if ($has_post_thumbnail) {
	    $featured_image_id = get_post_thumbnail_id($post->ID);
        $featured_image = wp_get_attachment_image_src($featured_image_id, 'blog-big', true);
        $featured_image = $featured_image[0];
    }

    $index = 0;
    if ( $attachments ) : ?>
        <div class="masonry  masonry--gallery  js-gallery  gallery-grid"  data-columns="4">
	        <?php
            foreach ( $attachments as $attachment ) :
                $class = "post-attachment mime-" . sanitize_title( $attachment->post_mime_type );
                $attachment_fields = get_post_custom( $attachment->ID );

                $img['full'] = wp_get_attachment_image_src($attachment->ID, 'full', true);
                $img['big'] = wp_get_attachment_image_src($attachment->ID, 'blog-big', true);

                //whether or not to show the title and caption in popups
                $img_title = '';
                $img_caption = '';
                if (wpgrade::option('show_title_caption_popup')) {
                    $img_title = $attachment->post_title;
                    $img_caption = $attachment->post_excerpt;
                }

                $the_link = $img['full'][0];
                // check if this attachment has a external url
                $external_url = ( isset($attachment_fields['_external_url'][0] ) && !empty( $attachment_fields['_external_url'][0]) ) ? esc_url( $attachment_fields['_external_url'][0] ) : '';
                $is_external = false;
                if ( !empty($external_url) ) {
                    $the_link = $external_url;
	                //we test if this is not actually an internal URL
	                if ( strpos( $the_link, get_site_url() ) === false ) $is_external = true;
                }

                // check if this attachment has a video url
                $video_url = ( isset($attachment_fields['_video_url'][0] ) && !empty( $attachment_fields['_video_url'][0]) ) ? esc_url( $attachment_fields['_video_url'][0] ) : '';
                $is_video = false;
                if ( !empty($video_url) ) {
                    $the_link = $video_url;
                    $is_video = true;
                }

                $image_ratio = 70; //some default aspect ratio in case something has gone wrong and the image has no dimensions - it happens
                if (isset($img['big'][1]) && isset($img['big'][2]) && $img['big'][1] > 0) {
                    $image_ratio = $img['big'][2] * 100/$img['big'][1];
                }

                ?>
                 <div class="masonry__item-image  mosaic__item  <?php if ( empty($external_url) ) echo "magnific-link"; ?>" itemscope itemtype="http://schema.org/ImageObject">
                    <a href="<?php echo $the_link ?>"  <?php if($is_external){ echo 'target="_blank"'; } ?> class="<?php if ($is_video) { echo 'mfp-iframe mfp-video'; } else { echo 'mfp-image'; } if(!empty($external_url)) echo ' external_url '; ?> image__item-link" title="<?php echo $attachment->post_title ?>" data-title="<?php echo $img_title ?>" data-alt="<?php echo $img_caption ?>" data-effect="mfp-zoom-in" itemprop="contentURL">
                        <div class="image__item-wrapper"  style="padding-top: <?php echo $image_ratio; ?>%;">
                            <img
                                class="js-lazy-load"
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                data-src="<?php echo $img['big'][0]; ?>"
                                alt="<?php echo lens::get_img_alt($attachment->ID) ?>"
                                />
                        </div>
                        <div class="image__item-meta">
                            <div class="image_item-table">
                                <div class="image_item-cell">
                                    <?php if ( $is_video ) { ?>
                                        <i class="icon-play"></i>
                                    <?php } else if( !empty($external_url) ) {?>
                                        <i class="icon-e-link"></i>
                                    <?php } else { ?>
                                        <div class="image__plus-icon">+</div>
                                    <?php } ?>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <?php

                // if we added 3 it's now time to add the gallery title box
                if (++$index == 3 && $show_gallery_title) : ?>
                    <div class="masonry__item-image  mosaic__item <?php echo $has_post_thumbnail ? "" : " js--is-loaded"; ?> mosaic__item--page-title">
                        <div class="image__item-link">
                            <div class="image__item-wrapper">
                            <?php if ($has_post_thumbnail) : ?>
                            <img
                                class="js-lazy-load"
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                data-src="<?php echo $featured_image; ?>"
                                alt="<?php echo lens::get_img_alt( $featured_image_id) ?>"
                                />
                            <?php endif; ?>
                            </div>
                            <div class="image__item-meta">
                                <div class="image_item-table">
                                    <div class="image_item-cell">
                                        <h1><?php the_title(); ?></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif;
            endforeach;
            // if there were less than 3, still add the title
            if ($index < 3 && $show_gallery_title) : ?>
                <div class="masonry__item-image  mosaic__item <?php echo $has_post_thumbnail ? "" : " js--is-loaded"; ?> mosaic__item--page-title">
                    <div class="image__item-link">
                        <div class="image__item-wrapper">
                            <?php if ($has_post_thumbnail) : ?>
                            <img
                                class="js-lazy-load"
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                data-src="<?php echo $featured_image; ?>"
                                alt="<?php echo lens::get_img_alt( $featured_image_id) ?>"
                                />
                            <?php endif; ?>
                        </div>
                        <div class="image__item-meta">
                            <div class="image_item-table">
                                <div class="image_item-cell">
                                    <h1><?php the_title(); ?></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>