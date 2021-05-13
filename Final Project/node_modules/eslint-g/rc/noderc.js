const commonrc = require('./commonrc');

const plugins = [
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
];

const rc =
`{
  "env": {
      "browser": false,
      "commonjs": true,
      "es6": true,
      "node": true
  },
  "extends": "airbnb-base",
  "rules": {
    ${commonrc}
    "import/imports-first": 0,
    "import/no-dynamic-require": 0
  }
}
`;

const ignore = '';

module.exports = { rc, plugins, ignore };
