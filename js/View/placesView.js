define(['View/View'], function(View) {
	var placesView = new View({}, '#container', _.template($('#tplMap').html()));

	placesView.extend({
		initializeMap: function(markers) {
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(50, 36.25)
            };

            var mapDiv = $('#map-canvas')[0];
            var map = new google.maps.Map(mapDiv, mapOptions);

            markers.forEach(function(el) {
                var myLatlng = new google.maps.LatLng(el.location.k, el.location.D);

                var marker = new google.maps.Marker({
                    map: map,
                    position: myLatlng,
                    title: el.nameEvent
                });

                google.maps.event.addListener(marker, 'click', function() {
                    window.location.hash = 'event/' + el.id;
                });
            })
        }
	})

	return placesView
})