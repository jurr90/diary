define(['View/View'], function(View) {
	var eventView = new View({}, '#container', _.template($('#event').html()));

	return eventView;
})
