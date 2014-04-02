define([
	'backbone',
	'models/student'
], function(
	Backbone, 
	StudentModel
){
	return Backbone.Collection.extend({
		model: StudentModel
	});
});