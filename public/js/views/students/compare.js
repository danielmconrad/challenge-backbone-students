define([
    'jquery',
    'text!templates/students/compare.hbs'
], function(
    $,
    studentsListTemplate
){

    return Backbone.View.extend({

        el: $('#app-container'),

        template: Handlebars.compile(studentsListTemplate),
        
        render: function(students, schedule){

            var boundTemplate = this.template({ 
                students: students.toJSON(),
                schedule: schedule
            });

            this.$el.html(boundTemplate);
        },

        clicked: function(e){
            e.preventDefault();
            var id = $(e.currentTarget).attr('data-id');
        }
    });
});