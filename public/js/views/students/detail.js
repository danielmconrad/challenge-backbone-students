define([
    'jquery',
    'text!templates/students/detail.hbs'
], function(
    $,
    studentsListTemplate
){

    return Backbone.View.extend({

        el: $('#app-container'),

        template: Handlebars.compile(studentsListTemplate),
        
        render: function(student){

            var boundTemplate = this.template({ 
                student: student.toJSON()
            });

            this.$el.html(boundTemplate);
        },

        clicked: function(e){
            e.preventDefault();
            var id = $(e.currentTarget).attr('data-id');
        }
    });
});