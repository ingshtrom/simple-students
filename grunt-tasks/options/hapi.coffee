###
  configuration for "hapi" tasks
  @module mystic-noggin
  @submodule Gruntfile
  @task hapi
###
module.exports =
  custom_options:
    options:
      server: require('path').resolve('./build/server/index')
      bases:
        "/build": "./<%= gruntConfig.pubDir %>"
        "/src": "./<%= gruntConfig.srcDir %>"
