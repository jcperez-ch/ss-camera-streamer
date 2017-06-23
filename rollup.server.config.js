/* eslint-disable import/no-extraneous-dependencies */
import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/server/app.ts',
  dest: 'server.js',
  format: 'cjs',
  external: [
    'chalk',
    'express',
    'http',
    'path',
    'ramda',
    'socket.io',
  ],
  plugins: [
    typescriptPlugin({
        typescript,
        importHelpers: true,
    }),
    uglify(),
  ],
};
