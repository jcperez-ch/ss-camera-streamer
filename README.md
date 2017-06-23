# SoftSolute Camera Streamer

## Install dependencies
Just run `npm install` or `yarn`.

## Building
Run `npm run watch` or `yarn run watch` will build the sources, start watching for changes and serve the project.
It also will live reload the page when new changes are bundled.
The served page can be accessed via http://localhost:3003/.

### Production build
Running `npm run build` or `yarn build` will create a production build, which doesn't include the server and livereload.
The production build will also be minified.

## Linting
The project includes tslint as a linter, which can be run with `npm run lint` or `yarn run lint`.
