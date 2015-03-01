define(['View/View'], function(View) {
	var listView = new View({
		'keyup [name=eventName]': 'findByName',
    	'change select'			: 'sort',
        'click .delete'			: 'deleteEvent',
        'click .edit'			: 'editEvent',
	}, '#container', _.template($('#list').html()))

	listView.extend({
		table: new View({}, '#listEvent', _.template($('#tplTable').html())),

		findByName: function(event) {
			PubSub.publish('value:input', event.target.value);
		},

		sort: function(event) {
			var data = {};

			$(this).each(function() {
				data[$(this).attr('name')] = $(this).val();
			})

			PubSub.publish('change:filter', data);
		},

		deleteEvent: function(event) {
			if (confirm("Вы действительно хотите удалить событие?")) {
				PubSub.publish('button:delete:event', $(this).val());
				$(this).parent().parent().remove()
			}
		},

		editEvent: function(event) {
			location.hash = "event/edit/" + $(this).val()
		} 
	})

	return listView;
})