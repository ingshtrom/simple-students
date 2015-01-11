###
  Create the logs directory, and any other directory
  needed for building/running the app
  @module mystic-noggin
  @submodule Gruntfile
  @task create-struct
###
module.exports = (grunt) ->
  grunt.registerTask "create-struct", -> grunt.file.mkdir(grunt.config("serverConfig.logger.logDir"))
