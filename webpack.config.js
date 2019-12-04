const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        entry: 'index.tsx',
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: 'public/temp.html',
                production: process.env.NODE_ENV === 'production'
            })
        ]
    }
};
