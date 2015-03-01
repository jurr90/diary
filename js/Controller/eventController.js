define(['Controller/Controller', '../View/eventView', '../Model/MyStorage'], 
	function(Controller, eventView, MyStorage) {
		var eventController = new Controller();
		var collection = new MyStorage();

		eventController.extend({
		    init: function(id) {
		        eventView.render(collection.findById(id))
		    }
		})

		return eventController;
	}
)