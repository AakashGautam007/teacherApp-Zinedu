// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// module.exports = getDefaultConfig(__dirname);
const { getDefaultConfig } = require("metro-config");



module.exports = (async () => {

    const {

        resolver: { sourceExts, assetExts },

    } = await getDefaultConfig();

    return {

        transformer: {

            babelTransformerPath: require.resolve("react-native-svg-transformer"),

        },

        resolver: {

            assetExts: assetExts.filter((ext) => ext !== "svg"),

            sourceExts: [...sourceExts, "svg"],

            // sourceExts: ['cjs', 'js', 'ts', 'jsx', 'tsx', 'svg', 'png', 'jpg', 'jpeg', 'native', 'android.cjs' |.native.cjs |.cjs |.android.js |.native.js |.js |.android.ts |.native.ts |.ts |.android.jsx |.native.jsx |.jsx |.android.tsx |.native.tsx |.tsx |.android.json |.native.json |.json],

        },

    };

})();
