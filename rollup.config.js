import path from 'path'
import fs from 'fs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import { main as packageMain, module as packageModule } from './package.json'

const copy = () => ({
  name: 'copy',
  load: function () {
    this.addWatchFile(path.resolve('./src/style.css'))
  },
  generateBundle: function () {
    fs.copyFileSync(
      path.resolve('./src/style.css'),
      path.resolve('./dist/style.css')
    )
  }
})

export default {
  input: 'src/index.js',
  output: [
    { file: packageMain, format: 'cjs', sourcemap: true },
    { file: packageModule, format: 'es', sourcemap: true }
  ],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
    copy()
  ],
  external: [ 'react', 'prop-types', 'styled-components' ]
}
