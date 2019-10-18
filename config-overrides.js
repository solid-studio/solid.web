const { override, overrideDevServer, fixBabelImports, addLessLoader } = require('customize-cra');
const fs = require('fs');
const path = require('path')

const notifyWatchers = () => config => {
    console.log("Notify watchers called", config)
    // config.writeToDisk = true;
    // config.contentBase = './dist' // currently in public
    config.after = (app, server) => {
        fs.writeFile("./log-after.json", config.writeToDisk, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
    return config;
}

const addWorkerLoaderModule = () => config => {
    config.module.rules.push({
        test: /\.worker\.ts$/,
        use: {
            loader: 'worker-loader'
        }
    })
    config.output.globalObject = 'this';
    // config.output = { path: path.resolve(__dirname, '..', 'disttest') }
    // config.output = {
    //     filename: '[name].bundle.js',
    //     path: path.resolve(__dirname, 'dist'),
    //     publicPath: '/',
    // }
    return config;
}


module.exports = {
    webpack: override(
        addWorkerLoaderModule(),
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'true',
        }),
        addLessLoader({
            javascriptEnabled: true
        })
    ),
    devServer: overrideDevServer(
        // dev server plugin
        notifyWatchers()
    )
};

// module.exports = {
//     webpack: rewireWebpackConfig,
//     jest: (config) => {
//         config.moduleNameMapper = {
//             "\\.worker.js": "<rootDir>/__mocks__/workerMock.js"
//         };
//         return config;
//     }
// };