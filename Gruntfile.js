module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: [ '**/*.js','./data/svg/monostable.svg	'],
      tasks: [],
      options:{livereload:true}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};