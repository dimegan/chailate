module.exports = function(grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
          //grunt task configuration will go here
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: { //"app" target
                files: {
                    'js/build-grunt/min-safe/app.module.js': ['js/app/app.module.js'],
                    'js/build-grunt/min-safe/blocks/router/router.module.js': ['js/app/blocks/router/router.module.js'],
                    'js/build-grunt/min-safe/blocks/router/routehelper.js' : ['js/app/blocks/router/routehelper.js']
                }
            }
        },
        concat: {
            js: { //target
                src: ['js/build-grunt/min-safe/app.module.js'],
                dest: 'js/build-grunt/min/app.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            js: { //target
                src: ['js/app/app.module.js'],
                dest: 'js/build-grunt/min/app.js'
            }
        } 
        /*uglify: {
            js: {
              files: [{
                  expand: true,
                  cwd: 'js/app',
                  src: 'js/build-grunt/min/app.js',
                  dest: 'js/build-grunt/min/app.js'
              }]
            }
          }*/

    });
    
    //load grunt tasks
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //register grunt default task
    //grunt.registerTask('default', ['ngAnnotate','concat','uglify']);
    grunt.registerTask('default', ['uglify']);
}

