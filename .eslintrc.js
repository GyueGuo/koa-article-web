module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        'prefer-const': [
            "error",
        ],
        "key-spacing": ["error", {
            "beforeColon": false,
            "afterColon": true
        }],
        "no-empty": [
            "error"
        ],
        "no-empty-function": [
            "error"
        ],
        "no-dupe-args": [
            "error"
        ],
        "no-extra-parens": [
            "error"
        ],
        "no-unused-vars": [
            "error"
        ],
        "no-constant-condition": [
            "error"
        ],
        "no-dupe-keys": [
            "error"
        ],
        "no-duplicate-case": [
            "error"
        ],
        "no-param-reassign": [
            "error"
        ],
        "no-extra-boolean-cast": [
            "error",
        ],
        "no-extra-parens": [
            "error",
        ],
        "no-redeclare": [
            "error",
        ],
        "no-func-assign": [
            "error",
        ],
        "no-inner-declarations": [
            "error",
        ],
        "no-invalid-regexp": [
            "error",
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-irregular-whitespace": [
            "error",
        ],
        "no-obj-calls": [
            "error",
        ],
        "no-unreachable": [
            "error",
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-extra-semi": [
            "error",
        ],
        "handle-callback-err": [
            "error",
        ],
        "no-shadow": [
            "error"
        ]
    }
};