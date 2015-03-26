/* This file is to add cfitrack() function call for the ads/listings/projects
 */

;
(function($) {

  $(window).load(function() {
    //$('').cfitrack();
    if($.cfitrack !== undefined) {
      // ads
      $('.homepage-sidebar-ads[cfi_entity_type="ad"]').cfitrack();
      $('.ads_banner_img').cfitrack();
      $('.feature_agent_block').cfitrack({
        parent : $('.flex-viewport')
      });
      $('.project-search-sidebar-ads').cfitrack();
      $('#sidebar_project_spotlight .mCSB_container>div').cfitrack({
        parent : $('#sidebar_project_spotlight .mCustomScrollBox')
      });
      $('#sidebar_project_gallery tr').cfitrack({
        parent : $('#sidebar_project_gallery .mCustomScrollBox')
      });
      $('.featured_projects div[cfi_entity_subtype="featured_project"]').cfitrack();
      $('.ad_hrz_banners_container .top_ads_banner[cfi_entity_type="ad"]').cfitrack();
      $('.expandable_banner_background, .btn-collapse').cfitrack({
        bind : ['click']
      });
      $('.featured_project td[cfi_entity_type="ad"]').cfitrack();

      // listings
      $('#results_div .listing_snippet').cfitrack({
        commonDataElement : $('#cfi_listing_common_data')
      });
      $('#sticky_header a[cfi_click_event], .listing_details_main a[cfi_click_event], input[value="View Contact"], .projectname').cfitrack({
        bind : ['click']
      });
      $('.projectname').cfitrack('impressed');

      // projects
      $('#results_div .p-item-wrapper').cfitrack({
        commonDataElement : $('#cfi_projects_common_data')
      });
      $('a[cfi_entity_subtype="full_project"], .inner-header-block.block_1').cfitrack({
        bind : ['click']
      });
      $('.inner-header-block.block_1').cfitrack('impressed');
      $('.rightside-block.similar_properties ul>li').cfitrack();
    }
  });

})(jQuery);