const commonrc = require('./commonrc');

const plugins = [
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
];

const rc =
`{
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    ${commonrc}
    "import/imports-first": 0,
    "import/no-dynamic-require": 0,
    "no-restricted-syntax": ["off", "BinaryExpression[operator='in']"]
  }
}
`;

const ignore = '';

module.exports = { rc, plugins, ignore };
