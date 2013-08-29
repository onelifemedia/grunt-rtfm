grunt-rtfm
==========

I find myself writing a lot of documentation on large projects.  No one ever reads the documentation, because it's too much hassle to head to the wiki, or wherever the docs reside.  Now, there's no excuse.

RTFM takes all of the documentation in your project, and puts it in a javascript object.  When you're in your web browser's dev tools, just type:

```javascript
rtfm.<function name>
```

Then the documentation for that function magically appears.


Installation
------------

Go into your project root, and type:

```
npm install grunt-rtfm
```

Check to make sure that grunt-rtfm is in your node_modules folder.  If you don't have a node_modules folder, type:

```
mkdir node_modues
```

Then try to install grunt-rtfm again.


Setup
-----

You'll need to make sure that you have [Grunt](http://gruntjs.com/getting-started) installed.  Once that's done, make a grunt file that looks something like this:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    rtfm: {
      files: {
         src: ['demo/**/*.js']
        ,dest: 'app/js/rtfm.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-rtfm');
  grunt.registerTask('default', ['rtfm']);
};
```

Then from the command line, you can type:

```
grunt
```

and your documentation will be thrown into a javascript object, that can be loaded into your browser.  (more on that later)


The Documentation Format
------------------------

The documentation needs to look something like this:

```javascript
/**
  @name: carousel

  @description: This is a special piece of documentation.  I think that we should be able build the JSON object from this doc.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo turpis nec est molestie, vitae pulvinar
  enim semper. Etiam non auctor massa. Vestibulum ultricies blandit volutpat. Aenean faucibus ac nibh vel posuere.
  Vestibulum pretium nisi eros, vel pulvinar dui aliquam in. Maecenas iaculis, risus in volutpat volutpat, sapien
  justo suscipit urna, at ullamcorper orci elit in sapien. Maecenas pulvinar congue magna, eu blandit enim
  vulputate a.

  @example: 
  <script type="text/javascript">
    (function() {
      console.log("something or other.  Make sure that I have some other symbols in here @)(#*R:$:#(%*)#(%R");
    })
  </script>

  <carousel dots="true">
    <slide src="path/to/image.jpg" href="/fancy.html">
    <slide src="path/to/another_image.jpg" href="/pants.html">
  </carousel>
*/
```

The "@name" is a special tag, that makes the entry in the document.  So make sure that junk exists, or else you'll never find your document entry.


Known Issues
------------

If there are name conflicts, currently, I just overwrite the previous documentation.  I think that's bad...and I feel bad.  I just can't think of a better solution.  Come up with a better solution?  [Feel free to create an issue](https://github.com/onelifemedia/grunt-rtfm/issues)
