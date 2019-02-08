# Front end build

Our front end is built using Webpack. We use the
[babel-loader](https://github.com/babel/babel-loader) along with the
[env](https://webpack.js.org/plugins/environment-plugin/) plugin and the
[react](https://babeljs.io/docs/en/babel-preset-react), and
[stage-2](https://babeljs.io/docs/en/babel-preset-stage-2) Babel presets to
build the Javascript parts of the app. We use the
[sass-loader](https://github.com/webpack-contrib/sass-loader),
[postcss-loader](https://github.com/postcss/postcss-loader),
[css-loader](https://github.com/webpack-contrib/css-loader), and
[extract-loader](https://github.com/peerigon/extract-loader) for our styles.

Webpack injects some environment variables into the front end code. For
example, in the code, references to `process.env.API_URL` are replaced at build
time with the actual value of that environment variable. Here's the full list
of environment variables that gets replaced:

| variable name | purpose                                      |
| ------------- | -------------------------------------------- |
| `API_URL`     | The base URL to the API. **default**: `null` |

## Production

In production, our configuration produces three compiled files and a variety of
files copied from static sources.

| file/path  | where it comes from                                                             |
| ---------- | ------------------------------------------------------------------------------- |
| index.html | Entry page, copied directly from `src/index.html`, unchanged                    |
| app.js     | The React app and all necessary libraries (entrypoint is `src/app.js`)          |
| app.css    | Our primary styles, built from Sass (entrypoint is `src/styles/index.scss`)     |
| legacy.css | Our legacy styles (entrypoint is `src/styles/legacy.css`)                       |
| static     | Images and other static resources, copied directly from `src/static`, unchanged |

Additionally, our Javascript is run through the
[webpack uglify plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
to minify it.

## Development

In development, our configuration uses hot reloading to update the contents of
the browser without having to reload the page. Our Sass and CSS are not split
into separate files, and are instead injected into the app Javascript and are
loaded via `<script>` tags, courtesy of the
[webpack style-loader](https://github.com/webpack-contrib/style-loader)
