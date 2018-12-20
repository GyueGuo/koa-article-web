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
        "indent": [ // 缩进2个空格
            "error",
            2
        ],
        "array-callback-return": [ // 强制数组方法的回调函数中有 return 语句
            "error"
        ],
        "block-scoped-var": [ // 强制把变量的使用限制在其定义的作用域范围内
            "error"
        ],
        "class-methods-use-this": [ // 强制类方法使用 this
            "error"
        ],
        "curly": [ // 强制所有控制语句使用一致的括号风格
            "error"
        ],
        "default-case": [ // 要求 switch 语句中有 default 分支
            "error"
        ],
        "dot-notation": [ // 强制尽可能地使用点号
            "error"
        ],
        "eqeqeq": [ // 要求使用 === 和 !==
            "error"
        ],
        "no-caller": [ // 禁用 arguments.caller 或 arguments.callee
            "error"
        ],
        'prefer-const': [ // 使用 const 声明那些声明后不再被修改的变量
            "error",
        ],
        "no-case-declarations": [ // 不允许在 case 子句中使用词法声明
            "error"
        ],
        "no-else-return": [ // 禁止 if 语句中 return 语句之后有 else 块
            "error"
        ],
        "no-extra-bind":  [ // 禁止不必要的 .bind() 调用
            "error"
        ],
        "no-fallthrough":  [ // 禁止 case 语句落空
            "error"
        ],
        "no-floating-decimal": [ // 禁止 .1 和 1.
            "error"
        ],
        "no-empty-pattern": [ // 禁止 正则表达式出现空[]
            "error"
        ],
        "no-invalid-this": [ // 禁用不必要的嵌套块
            "error"
        ],
        "no-loop-func": [ // 禁止在循环中出现 function 声明和表达式
            "error"
        ],
        "no-multi-spaces": [ // 禁止出现多个空格
            "error"
        ],
        "no-multi-str": [ // 禁止通过 \ 创建多行字符串
            "error"
        ],
        "no-new-func": [ // 禁止对 Function 对象使用 new 操作符
            "error"
        ],
        "no-new-wrappers": [ // 禁止对 String，Number 和 Boolean 使用 new 操作符
            "error"
        ],
        "no-return-assign": [ // 禁止在 return 语句中使用赋值语句
            "error"
        ],
        "no-self-assign": [ // 禁止赋值给自身
            "error"
        ],
        "no-return-await": [ // 禁用不必要的 return await， 在 async function， return await 是没有用的 。async function 的返回值总是包裹在 Promise.resolve，在 Promise resolve 或 reject 之前
            "error"
        ],
        "no-self-compare": [ // 禁止自身比较
            "error"
        ],
        "no-sequences": [ // 不允许使用逗号操作符
            "error"
        ],
        "no-throw-literal": [ // 抛出异常必须是error对象  throw Error();
            "error"
        ],
        "no-unmodified-loop-condition": [ // 禁用一成不变的循环条件
            "error"
        ],
        "no-unused-expressions": [ // 禁止出现未使用过的表达式
            "error"
        ],
        "no-useless-concat": [ // 禁止不必要的字符串字面量或模板字面量的连接
            "error"
        ],
        "no-useless-return": [ // 禁止多余的 return 语句
            "error"
        ],
        "no-unused-labels": [ // 禁止多余的 return 语句
            "error"
        ],
        "no-useless-escape": [ // 禁用不必要的转义 
            "error"
        ],
        "require-await": [ // 禁止使用不带 await 表达式的 async 函数
            "error"
        ],
        "wrap-iife": [ // 禁止使用不带 await 表达式的 async 函数
            "error", "inside", { "functionPrototypeMethods": true }
        ],
        "block-spacing": [ // 强制在代码块中开括号前和闭括号后有空格
            "error",
        ],
        "keyword-spacing": [ // 关键之前后空格
            "error", {
                "after": true,
                "before": true
            }
        ],
        "comma-spacing": [ // 强制在逗号后使用空格
            "error",
            { "before": false, "after": true }
        ],
        "comma-dangle": ["error", {
            "arrays": "never",
            "objects": "always",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }],
        "lines-between-class-members": [ // 要求或禁止类成员之间出现空行
            "error",
        ],
        "newline-per-chained-call": [ // 要求方法链中每个调用都有一个换行符
            "error"
        ],
        "no-lonely-if": [ // 禁止 if 作为唯一的语句出现在 else 语句中
            "error"
        ],
        "no-multi-assign": [ // 禁止连续赋值
            "error"
        ],
        "no-multiple-empty-lines": [ // 禁用多行空行
            "error"
        ],
        "no-plusplus": [ // 禁用一元操作符 ++ 和 --
            "error"
        ],
        "no-new-object": [ // 禁用 Object 的构造函数
            "error"
        ],
        "no-trailing-spaces": [ // 禁用行尾空格
            "error"
        ],
        "no-unneeded-ternary": [ // 禁止可以在有更简单的可替代的表达式时使用三元操作符
            "error"
        ],
        "one-var": [ // 要求每个函数有多个 var let const声明
            "error", {
                "var": "never",
                "let": "never",
                "const": "never",
                "separateRequires": true, // require
            }
        ],
        "key-spacing": [ // 对象字面量的属性中键和值之间的逗号后使用空格
            "error", {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "operator-assignment": [ // 要求或禁止在可能的情况下使用简化的赋值操作符
            "error"
        ],
        "quote-props": [ // 禁止出现空语句块
            "as-needed"
        ],
        "no-empty": [ // 禁止出现空语句块
            "error"
        ],
        "space-infix-ops": [ // 禁止出现空语句块
            "error"
        ],
        "no-duplicate-imports": [ // 禁止重复模块导入
            "error"
        ],
        "no-class-assign": [ // 禁止修改类声明的变量
            "error"
        ],
        "no-const-assign": [ // 禁止修改const 声明的变量
            "error"
        ],
        "no-empty-function": [ // 禁止出现空function
            "error"
        ],
        "no-dupe-args": [ // 禁止 function 定义中出现重名参数
            "error"
        ],
        "no-extra-parens": [ // 禁止不必要的括号
            "error"
        ],
        "no-unused-vars": [ // 禁止出现未使用过的变量
            "error"
        ],
        "no-dupe-class-members": [ // 禁止类成员中出现重复的名称
            "error"
        ],
        "no-this-before-super": [ // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
            "error"
        ],
        "no-useless-computed-key": [ // 禁止在对象中使用不必要的计算属性
            "error"
        ],
        "no-useless-constructor" : [ // 禁用不必要的构造函数
            "error"
        ],
        "no-constant-condition": [ // 禁止在条件中使用常量表达式
            "error"
        ],
        "no-dupe-keys": [// 禁止出现重复的 key
            "error"
        ],
        "no-duplicate-case": [ // 禁止出现重复的 case 标签
            "error"
        ],
        "no-param-reassign": [ // 禁止对 function 的参数进行重新赋值
            "error"
        ],
        "no-extra-boolean-cast": [ // 禁止不必要的布尔转换
            "error",
        ],
        "no-extra-parens": [ // 禁止不必要的括号
            "error",
        ],
        "no-redeclare": [ // 禁止多次声明同一变量
            "error",
        ],
        "object-shorthand": [ // 要求对象字面量简写语法
            "error"
        ],
        "prefer-destructuring": [ // 优先使用数组和对象解构
            "error"
        ],
        "no-func-assign": [ // 禁止对 function 声明重新赋值
            "error",
        ],
        "no-inner-declarations": [ // 禁止在嵌套的块中出现变量声明或 function 声明
            "error",
        ],
        "no-invalid-regexp": [ // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
            "error",
        ],
        "linebreak-style": [ // 强制使用unix换行风格
            "error",
            "unix"
        ],
        "new-cap": [ // 构造函数首字母大写
            "error",
        ],
        "no-irregular-whitespace": [ // 禁止在字符串和注释之外不规则的空白
            "error",
        ],
        "no-obj-calls": [ // 禁止把全局对象作为函数调用
            "error",
        ],
        "no-unreachable": [ // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
            "error",
        ],
        "quotes": [ // 强制单引号
            "error",
            "single"
        ],
        "semi": [ // 要求或禁止使用分号代替 ASI
            "error",
            "always"
        ],
        "no-extra-semi": [ // 禁止不必要的分号
            "error",
        ],
        "handle-callback-err": [ // 要求回调函数中有容错处理
            "error",
        ],
        "no-shadow-restricted-names": [ // 禁止将标识符定义为受限的名字
            "error",
        ],
        "no-shadow": [ // 禁止变量声明与外层作用域的变量同名
            "error"
        ],
        "no-use-before-define": [ // 禁止在变量定义之前使用它们
            "error"
        ]
    }
};