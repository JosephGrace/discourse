Discourse.computed = {

  /**
    Returns whether two properties are equal to each other.

    @method propertyEqual
    @params {String} p1 the first property
    @params {String} p2 the second property
    @return {Function} computedProperty function
  **/
  propertyEqual: function(p1, p2) {
    return Ember.computed(function() {
      return this.get(p1) === this.get(p2);
    }).property(p1, p2);
  },

  /**
    Uses an Ember String `fmt` call to format a string. See:
    http://emberjs.com/api/classes/Ember.String.html#method_fmt

    @method fmt
    @params {String} properties* to format
    @params {String} format the format string
    @return {Function} computedProperty function
  **/
  fmt: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var format = args.pop();
    var computed = Ember.computed(function() {
      var context = this;
      return format.fmt.apply(format, args.map(function (a) {
        return context.get(a);
      }));
    })
    return computed.property.apply(computed, args);
  },

  /**
    Creates a URL using Discourse.getURL. It takes a fmt string just like
    fmt does.

    @method url
    @params {String} properties* to format
    @params {String} format the format string for the URL
    @return {Function} computedProperty function returning a URL
  **/
  url: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var format = args.pop();
    var computed = Ember.computed(function() {
      var context = this;
      return Discourse.getURL(format.fmt.apply(format, args.map(function (a) {
        return context.get(a);
      })));
    })
    return computed.property.apply(computed, args);

  }

};
