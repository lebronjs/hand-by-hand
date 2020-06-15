/**
 * 官方：new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
 * 说人话：new的作用就是实例化一个类，为这个实例（对象）开辟内存空间
 * 简单一点：js里的就是执行构造函数，返回一个实例对象
 *
 * 面向对象编程
 * JavaScript语言的对象体系，不是基于“类”。
 * 而是基于构造函数（constructor）和原型链（prototype）
 */
function _new(...arguments) {
    // 需要被 new 的构造函数
    const constructor = arguments.shift();
    if (typeof constructor !== "function") {
        return new Error("参数必须是一个函数");
    }
    /** 1、创建新对象（原型链指向构造函数的原型对象） */
    let obj = Object.create(constructor.prototype);

    /** 2、
     * 改变构造函数this指向 - 即将构造函数的作用域赋给新对象
     * 空对象执行构造函数
     * 返回一个对象 或 新增属性、改变属性
     */
    let instance = constructor.apply(obj, arguments);

    /** 3、返回这个新对象（构造函数的实例） */
    return typeof instance == "object" ? instance : obj;
}

function People(name, age) {
    this.name = name || "human";
    this.age = age || 0;
    this.color = "yellow";
    // return null;
}

let one = _new(People);
let two = _new(People, "irving", 27);
console.log(one, two);
