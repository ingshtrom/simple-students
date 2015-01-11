###
  Start a dev server that will watch for file changes
  and restart the server.
  @module mystic-noggin
  @submodule Gruntfile
  @task dev-server
###
module.exports = (grunt) ->
  grunt.registerTask 'dev-server', ->
    grunt.task.run [
      'build'
      'hapi'
      'watch'
    ]
