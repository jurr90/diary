define(['../View/addView', 'Controller/Controller', '../Model/MyEvent', '../Model/MyStorage'], 
    function(addView, Controller, MyEvent, MyStorage) {
        var addController = new Controller()
        var collection = new MyStorage();

        addController.extend({
            init: function() {
                PubSub._callbacks = {};
                var self = addController;
                addView.render(new MyEvent());
                addView.handlerEvent();
                addView.initializeMap();
                PubSub.subscribe('event:form:change', self.formChange);
                PubSub.subscribe('event:form:submit', self.formSubmit);
                PubSub.subscribe('event:map:marker', self.getLocation);
            },

            validate: {
                "nameEvent": {
                    pattern: /^.+$/,
                    msg: "Ведите назавние события"
                },
                "description": {
                    pattern: /^.+$/,
                    msg: "Опишите событие"
                },
            },

            validator: function(data, validate) {
                var invalidate = []
                for (var name in validate) {
                    if (!validate[name].pattern.test(data[name].trim())) {
                        invalidate.push(name)
                    }
                }

                if (invalidate.length !== 0) {
                    return invalidate;
                } 

                return true;
            },

            //Валидация 3 основных полей.
            formChange: function(data) {
                if (data.value === "") {
                    addView.inputInvalid(data)
                } else {
                    addView.inputValid(data)
                }
            },
            
            location: {},

            getLocation: function(data){
                var self = addController;
                self.location = data;
            },

            //Обработка формы
            formSubmit: function(data) {
                var self = addController;

                var invalidate = self.validator(data, self.validate);
                if (invalidate !== true) {
                    invalidate.forEach(function(el){
                        addView.inputInvalid("[name=" + el + "]")
                    }) 
                } else {
                    data.location = self.location;
                    var event = new MyEvent(data);
                    collection.add(event)
                    window.location.hash = "#list";
                }
            }
        })

        return addController;
    }
)

