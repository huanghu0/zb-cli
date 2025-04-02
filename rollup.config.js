import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js', // 入口文件路径
  output: {
    file: 'dist/index.js', // 输出文件路径
    format: 'esm', // 输出格式，如 cjs、esm 等
    sourcemap: false, // 是否生成 source map
  },
  plugins: [
    terser(), // 压缩代码
  ],
};