(function ( $ ) {
	$.fn.validation = function(options) {
		defaults = {
			backgroudColor: 'red',
			color: '#fff',
		};
		htmlTypes = {
			jsName : {
				type: 'name',
				messenge: "This field is required!",
			},
			jsEmail : {
				type: 'email',
				messenge: "Please enter a valid email address!",
			},
			jsTextBox : {
				type: 'textbox',
				messenge: "This field is required!",
			}
		};

		valids = {
			name: /[^\s]{2,}/,
			email: /^[A-Za-z0-9_.-]{2,}@[A-Za-z0-9_-]{2,}\.[A-Za-z0-9]{2,}$/,
			textbox: /[^\s]{5,}/,
			required: /[^\s]{2,}/,
		};

		var settings = $.extend( true, {}, defaults, htmlTypes, valids, options );
		var jControls = this.find('input,textarea');
		var errorText = '';

		function checkIput(index, value) {
			var valid = '';
			switch (value.type) {
				case 'name':
					valid = valids.name;
					break;
				case 'email':
					valid = valids.email;
					break;
				case 'textbox':
					valid = valids.textbox;
					break;
				default:
				valid = valids.required;
			}
			if (!valid.test($('.'+index).val())) {
				errorText='<span class="c-error" style="color:'+settings.color+';background-color:'+settings.backgroudColor+'"><i style="border-bottom-color:'+settings.backgroudColor+'!important;"></i>&#9888; '+value.messenge+'</span>';
				$('.'+index).after(errorText);
				return  false;
			}
			return true;
		}

		this.submit(function() {
			var flag = true;
			$.each(settings, function( index, value ) {
				if(value.type){
					return flag = checkIput(index,value);
				}
			});
			return flag;
		});
		jControls.focus(function(){
			$('.c-error').remove();
		});
	}
}( jQuery ));
