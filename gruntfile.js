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
                    'js/app/blocks/**/*.js',
                    'js/app/core/*.js',
                    'js/app/widgets/**/*.js',
                    'js/app/home/*.js',
                    'js/app/design/*.js',
                    'js/app/dev/*.js',
                    'js/app/photo/*.js',
                    'js/app/dev-detail/*.js'
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
                src: ['js/build-grunt/min/', 'js/build-grunt/temp/']
            }
        },
        uglify: {
            options: {
                //Se utiliza para no cambiar de nombre a las variable tuvimos un problema con config.js
                mangle: false
            },
            js: { //target
                expand: true,
                src: ['app/app.module.js', 
                    'app/blocks/**/*.js',
                    'app/core/*.js',
                    'app/widgets/**/*.js',
                    'app/home/*.js',
                    'app/design/*.js',
                    'app/dev/*.js',
                    'app/photo/*.js',
                    'app/dev-detail/*.js'],
                dest: 'js/build-grunt/temp/',
                cwd: 'js/'
            }
        },
        concat: {
            js: { //target
                src: ['js/build-grunt/temp/**/*.module.js',
                'js/build-grunt/temp/**/*.js'],
                dest: 'js/build-grunt/min/app.js'
            }
        } 

    });
    
    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //register grunt default task
    grunt.registerTask('default', ['jshint','clean','uglify','concat']);
};

