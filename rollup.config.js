const resolve = require('@rollup/plugin-node-resolve') ;
const commonjs = require('@rollup/plugin-commonjs') ;
const json = require('@rollup/plugin-json');
const analyze = require('rollup-plugin-analyzer')

module.exports = {
	input: 'core/index.js',
	output: {
        file:'dist/index.js',
		format: 'cjs'
	},
    plugins:[
        resolve(),
        json(),
        commonjs(),
        analyze()
    ],
    external:['electron']    
}