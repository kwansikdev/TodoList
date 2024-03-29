module.exports = {
  "parserOptions": {
    "ecmaVersion": 9
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "jquery": true
  },
  "extends": "airbnb-base",
  "plugins": [ "import", "html" ],
  "rules": {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    // "no-var": 1,
    // "vars-on-top": 0,v
    "no-console": "off",
    "quotes": [ "error", "single" ],
    "no-underscore-dangle": "warn",
    'no-plusplus': 'off',
    // "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "prefer-arrow-callback": [ "error", { "allowNamedFunctions": false } ],
    // "func-names": ["error", "off"],
    "comma-dangle": [ "error", "never"],
    "no-console": "off",
    "arrow-parens": ["error", "as-needed"],
    "object-curly-spacing": ["error", "always"],
    "no-nested-ternary": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": "off"
  }
};