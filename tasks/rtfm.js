module.exports = function(grunt) {
  grunt.registerMultiTask('rtfm', 'Build a javascript object containing all properly formatted documentation', function() {
    var async        = require('async')
      , file_objects = grunt.file.expandMapping(this.data, 'temp/', { flatten: true });

    async.series([
      function get_file_names(callback) {
        var files = [];

        for (var i = file_objects.length - 1; i >= 0; i--) {
          files.push(file_objects[i].src[0]);
        };
        callback(null, files);
      }
    ],
      function concatenate_file_data(err,results) {
        async.concat(results[0], 
          function read_file(file,callback) {
            callback(null, grunt.file.read(file));
          },
          function build_document_object(err, file_data) {
            var obj = build_json_object(file_data.toString().match(/\/\*\*\s*\@(\w*):\s*(\w*)(?:(?!\*\/)[\s\S])*/g))

            console.log(obj);
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