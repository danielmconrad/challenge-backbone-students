define([
    'jquery',
    'underscore',
    'text!templates/students/list.hbs'
], function(
    $,
    _,
    studentsListTemplate
){

    return Backbone.View.extend({

        el: $('#app-container'),

        template: Handlebars.compile(studentsListTemplate),
        
        render: function(students){

            var boundTemplate = this.template({ 
                students: students.toJSON()
            });

            this.$el.html(boundTemplate);

            this.bindActions();
        },

        bindActions: function(){
            var self = this;

            this.$el.find('[data-action="compare"]').on('click', function(){

                var selectedCheckboxes = self.$el.find('input[type="checkbox"]:checked');

                if(!selectedCheckboxes.length){
                    alert('Please select one or more students');
                    return;
                }

                var selectedIdsArray = _.map(selectedCheckboxes.toArray(), function(element){ return $(element).attr('data-id')});
                var selectedIds = selectedIdsArray.join('+');
                
                app.router.navigate('students/compare/'+selectedIds, {trigger: true});
            })
        }
    });
});