define([
	'backbone'
], function(
	Backbone
){
	return Backbone.Model.extend({
		initialize: function(){
			var id = this.get('name').split(' ').join('-');
			this.set('id', id);
		}
  	});
});