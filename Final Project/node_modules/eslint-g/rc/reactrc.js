const commonrc = require('./commonrc');

const plugins = [
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
  'eslint-import-resolver-webpack',
  'eslint-plugin-react',
];

const rc =
`{
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "amd": true,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    }
  },
  "extends": "airbnb-base",
  "rules": {
    ${commonrc}
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1
  }
}
`;

const ignore =
`build/*.js
config/*.js
public/*.js
scripts/*.js
`;

module.exports = { rc, plugins, ignore };
