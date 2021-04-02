/*!
 * betterRating jQuery Plugin
 * Author: @malithmcr
 * Email : malith.priyashan.dev@gmail.com
 * Licensed under the MIT license
 */

/*
    This plugin allow you to create beautiful rating form. already styled.
*/

;(function($){
    $.fn.extend({
        betterRating: function( options ) {
            /**
             * @option : wrapper - rating list wrapper div
             * @option : icon - fontAwesome icon name
             */
            this.defaultOptions = {
                wrapper: '#list',
                icon: 'fa fa-star',
            };
            var settings = $.extend({}, this.defaultOptions, options);
            this.getRating(settings);
            return this.each(function() {
                var $this = $(this);
            });
        },
        getRating: function(settings) {
                var self = this;

                $('.rating i').on('click', function(){
                    $('#rating-count').val($(this).data('rate'));
                    $(this).parent().find('i:lt(' + ($(this).index() + 1) + ')').addClass('selected');
                });

                $('.rating i').on('mouseover', function(){
                    $(this).parent().children('.rating i').each(function(e){
                        $(this).removeClass('selected');
                      });
                    $(this).parent().find('i:lt(' + ($(this).index() + 1) + ')').addClass('hover');
                  }).on('mouseout', function(){
                    $(this).parent().children('.rating i').each(function(e){
                      $(this).removeClass('hover');
                    });
                  });

                $(this).submit(function( event ) {
                    event.preventDefault();
                    var formData = $(this).serializeArray();
					var myKeyVals = {formData: formData};
					var saveData = $.ajax({
						type: 'POST',
						url: "../controller/rating_ajax.php",
						data: myKeyVals,
						dataType: "text",
						success: function(response){
							if(response == "submit"){
								location.reload();
							}
							
						}
					});
                });
                
        },


    });

})(jQuery);