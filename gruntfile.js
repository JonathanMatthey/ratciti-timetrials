module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'public/css/application.css': 'sass/application.scss'
        }
      }
    },
    watch: {
      source: {
        files: ['sass/**/*.scss', 'views/**/*.jade'],
        tasks: ['sass'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass']);
};