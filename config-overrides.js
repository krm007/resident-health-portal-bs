/* config-overrides.js */
const tsImportPluginFactory = require('ts-import-plugin');
const {getLoader} = require("react-app-rewired");

module.exports = function override(config, env) {
    const tsLoader = getLoader(
        config.module.rules,
        rule =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory([
                {
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: 'css',
                },
                {
                    camel2DashComponentName: false,
                    libraryDirectory: "",
                    libraryName: "@material-ui/core"
                },
                {
                    camel2DashComponentName: false,
                    libraryDirectory: "",
                    libraryName: "@material-ui/core/styles"
                },
                {
                    camel2DashComponentName: false,
                    libraryDirectory: "",
                    libraryName: "@material-ui/core/colors"
                },
                {
                    camel2DashComponentName: false,
                    libraryDirectory: "",
                    libraryName: "@material-ui/icons"
                }
            ])]
        })
    };

    return config;
};