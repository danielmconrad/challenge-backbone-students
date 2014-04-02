require.config({
    paths: {
        backbone: 'lib/backbone/backbone-min',
        bootstrap: 'lib/bootstrap/bootstrap.min',
        handlebars: 'lib/handlebars/handlebars-v1.3.0',
        jquery: 'lib/jquery/jquery-2.1.0.min',
        text: 'lib/require/text',
        underscore: 'lib/underscore/underscore-min',
    },
    shim: {
        'app': {
            deps: ['bootstrap', 'handlebars']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['app'], function(app){

    window.app = app;

    app.initialize();
});