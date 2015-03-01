define([], function() {
    var View = function(events, el, template) {
        this.events   = events;
        this.el      = el;
        this.template = template;
    }

    View.prototype.extend = function(option) {
        _.extend(this, option || {})
    }

    View.prototype.handlerEvent = function() {
        for(var key in this.events) {
            var eventName = key.match(/^(.{1,}?)\s+/)[1];
            var selector = key.replace(/^.{1,}?\s+/, '');
            $(this.el).find(selector).on(eventName, this[this.events[key]]);
        }
    }

    View.prototype.render = function(data) {
        data = data || {};
        $(this.el).html(this.template(data));
    }

    return View;
})