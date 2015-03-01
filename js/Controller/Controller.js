define([], function() {
	var Controller = function() {
		this.extend = function(option) {
		    _.extend(this, option || {})
		}
	};

	return Controller;
})   