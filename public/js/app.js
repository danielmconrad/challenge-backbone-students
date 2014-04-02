define([
    'backbone',
    'router',
], function(
	Backbone, 
	Router
){
    return {
        initialize: function(){

            var self = this;

            self.router = Router.initialize();

            return this;
        }
    }
});