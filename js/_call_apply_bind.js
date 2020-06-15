/**
 * call() 使用一个指定this值来调用一个函数，并提供一个或多个参数来作为参数。
 * apply() 使用一个指定this值来调用一个函数，并提供一个数组（或类似数组对象）作为参数。
 *
 * bind() 创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 */

Function.prototype._call = function () {
    let context = arguments[0] || window;
    let args = [];
    /** 1、将函数设为对象的属性
     *  这里是this的隐式绑定
     *  函数直接调用call和apply是显式绑定
     */
    context.fn = this;
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    console.log(args);
    /** 2、执行函数 */
    // 切记这里不能用 args.join(",")，返回的是字符串，会被当做一个参数
    // 在eval中，args 自动调用 args.toString()方法
    let result = eval('context.fn(' + args + ')');
    /**3、删除函数 */
    delete context.fn;
    return result;
};

Function.prototype._apply = function (context, args) {
    var result;
    context = context || window;
    context.fn = this;
    /** 2、执行函数 */
    if (!args) {
        result = context.fn();
    } else {
        var argsArr = [];
        for (var i = 0, len = args.length; i < len; i++) {
            argsArr.push('args[' + i + ']');
        }
        result = eval('context.fn(' + argsArr + ')');
    }
    /**3、删除函数 */
    delete context.fn;
    return result;
};

/**
 * 1、bind返回一个函数
 * 2、bind是返回一个函数，所以可以传两次参数
 * 3、当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
 */
Function.prototype._bind = function (context) {
    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);
    var bindFunc = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    };
    // 不要用 es6的一些方法
    // var obj = Object.create(self.prototype)
    var protoFun = new Function();
    protoFun.prototype = self.prototype;
    bindFunc.prototype = new protoFun();
    return bindFunc;
};

function say(slogan, age) {
    console.log(slogan, age);
    console.log(this.name, this.height);
}
//say(["wtf", 10]);
say._call({ name: 'Allen', height: 183 }, 'wtf', 10);
let bindFunc = say._bind({ name: 'Allen', height: 183 }, 'wtf-bind');
let testNewBind = new bindFunc('new successful');
bindFunc(666);
