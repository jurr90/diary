function formatDate(date) {
    if (!date) {
        return "";
    }

    var dd = date.getDate()
    if ( dd < 10 ) dd = '0' + dd;
 
    var mm = date.getMonth()+1
    if ( mm < 10 ) mm = '0' + mm;
 
    var yyyy = date.getFullYear() 
 
    return yyyy + '-' + mm + '-' + dd
}

var PubSub = {
    subscribe: function(ev, callback) {
        // Создание объекта _callbacks, если только он уже не существует
        var calls = this._callbacks || (this._callbacks = {});
        // Создание массива для заданного ключа события, если только он уже не
        // существует, а затем добавление внешнего вызова к массиву
        (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
        return this;
    },

    publish: function() {
        // Превращение аргументов объекта в настоящий массив
        var args = Array.prototype.slice.call(arguments, 0);
        // Извлечение первого аргумента (имени события)
        var ev = args.shift();
        // Возврат управления, если это не объект _callbacks или
        // если он не содержит массив для заданного события
        var list, calls, i, l;
        if (!(calls = this._callbacks)) return this;
        if (!(list = this._callbacks[ev])) return this;
        // Вывоз внешних функций
        for (i = 0, l = list.length; i < 1; i++)
        list[i].apply(this, args);
        return this;
    }
};
