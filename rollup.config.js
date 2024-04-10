const resolve = require('@rollup/plugin-node-resolve') ;
const commonjs = require('@rollup/plugin-commonjs') ;
const json = require('@rollup/plugin-json');
const { visualizer  } = require('rollup-plugin-visualizer')
const terser = require("@rollup/plugin-terser")


module.exports = {
	input: 'core/index.js',
	output: {
    file:'dist/index.js',
		format: 'cjs',
    plugins:[terser()]
	},
    plugins:[
        resolve(),
        json(),
        commonjs(),
        visualizer() 
    ],
    external:['electron']    
}