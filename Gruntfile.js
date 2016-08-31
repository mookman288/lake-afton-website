/*global module:false*/
module.exports = function(grunt) {
	'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
      return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    //var fs = require('fs');
    //var path = require('path');

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		production_files: ["dist/**"],

		// Task configuration.
	    clean: {
	      dist: ['dist']
	    },

		copy: {
			content: {
				expand: true,
				cwd: 'src/content',
				src: '**',
				dest: 'dist/content/'
			},
			svg: {
				expand: true,
				cwd: 'src/img/',
				src: '*.svg',
				dest: 'dist/img/'
			}
		},

		/*
		concat: {
			htaccess: {
				src: ['src/htaccess/head.htaccess', 'src/htaccess/config.htaccess', 'src/htaccess/oldpages.htaccess', 'src/htaccess/staticfiles.htaccess', 'src/htaccess/external.htaccess', 'src/htaccess/rewrites.htaccess'],
				dest: '.htaccess'
			}
		},
		*/

		uglify: {
			options: {
				//banner: '<%= banner %>'
			},
			app: {
				src: ['src/js/vendor/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.js', 'src/js/vendor/pace.js', 'src/js/main.js'],
				dest: 'dist/js/app.min.js'
			}
		},

		sass: {
			app: {
				options: {
					style: 'compressed'
				},
				src: 'src/scss/app.scss',
				dest: 'dist/css/app.min.css'
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: false,
				latedef: true,
				newcap: false,
				noarg: true,
				sub: false,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					process: true,
					"$": false,
					"console": false,
					"ga": false
				}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			main: {
				src: 'src/js/main.js'
			}
		},

		img: {
	        main: {
	            src: ['src/img/**'],
	            dest: 'dist/img'
	        }
	    },

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			mainJS: {
				files: ['<%= uglify.app.src %>'],
				tasks: ['jshint:main','uglify:app']
			},
			content: {
				files: ['src/content/**'],
				tasks: ['copy:content']
			},
			sass: {
				files: 'src/scss/**',
				tasks: ['sass:app']
			},
			/*htaccess: {
				files: ['<%= concat.htaccess.src %>'],
				tasks: ['concat:htaccess']
			},*/
			img: {
				files: 'src/img/**',
				tasks: ['img:main']
			}
		}

		/*
		realFavicon: {
			favicons: {
				src: 'src/favicon/favicon.svg',
				dest: 'dist/favicon/',
				options: {
					iconsPath: 'dist/favicon/',
					html: [ 'dist/template/favicon-meta-tags.html' ],
					design: {
						ios: {
							pictureAspect: 'backgroundAndMargin',
							backgroundColor: '#ffffff',
							margin: '28%',
							appName: 'Lake Afton Public Observatory'
						},
						desktopBrowser: {},
						windows: {
							masterPicture: {
								type: 'inline',
								content: 'dist/favicon/favicon-transparent.svg'
							},
							// dedicated_picture: 'dist/favicon/favicon-transparent.svg',
							pictureAspect: 'whiteSilhouette',
							backgroundColor: '#2d89ef',
							onConflict: 'override',
							appName: 'Lake Afton Public Observatory'
						},
						androidChrome: {
							pictureAspect: 'shadow',
							themeColor: '#268bd2',
							manifest: {
								name: 'Lake Afton Public Observatory',
								startUrl: 'http://www.lakeafton.com',
								display: 'browser', //other option: 'standalone',
								orientation: 'notSet',
								onConflict: 'override'
							}
						},
						safariPinnedTab: {
							masterPicture: {
								type: 'inline',
								content: 'dist/favicon/favicon-transparent.svg'
							},
							// dedicated_picture: 'dist/favicon/favicon-transparent.svg',
							pictureAspect: 'silhouette',
							themeColor: '#268bd2'
						}
					},
					settings: {
						compression: 2,
						scalingAlgorithm: 'Mitchell',
						errorOnImageTooSmall: false
					},
					versioning: true
				}
			}
		}
		*/
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-real-favicon');
	grunt.loadNpmTasks('grunt-img');

	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'img', 'copy']);
};
