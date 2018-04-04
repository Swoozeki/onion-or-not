module.exports = {
    entry: './src/entry.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/static'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node-modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }
        ]
    },
    watch: true
}