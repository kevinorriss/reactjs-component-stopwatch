import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'

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
        uglify()
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