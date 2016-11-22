module.exports=function (grunt) {
    grunt.initConfig({
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 4000
                    },
                    cwd: __dirname
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.option('force', true)
    grunt.registerTask('default', ['nodemon'])

}

