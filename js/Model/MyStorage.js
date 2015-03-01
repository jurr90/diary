define([], function() {
	//Расчет нового id, в дальнейшем функцию можно усложнить, добавить приставки, что бы не было конфликта.
	var getNewId = function() {
		var keys = [];
		for (var key in localStorage) {
			if (!isNaN(key)) {
				keys.push(key)
			}
		}		

		if (keys.length === 0) {
			return 0;
		}

		return Math.max.apply(window, keys) + 1;
	}

	//Создаем коллекцию из локал сторедж
	var MyStorage = function() {
		this.collection = [];
		this.getAll();
	};

	//Добавляем в коллекцию
	MyStorage.prototype.add = function(ev) {
		var id = getNewId();
		ev.id = id;

        localStorage.setItem(id, JSON.stringify(ev))
	};

	//Получить все элементы из локал сторедж
	MyStorage.prototype.getAll = function() {
		this.collection = [];
		for (var key in localStorage) {
			if (!isNaN(key)) {
				this.collection.push(JSON.parse(localStorage.getItem(key)))
			}
		}

		return this;
	};

	//Поиск по id
	MyStorage.prototype.findById = function(id) {
		this.getAll();
		return this.collection[id];
	};

	//Удаление по id
	MyStorage.prototype.removeById = function(id) {
		localStorage.removeItem(id);
	};

	MyStorage.prototype.filter = function(callback) {
		this.getAll();
		return _.filter(this.collection, callback)
	}

	MyStorage.prototype.sort = function(callback) {
		this.getAll();
		return _.sortBy(this.collection, callback);
	}

	MyStorage.prototype.update = function(ev, id) {
		ev.id = id;
		
        localStorage.setItem(id, JSON.stringify(ev))
	};

	return MyStorage;
})

