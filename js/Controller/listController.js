define(['Controller/Controller', '../View/listView', '../Model/MyStorage'], 
	function(Controller, listView, MyStorage) {
		var listController = new Controller();
		var collection = new MyStorage();

		listController.extend({
		    init: function() {
		    	PubSub._callbacks = {};
		    	var self = listController;
		        listView.render();
		        listView.table.render(collection.getAll());
		        listView.handlerEvent();

		        PubSub.subscribe('value:input', self.findByName);
		        PubSub.subscribe('change:filter', self.sort);
		        PubSub.subscribe('button:delete:event', self.deleteEvent);
		    },

		    findByName: function(value) {
		    	var pattern = new RegExp(value)
		    	var filter = collection.filter(function(el) {
		    		return pattern.test(el.nameEvent)
		    	})

		    	listView.table.render({collection: filter});
		    },

		    sort: function(data) {
		    	var key = _.keys(data)[0];

		    	// По возрастанию
			    var sort = collection.sort(function(el) {
			   		return el[key]
			   	});
			   	
				// По убыванию
			   	if (data[key] === "down") {
			   		sort.reverse()
			   	}

		    	listView.table.render({collection: sort});
		        listView.handlerEvent();
		    },

		    deleteEvent: function(id) {
		    	collection.removeById(id);
		    }
		})

		return listController;
	}
)