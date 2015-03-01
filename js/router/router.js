define([], function() {
    var Router = function() {
        this.routers = {};
        this.defaultRoute = '#list';

        this.addRoute = function(uri, func) {
            if (typeof uri !== 'string') {
                throw new TypeError(uri + " not a string")
            };
            
            if (typeof func !== 'function') {
                throw new TypeError(func + " not a function")
            };

            this.routers[uri] = {
                pattern: new RegExp('^'+uri.replace(/:\w+/, '(\\d+)')+'$'),
                callback: func,
            }
        }
        
        this.changeState = function(uri) {
            var status = false;
            //Перебор роутов, находим роут по реулярке и вызываем callback
            _.each(this.routers, function(router) { 
                var args = uri.match(router.pattern);
                if (args) {
                    try {
                        //даем функции аргументы
                        router.callback.apply(this, args.splice(1)); 
                    } catch(e) {
                        //если ссылка введена не верно, выдаст что такой страницы не существует
                        console.log("404");
                    } finally {
                        status = true;
                    }
                }
            })   

            if (!status) {
                $("#container").html("<h1>404 Page is not found</h1>")
            } 
        }
    }

    return Router;
})

    