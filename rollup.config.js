import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es'
    },
    plugins: [
        commonjs(),
        nodeResolve({
            browser: true
        }),
        json(),
        nodePolyfills()
    ]
}
