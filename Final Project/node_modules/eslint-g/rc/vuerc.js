const commonrc = require('./commonrc');

const plugins = [
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-friendly-formatter',
  'eslint-import-resolver-webpack',
  'eslint-loader',
  'eslint-plugin-html',
  'eslint-plugin-import',
];

const rc =
`{
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "env": {
    "browser": true
  },
  "extends": "airbnb-base",
  "plugins": [
    "html"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.conf.js"
      }
    }
  },
  "rules": {
    ${commonrc}
    "import/extensions": ["error", "always", {
      "js": "never",
      "vue": "never"
    }],
    "import/no-extraneous-dependencies": ["error", {
      "optionalDependencies": ["test/unit/index.js"]
    }]
  }
}
`;

const ignore =
`build/*.js
config/*.js
`;

module.exports = { rc, plugins, ignore };
