module.exports = function(grunt) {
  grunt.registerMultiTask('rtfm', 'Build a javascript object containing all properly formatted documentation', function() {
    var async        = require('async')
      , src          = this.data.src
      , dest         = this.data.dest
      , file_objects = grunt.file.expandMapping(src, 'temp/', { flatten: true });

    async.series([
      /**
       @name: get_file_names
       @parameters:
        <function> callback: The callback function
       @description: Grab all of the files names that fit the description given to us from Grunt.
      */
      function get_file_names(callback) {
        var files = [];

        for (var i = file_objects.length - 1; i >= 0; i--) {
          files.push(file_objects[i].src[0]);
        };
        callback(null, files);
      }
    ],
      /**
       @name: concatenate_file_data
       @parameters:
        <string>   err:      If there were any errors, you can find them here.
        <function> callback: The callback function
       @description: Take a bunch of files and concatenate them into one string.
      */
      function concatenate_file_data(err,results) {
        async.concat(results[0], 
          /**
           @name: read_file
           @parameters:
            <string>   file:     File name for the file that we intend to read
            <function> callback: The callback function
           @description: Read one file, using Grunt's file utility
          */
          function read_file(file,callback) {
            callback(null, grunt.file.read(file));
          },
          /**
           @name: build_document_object
           @parameters:
            <string> err:       If there were any errors, you can find them here.
            <string> file_data: All of the file contents.
           @description: Takes all of the data that we have, and build our RTFM object.  After it's build, output it to the file specified by the dest option.  You can change that in the Gruntfile.
          */
          function build_document_object(err, file_data) {
            var obj = build_json_object(file_data.toString().match(/\/\*\*\s*\@(\w*):\s*(\w*)(?:(?!\*\/)[\s\S])*/g))

            try {
              grunt.file.write(dest, 'window.rtfm = ' + JSON.stringify(obj));
            } catch(e) {
              grunt.log.error("There was an issue exporting the file.  Error: " + e.toString());
            }
          }
        )
      }
    )
  });

  /**
   @name: build_json_object
   @parameters:
    <array> file_content_array: array of documentation blocks
   @description: Builds an object, based off of the array.

  */
  function build_json_object(file_content_array) {
    var document_object = {}
      , temp_object     = {}
      , name            = void 0
      , temp_elements   = {};

    if(!!file_content_array) {
      for (var i = file_content_array.length - 1; i >= 0; i--) {
        temp_object   = {}
      , name          = void 0
      , temp_elements = build_json_element(file_content_array[i].split(/\n\s*@/));

        if(!!temp_elements) {
          if(temp_elements.hasOwnProperty('name')) {
            name = temp_elements['name'];
          }
          for(var index in temp_elements) {
            temp_object[index] = temp_elements[index];
          } 
        }
        if(!!name) {
          // TODO: What should I do if there's a collision?
          document_object[name] = temp_object;
        }
      }
    }
    return document_object;
  }

  /**
   @name: build_json_element
   @parameters:
    <array> document_elements: 
   @description: Builds an object, based off of the array.

  */
  function build_json_element(document_elements) {
    var obj                    = {}
      , document_element_array = [];

    for (var i = document_elements.length - 1; i >= 0; i--) {
      document_element_array = document_elements[i].split(':');

      if( document_element_array.length < 2 ) {
        continue;
      }
      else {
        obj[ document_element_array.shift() ] = document_element_array.join(':').trim();
      }
    };
    return obj;
  }
};