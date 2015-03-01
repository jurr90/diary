define(['../View/addView', 'Controller/Controller', '../Model/MyEvent', '../Model/MyStorage', 'Controller/addController'], 
    function(addView, Controller, MyEvent, MyStorage, addController) {
        var editController = new Controller();
        var collection = new MyStorage();
        editController.__proto__ = Object.create(addController)

        editController.extend({
            init: function(id) {
                PubSub._callbacks = {};
                var self = editController;
                self.id = id;
                var ev = collection.findById(id)
                addView.render(ev);
                addView.handlerEvent();
                addView.initializeMap(ev.location.k, ev.location.D);

                PubSub.subscribe('event:form:change', self.formChange);
                PubSub.subscribe('event:form:submit', self.formSubmit);
                PubSub.subscribe('event:map:marker', self.getLocation);
            },
            
            //Обработка формы
            formSubmit: function(data) {
                var self = editController;

                var invalidate = self.validator(data, self.validate);
                if (invalidate !== true) {
                    invalidate.forEach(function(el){
                        addView.inputInvalid("[name=" + el + "]")
                    }) 
                } else {
                    debugger
                    data.location = self.location;
                    var event = new MyEvent(data);
                    collection.update(event, self.id)
                    window.location.hash = "#list";
                }
            }
        })

        return editController;
    }
)

