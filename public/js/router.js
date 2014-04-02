define([
    'jquery',
    'underscore',
    'backbone',

    'collections/students',
    'views/students/list',
    'views/students/detail',
    'views/students/compare'
], function(
    $,
    _,
    Backbone,

    StudentsCollection,

    StudentsListView,
    StudentsDetailView,
    StudentsCompareView
){
    
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'students': 'students-list',
            'students/:string': 'students-single',
            'students/compare/:string': 'students-compare',
            '*actions': 'defaultAction'
        }
    });

    _.intersectionObjectsInArrays = function(arrays) {
        var first = arrays[0];
        var rest = arrays.slice(1);
        return _.filter(_.uniq(first), function(item) {
            return _.every(rest, function(other) {
                return _.some(other, function(element) {
                    return _.isEqual(element, item); 
                });
            });
        });
    };

    return {
        initialize: function(){
            var appRouter = new AppRouter;
            appRouter.store = {};
            

            // Index
            appRouter.on('route:index', function(){
                appRouter.navigate('students', {trigger: true});
            });


            // Students
            appRouter.on('route:students-list', function(){
                var studentsListView = new StudentsListView();
                studentsListView.render(appRouter.store.students);
            });


            // Student Detail
            appRouter.on('route:students-single', function(id){
                var student = _.find(appRouter.store.students.models, function(student){ 
                    return student.get('id') == id;
                });
                
                var studentsDetailView = new StudentsDetailView();
                studentsDetailView.render(student);
            });


            // Student Cross Section
            appRouter.on('route:students-compare', function(studentIdsString){

                var studentIds = studentIdsString.split('+');

                var students = _.filter(appRouter.store.students.models, function(student){ 
                    return _.contains(studentIds, student.get('id'));
                });

                students = new StudentsCollection(students);

                var schedules = _.pluck(students.toJSON(), 'schedule');
                var schedule = _.intersectionObjectsInArrays(schedules);

                var studentsCompareView = new StudentsCompareView();
                studentsCompareView.render(students, schedule);
            });


            // No Route
            appRouter.on('defaultAction', function(actions){
                console.log('No route:', actions);
            });


            // Retrieve the data ONCE, then start
            $.getJSON('/data/student-schedules.json', function(studentsRaw){
                
                appRouter.store.students = new StudentsCollection(studentsRaw);

                Backbone.history.start();
            });

            return appRouter;
        }
    };

});