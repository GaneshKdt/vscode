
import $ from 'jquery';
import 'jquery.animate';
$.fn.facebookReactions = function(options) {

	var settings = $.extend( {
					postUrl: false,
					defaultText: "Like" // default text for button
				}, options);
				var emoji_value;
				var post_id = $(this).attr("data-post-id");
				var user_id = $(this).attr("data-user-id");
				var classValue = "emoji_"+post_id;
				var _bar = $(this).find('._bar');
				var _inner = $(this).find('._inner');
		// on click emotions
		$('.rection-count-emoji').on("click",function (e) {
			
						var base = $(this).closest('.FB_reactions');
						var move_emoji = $(this);
						if ( settings.postUrl ) {
						}
						
						// on complete reaction
						emoji_value = move_emoji.data('emoji-value');
						if(emoji_value!="") {	
						if (move_emoji) {
							var cloneemoji = move_emoji.clone().offset({
								top: move_emoji.offset().top,
								left: move_emoji.offset().left
							}).css({
								'height': '40px',
								'width': '40px',
								'opacity': '0.9',
								'position': 'absolute',
								'z-index': '99'
							}).appendTo($('body')).animate({
									'top': base.offset().top+5,
									'left': base.offset().left + 120,
									'width': 30,
									'height': 30
							}, 200, 'easeInBack');
							
							cloneemoji.animate({
								'width': 30,
								'height': 30
							},100, function () {
								
								var _imgicon = $(this);
								
								_imgicon.fadeOut(100, function(){ _imgicon.detach();
										// add icon class
										base.find('span').attr("data-emoji-class", emoji_value);
										// change text
										base.find('span').html(emoji_value);
									 
								});
								
							});
							
						}
			}	
		});

					return this.each(function() {
			
						var _this = $(this);
						window.selector = _this.get(0).className;
						
						$(this).hover(function (){
										
							if ( $(this).hasClass("data-emoji-class") ){
								return false;
							}
							
							if($(this).hasClass("open") === true)
							{
								clearTimeout(window.tmr);
								return false;
							}
								
							$('.'+window.selector).each(function() {
									 
								__hide(this);
							});
							
							if( _bar.attr('data-status') != 'active' ) {
								
								__show(this);
							}
						},function ()
							{  
								var _this = this;
								
								window.tmr = setTimeout( function(){
								   
								   __hide(_this); 
								   
								}, 3000); 
							}
						);
						
						
		});

			function __hide(_this) {
							_bar.attr('data-status', 'hidden');
							
							_bar.hide();
							$('.open').removeClass("open");
							
							_inner.removeClass('ov_visi');
							
						}

			function __show(_this) {
			
							clearTimeout(window.tmr);
				
							_bar.fadeIn();
							
							_bar.attr('data-status', 'active');
							
							_inner.addClass('ov_visi');
							
							$(_this).addClass("open");
							
							// vertical or horizontal
							var position = $(_this).data('reactions-type');
							
							if( position == 'horizontal' )
							{
								_inner.css('width', '205px');
								// Set main bar position top: -50px; left:0px;
								_bar.css({'left': '0px', 'right': 'auto','bottom': '30px' });
							}
							else
							{
								_inner.css('width', '41px');
								_bar.css({'top': '-6px', 'right': '-48px', 'left': 'auto' });
							}
						}


}















