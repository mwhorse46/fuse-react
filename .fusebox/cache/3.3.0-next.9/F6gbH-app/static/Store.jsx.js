module.exports = { contents: "\"use strict\";\nexports.__esModule = true;\nvar tslib_1 = require(\"tslib\");\nvar React = require(\"react\");\nexports.Context = {};\nvar storage;\nif (FuseBox.isBrowser) {\n    storage = window;\n}\nif (FuseBox.isServer) {\n    storage = {};\n}\nstorage.__Subscriptions = [];\nfunction createStore(myClassContext) {\n    exports.Context = new myClassContext();\n    if (typeof exports.Context[\"init\"] === \"function\") {\n        exports.Context[\"init\"]();\n    }\n}\nexports.createStore = createStore;\nfunction getStore() {\n    return exports.Context;\n}\nexports.getStore = getStore;\nfunction getSubscriptions() {\n    return storage.__Subscriptions;\n}\nexports.getSubscriptions = getSubscriptions;\nfunction dispatch(obj, value) {\n    var Subscriptions = storage.__Subscriptions;\n    var store = getStore();\n    var updates = obj;\n    if (typeof obj === \"object\") {\n        for (var key in obj) {\n            if (typeof obj[key] === \"function\") {\n                store[key] = obj[key](store);\n            }\n            else {\n                store[key] = obj[key];\n            }\n        }\n    }\n    if (typeof obj === \"string\" && value) {\n        store[obj] = value(store[obj]);\n        updates = {};\n        updates[obj] = store[obj];\n    }\n    Subscriptions.forEach(function (component) {\n        if (component._hasSubscriptions(updates)) {\n            component._initialize(updates);\n            component.forceUpdate();\n        }\n    });\n}\nexports.dispatch = dispatch;\nfunction connect() {\n    var args = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        args[_i] = arguments[_i];\n    }\n    return function (Target) {\n        if (args.length) {\n            Target[\"$_connected_store_props\"] = args;\n        }\n        return /** @class */ (function (_super) {\n            tslib_1.__extends(class_1, _super);\n            function class_1() {\n                return _super !== null && _super.apply(this, arguments) || this;\n            }\n            class_1.prototype.render = function () {\n                var store = getStore();\n                var storeProps = {};\n                args.forEach(function (key) {\n                    if (store[key] !== undefined) {\n                        storeProps[key] = store[key];\n                    }\n                });\n                return React.createElement(Target, tslib_1.__assign({}, this.props, storeProps));\n            };\n            return class_1;\n        }(React.Component));\n    };\n}\nexports.connect = connect;\n",
dependencies: ["tslib","react"],
sourceMap: {},
headerContent: undefined,
mtime: 1528480718737,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
