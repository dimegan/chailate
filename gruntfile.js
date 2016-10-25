module.exports = function(grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
          //grunt task configuration will go here
        jshint: {
            dev: {
                src: [
                    'gruntfile.js',
                    'js/app/app.module.js',
                    'js/app/blocks/router/*.js'
                ],
                options: {
                    jshintrc: 'grunt-options/jshintrc.json'
                }
            }
        },
        clean: {
            options: { 
                force: true 
            },
            all: { //target
                src: ['js/build-grunt/min/', 'js/build-grunt/min-safe/']
            }
        },
        concat: {
            js: { //target
                src: ['js/app/app.module.js',
                    'js/app/blocks/router/router.module.js', 
                    'js/app/blocks/router/routehelper.js'],
                dest: 'js/build-grunt/min/app.js'
            }
        },
        uglify: {/*
            options: {
                mangle: false
            },*/
            js: { //target
                src: ['js/build-grunt/min/app.js'],
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //register grunt default task
    //grunt.registerTask('default', ['ngAnnotate','concat','uglify']);
    grunt.registerTask('default', ['jshint','clean','concat','uglify']);
};

