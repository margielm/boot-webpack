var webpack = require("webpack");

module.exports = {
    //entry: './src/javascript/entry.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['./src/main/javascript/', 'node_modules', 'bower_components']
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )

    ]
};