import path from 'path'
import { createRequire } from 'module'
import webpack from 'webpack'

const require = createRequire(import.meta.url)

export default {
    entry: './src/main.js',
    output: {
        path: path.resolve('dist'),
        filename: 'insomnia-importers-browser.js',
        library: {
            type: 'module'
        }
    },
    resolve: {
        fallback: {
            // all of these polyfills are required to use insomnia-importers
            // somehow this package has ended up using every internal node js
            // library available in existence ;-;
            // the major culprit is this npm package: apiconnect-wsdl
            'stream': require.resolve('stream-browserify'),
            'url': require.resolve('url/'),
            'util': require.resolve('util/'),
            'zlib': require.resolve('browserify-zlib'),
            'buffer': require.resolve('buffer/'),
            'crypto': require.resolve('crypto-browserify'),
            'http': require.resolve('stream-http'),
            'assert': require.resolve('assert/'),
            'https': require.resolve('https-browserify'),
            'path': require.resolve('path-browserify'),
            'timers': require.resolve('timers-browserify'),
            'fs': false,
        }
    },
    mode: 'production',
    experiments: {
        outputModule: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({}),
            'process.platform': '',
            'process.browser': JSON.stringify(true)
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ]
}
