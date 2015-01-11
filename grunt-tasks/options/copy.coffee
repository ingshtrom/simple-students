module.exports = {
  main: {
    files: [
      {
        expand: true,
        cwd: '<%= gruntConfig.srcDir %>',
        src: ['**/*.js', '**/*.css', '**/*.html', '**/*.svg'],
        dest: '<%= gruntConfig.pubDir %>',
        filter: 'isFile'
      }
    ]
  }
}
