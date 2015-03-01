define([], function() {
	var MyEvent = function(data) {
		data = data || {};

		this.nameEvent = data.nameEvent || "";
		this.description = data.description || "";
		this.date = data.date || "";
		this.relatedToTheEvent = data.relatedToTheEvent || "";
		this.linkImg = data.linkImg || "";
		this.linkVideo = data.linkVideo || "";
		this.location = data.location || {k: "", D: ""}
	}

	return MyEvent;
})
