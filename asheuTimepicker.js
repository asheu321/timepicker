(function ( $ ) {
 
    $.fn.asheuTimepicker = function() {
    	var curElm = this;
    	$(document).on('click',function(e) {
			var parnt 	= e.target.closest('.cwi_timepicker_wrapper');
			var dataset = e.target.dataset.timepicker;

			if ( $.trim(e.target.className) !== 'cwi_timepicker_wrapper' && typeof dataset === 'undefined' && parnt === null ) {
				$('.cwi_timepicker_wrapper').remove();
				curElm.removeAttr('id');
				curElm.removeAttr('data-timepicker');
			}
		});

		this.on('click', function(e) {
			e.preventDefault();

			jQuery('.cwi_timepicker_wrapper').remove();
			var explStr, explTime, curTime, curPeriod, curHour, curMin, top, addClass = '',
			height 			= jQuery(this).outerHeight(),
			position 		= jQuery(this).offset(),
			maxHour 		= 12,
			maxMin			= 59,
			template 		= '',
			timestp 		= e.timeStamp.toString(),
			tracker 		= 'cs_timepicker_'+timestp.replace('.', '_'),
			curVal 			= jQuery(this).val();

			jQuery(this).attr({
				'id': tracker,
				'data-timepicker': 'asheutimepicker'
			});

			if ( curVal != '' ) {
				explStr 	= curVal.split(' ');
				curTime 	= explStr[0];
				curPeriod 	= explStr[1];
				explTime 	= curTime.split(':');
				curHour 	= explTime[0];
				curMin 		= explTime[1];
			}

			if (position.top < 50) {
				top = parseFloat(position.top)+parseFloat(height)+15;
				addClass = 'bottom';
			} else {
				top = parseFloat(position.top)-parseFloat(height)-45;
				addClass = 'top';
			}

			template += '<div class="cwi_timepicker_wrapper '+addClass+'" data-id="'+tracker+'" style="top:'+top+'px;left:'+position.left+'px">';
			
				template += '<div class="hour-selector">';
					template += '<select class="cs_timepicker_hour">';
					for (var i = 1; i <= maxHour; i++) {
						template += '<option value="'+(i<10?'0':'')+i+'" '+(typeof curHour !== 'undefined' && curHour == ((i<10?'0':'')+i) ? 'selected' : '' )+'>'+(i<10?'0':'')+i+'</option>';
					}
					template += '</select>';
				template += '</div>';
			
				template += '<div class="minute-selector">';
					template += '<select class="cs_timepicker_minute">';
					for (var i = 0; i <= maxMin; i++) {
						template += '<option value="'+(i<10?'0':'')+i+'" '+(typeof curMin !== 'undefined' && curMin == ((i<10?'0':'')+i) ? 'selected' : '' )+'>'+(i<10?'0':'')+i+'</option>';
					}
					template += '</select>';
				template += '</div>';

				template += '<div class="period-selector">';
					template += '<select class="cs_timepicker_period">';
						template += '<option value="AM" '+(typeof curPeriod !== 'undefined' && curPeriod == 'AM' ? 'selected' : '')+'>AM</option>';
						template += '<option value="PM" '+(typeof curPeriod !== 'undefined' && curPeriod == 'PM' ? 'selected' : '')+'>PM</option>';
					template += '</select>';
				template += '</div>';

			template += '</div>';
			jQuery('body').append(template);
		});

		jQuery(document).on('change', '.cwi_timepicker_wrapper select', function(e) {
			e.preventDefault();
			var wrapper = jQuery(this).closest('.cwi_timepicker_wrapper');
			var id 		= wrapper.data('id'),
			hour 		= wrapper.find('.cs_timepicker_hour').val(),
			minute 		= wrapper.find('.cs_timepicker_minute').val(),
			period 		= wrapper.find('.cs_timepicker_period').val();

			var value 	= hour + ':' + minute + ' ' + period;

			jQuery('#'+id).val(value);

		});

		this.keydown(function(e) {
			e.preventDefault();
		});

        return this;
    };
 
}( jQuery ));