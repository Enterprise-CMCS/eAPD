# Front end build

Our front end is built using a pretty simple Webpack configuration. We
use the [babel-loader]() along with the [env](), [react](), and [stage-2]()
Babel presets to build the app.

Webpack also injects some environment variables into the front end code. For
example, in the code, references to `process.env.API_URL` are replaced at build
time with the actual value of that environment variable. Here's the full list
of environment variables that gets replaced:

| variable name | purpose                                      |
| ------------- | -------------------------------------------- |
| `API_URL`     | The base URL to the API. **default**: `null` |
