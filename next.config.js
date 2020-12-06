module.exports = {
    webpack: (config, options) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        //   config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
        // console.log(config.module.rules)
        config.module.rules.push({
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                }, ],
            }, )
            // Important: return the modified config
        return config
    },
}