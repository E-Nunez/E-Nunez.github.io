$(window).on('scroll', function() {
	$('.target').each(function() {
		if($(window).scrollTop() >= $(this).offset().top) {
			var id = $(this).attr('id');
			$('#sidenav ul li a').removeClass('active');
			$('#sidenav ul li a[href="#'+ id +'"]').addClass('active');
		}
	});
});
	
$('.popover-dismiss').popover({
	trigger: 'focus'
});

$("#sidenav li").mouseenter(function() {
	$("i", this).hide();
	$("p", this).show();
});

$("#sidenav li").mouseleave(function() {
	$("i", this).show();
	$("p", this).hide();
});

$("#hello").mouseenter(function() {
	$(this).hide();
	$("#welcome, #welcome p").show();
	$("#welcome p").writeText("Welcome to my Portfolio!");
});

$("#welcome").mouseleave(function() {
	$("#welcome p").remove();
	$("#welcome").append( '<p class="pt-3" style="display: none;"></p>' );
	$("#hello").show();
});

(function($) {
	$.fn.writeText = function(content) {
		var contentArray = content.split(""),
		current = 0,
		elem = this;
		setInterval(function() {
			if(current < contentArray.length) {
				elem.text(elem.text() + contentArray[current++]);
			}
		}, 100);
	};
})(jQuery);