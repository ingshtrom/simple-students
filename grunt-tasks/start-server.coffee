###
  Start a dev server
  @module mystic-noggin
  @submodule Gruntfile
  @task start-server
###
module.exports = (grunt) ->
  grunt.registerTask 'start-server', ->
    grunt.util.spawn
      cmd: "npm"
      args: ["start"]
      opts:
        stdio: "inherit"
