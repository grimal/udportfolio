/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

var ngrok = require('ngrok');

module.exports = function(grunt) {
  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
		  optimizationLevel: 3, // 232 * 300
          engine: 'im',
          sizes: [{
			  width: 187,
        height: 243,
			  quality: 30
		  }, {
			  width: 94,
        height: 121,
			  quality: 30
          }, {
        width: 100,
        height: 75,
        quality: 30
          },{
			  width: 31,
        height: 40,
			  quality: 30
          }]
        },
        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },
    // PageSpeed module
    pagespeed: {
      options: {
       nokey: true,
       locale: "en_GB",
       threshold: 40
       },
      local: {
        options: {
          strategy: "desktop"
          }
        },
        mobile: {
          options: {
            strategy: "mobile"
          }
        }
    },
    // imagemin module
    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 7,
          progressive: true
          // cache: false,
          // svgoPlugins: [{ removeViewBox: false }]
          // use: [mozjpeg()]
        },
        files: [{
        expand: true,                  // Enable dynamic expansion
            src: ['*.{gif,jpg,png}'],
            cwd: 'images/',
            dest: 'images-min/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images/'
        }]
      },
    },
  });

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8000;
    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
        }
        grunt.config.set('pagespeed.options.url', url);
        grunt.task.run('pagespeed');
        done();
    });
  });

  // Register default tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'imagemin']);
  grunt.registerTask('grok', ['psi-ngrok']);
};