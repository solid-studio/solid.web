const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const addWorkerLoaderModule = () => config => {
    config.module.rules.push({
        test: /\.worker\.ts$/,
        use: {
            loader: 'worker-loader'
        }
    })
    config.output.globalObject = 'this';
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
    )
};