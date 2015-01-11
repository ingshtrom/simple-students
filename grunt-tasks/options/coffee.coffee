###
  configuration for "coffee" tasks
  @module mystic-noggin
  @submodule Gruntfile
  @task coffee
###
module.exports =
  dev:
    expand: true
    cwd: "<%= gruntConfig.srcDir %>"
    src: ["**/*.coffee"]
    dest: "<%= gruntConfig.pubDir %>"
    ext: ".js"
  test:
    expand: true
    cwd: '<%= gruntConfig.testDir %>'
    src: ['**/*.coffee']
    dest: '<%= gruntConfig.testOutDir %>'
    ext: '.js'
