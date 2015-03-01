define(['View/View'], function(View) {
    var addView = new View({
    	'change [data-important="true"]': 'formChange',
    	'submit form'                   : 'formSubmit',
        'dblclick map-canvas'           : 'setMarker',
        'click [name=addUrl]'           : 'addUrl'
    }, '#container', _.template($('#AddEvent').html()));

    addView.extend({
        formChange: function(event) {
        	PubSub.publish('event:form:change', event.target);
        },

        formSubmit: function(event) {
        	event.preventDefault();
        	var data = {};

        	$(this).find("[data-important='true'], :checked, [type='url']").each(function() {
                if ($(this).attr('name') === "date") {
                    data[$(this).attr('name')] = +new Date($(this).val());
                } else {
        		    data[$(this).attr('name')] = $(this).val();
                }

        	});
            
        	PubSub.publish('event:form:submit', data);
        },

        inputInvalid: function(el) {
            $(this.el).find(el).addClass("input-error")
        },

        inputValid: function(el) {
            $(this.el).find(el).removeClass("input-error")
        },

        addUrl: function(event) {
            event.preventDefault()
            $(this).next().next().attr('src', $(this).prev().val())
        },

        //Работа с картой!
        initializeMap: function(lat, lng) { 
            lat = lat || '';
            lng = lng || '';

            var myLatlng = new google.maps.LatLng(lat, lng)

            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(50, 36.25)
            };

            var mapDiv = $('#map-canvas')[0];
            var map = new google.maps.Map($('#map-canvas')[0], {
                zoom: 12,
                center: new google.maps.LatLng(50, 36.25)
            });

            var marker = new google.maps.Marker({
                map: map,
                position: myLatlng,
            });
            
            google.maps.event.addListener(map, 'click', function(event) {
                marker.setPosition(event.latLng);
                PubSub.publish('event:map:marker', event.latLng)
            });
        }
    })

    return addView
})

