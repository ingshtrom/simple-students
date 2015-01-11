###
  Watch task for automatically building coffeescript on the fly
  @module mystic-noggin
  @submodule Gruntfile
  @task watch
###
module.exports =
  files: ['<%= gruntConfig.srcDir %>/server/**/*.coffee', '<%= gruntConfig.testDir %>/server/**/*.coffee']
  tasks: ['build', 'hapi']
  options:
    spawn: false
