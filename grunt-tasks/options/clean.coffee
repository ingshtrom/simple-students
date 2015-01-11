module.exports =
  logs: ["<%= serverConfig.logger.logDir %>"]
  build: ["<%= gruntConfig.pubDir %>", "<%= gruntConfig.testOutDir %>"]
