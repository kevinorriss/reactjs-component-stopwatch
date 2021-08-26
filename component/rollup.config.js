import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const config = {
    input: 'src/Stopwatch.js',
    external: ['react'],
    plugins: [
        postcss({
            extensions: ['.css']
        }),
        babel({
            exclude: "node_modules/**"
        }),
        nodeResolve(),
        commonjs()
    ],
    output: {
        format: 'umd',
        name: 'stopwatch',
        globals: {
            react: "React"
        }
    }
}
export default config