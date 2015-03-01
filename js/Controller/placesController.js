define(['../View/placesView', 'Controller/Controller', '../Model/MyStorage'], 
	function(placesView, Controller, MyStorage) {
		var placesController = new Controller();
		var storeage = new MyStorage();

		placesController.extend({
			init: function() {
				placesView.render()
				placesView.initializeMap(storeage.filter(function(el) {
					return !(_.isEmpty(el.location))
				}))
			}
		})

		return placesController;
	}
)