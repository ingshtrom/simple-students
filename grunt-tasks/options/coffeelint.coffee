module.exports =
  options:
    configFile: 'coffeelint.json'
  app:  ['<%= gruntConfig.srcDir %>/**/*.coffee']
  tests:['<%= gruntConfig.testDir %>/**/*.coffee']
  grunt:['tasks/**/*.coffee']
