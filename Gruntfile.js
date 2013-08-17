module.exports = function (grunt) {
    'use strict';

    // copies dev files, build compass and watches for changes.
    grunt.registerTask('default',
        [ 'karma:setup', 'build', 'watch']);

    grunt.registerTask('build',
        ['clean', 'shell:generateTests', 'jshint','karma:setup:run', 'requirejs:dev', 'requirejs:dist']);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            options: { force: true },
            all: ['<%= pkg.name %>' + '.js', '<%= pkg.name %>' + '.min.js']
        },

        //Tests Client
        karma: {
            //Enables autowatching of files when running everything.
            setup: {
                configFile: 'tests/karma.conf.js',
                autoWatch: false,
                background: true
            },
            //Development testing does not stop Karma runner.
            dev: {
                configFile: 'tests/karma.conf.js',
                autoWatch: true,
                background: false
            },
            //continuous integration mode: run tests once in PhantomJS browser.
            //Don't use this one look into teamcity runner.
            dist: {
                configFile: 'tests/karma.conf.js',
                singleRun: true,
                autoWatch: false
//                ,
//                browsers: ['PhantomJS']
            }
        },

        //Creates tests file for jasmine html runner
        shell: {
            generateTests: {
                command: './tests/jasmine/generate-tests.sh'
            }
        },

        //Cleanup code.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {src: [
                'lib/**/*.js',
                'tests/**/*.js',
                '!tests/karma*.js'
            ]}
        },

        watch: {
            //run client tests with karma when client code changes (server needs to be already running, 'karma:test')
            client: {
                files: ['lib/**/*', 'tests/**/*.spec.js'],
                tasks: ['build' ]
            }
        },

        //Compile all the client side scripts into one for requirejs.
        requirejs: {
            dev: {
                options: {
                    name: 'lib/index',
                    baseUrl: './',
                    mainConfigFile: 'require.config.js',
                    out: '<%= pkg.name %>' + '.js',
                    optimize: 'none',
                    exclude: [
                        'angular', 'lodash'
                    ]
//                    useSourceUrl: true
                }
            },
            dist: {
                options: {
                    name: 'lib/index',
                    baseUrl: './',
                    mainConfigFile: 'require.config.js',
                    out: '<%= pkg.name %>' + '.min.js',
                    exclude: [
                        'angular'
                    ]
                }
            }
        }
    });

    // Load the plugins
    // Watch the file system for changes.
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Runs client side tests.
    grunt.loadNpmTasks('grunt-karma');
    // Clean code validator.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //Code optimization
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //clean output directory
    grunt.loadNpmTasks('grunt-contrib-clean');
    //Runs shell scripts
    grunt.loadNpmTasks('grunt-shell');

};