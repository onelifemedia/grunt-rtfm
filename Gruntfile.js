/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    rtfm: {
      files: {
         src: ['demo/**/*.js']
        ,dest: 'app/js/rtfm.js'
      }
    }
  });
};
