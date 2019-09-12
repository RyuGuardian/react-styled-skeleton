##### Last updated 2019.09.11

This builds off my other repo here: https://github.com/RyuGuardian/react-bare-bones

## Step 0 (Optional): Switch to Yarn

Yarn is a reliable package manager for locking versions, which makes sure developers are creating builds from the same codebase. Although npm has that capability now, Yarn has a few other features and seems to be more reliable (determined after a lot of reading articles and comments; and it's easier for me to trust the originator in this case (its core use is likely better tested)). It boasts better security as well, supports npm and Bower packages, resolves mismatched versions of dependencies, has an offline mode (trade-off: more storage space is used in development), and has license handling.

### 0.1. Install Yarn

Best use the instructions on the [Yarn website](https://yarnpkg.com/en/docs/install)

### 0.2. Make the Project a Yarn Project

Since this builds off another project, there are settings to be imported (otherwise, just use `yarn init`):

1. Yarn can set up its lock file (**yarn.lock**) from npm's: `yarn import`
1. Then the npm lock file, **package-lock.json** is no longer needed: `rm package-lock.json`, or `git rm package-lock.json` if in a Git repo (and the file is being tracked).

## 1. Convert to ES6

Babel is a transpiler that will convert ES6+ JavaScript to ES5 that is readable by more browsers. It's already part of the project for React's JSX translation. Config files ending in ".js" are read using Node.js, so as long as the version is high enough, they can be written in ES6 (in other words, I could've used ES6 in my **webpack.config.js** from the start).

### 1.1. Add core-js

Babel uses core-js for polyfills (@babel/polyfill has been deprecated): `yarn add core-js@3`


### 1.2. Configure Babel

Create a [config file](https://babeljs.io/docs/en/config-files) named **babel.config.js** in the root folder of the project. It contains settings for the project (as opposed to **.babelrc**, which is for packages). As a JS file, it allows the use of functions, which means we can make use of arguments to help with setup:

```javascript
module.exports = (api) => {
  const isProd = api.env('production');

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not ie <= 8',                  // Sets browser versions to support
        corejs: { version: 3, shippedProposals: true },   // Enables polyfills
        useBuiltIns: 'usage',                             // Use polyfills when needed
        debug: !isProd
      }
    ],
    '@babel/preset-react'
  ];

  return { presets };
}
```

Delete the old **.babelrc** file: `rm .babelrc` / `git rm .babelrc`

## 1.3. Update Webpack Configuration

Refer to this project's **webpack.config.js** file to see my ES6 setup.

### 1.4. Change the React Component's Code

Replace the `App` function in **app/containers/App/index.js** to ES6-style functional component:

```jsx
const App = () => {
  const greeting = 'HELLO, WORLD';

  return (
    <h1>{greeting}</h1>
  );
}
```

## 2. Add Styling to Components

The styled-components package still seems to be popular, and I already have experience with it.

### 2.1. Installing

`yarn add styled-components`

Including the Babel plugin for debug support, minification, and possible server-side rendering: `yarn add --dev babel-plugin-styled-components`

### 2.2. Setup

The [styled-components docs](https://www.styled-components.com/docs/tooling) say setting up env is required; Babel mentions it could be deprecated soon. For now, replace the `return { presets };` line in **babel.config.js** with the following:

```javascript
  const setPlugins = (settings) => {
    return [
      [
        'babel-plugin-styled-components',
        { ssr: false, fileName: settings.isProd }
      ]
    ]
  };

  const env = {
    development: { presets, plugins: setPlugins({ isProd: false }) },
    production: { presets, plugins: setPlugins({ isProd: true }) },
  };

  return { presets, env, plugins: setPlugins({ isProd }) };
```

### 2.3. Add Styling to React Component

In **app/containers/App/index.js**, add the following under React's import line:

```javascript
import styled from 'styled-components';

const StyledApp = styled.h1`
  color: cyan;
  border: .25rem blue solid;
  background: black;
  text-align: center;
`
```

And replace the h1 element in the JSX code with the new name created by styled-components: `<StyledApp>{greeting}</StyledApp>`

## 3. Running and Building

Don't forget to make sure the project compiles and looks correct!

The dev server can now be run using `yarn start` as well as `npm start`.

The project can be built using `yarn build` or `npm run build`.

##

#### Next Steps for Expanding Setup

##### Next:

* Add store (Redux)

##### Then:

* Add linting
* Add testing
