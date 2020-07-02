/** Promise 必须处于以下三个状态之一 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECT = 'reject';
class MyPromise {
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new TypeError(
                `Promise resolver ${executor} is not a function`
            );
        }
        this.state = PENDING;
        this.value = null;
        this.onFulfilledCallBack = null;
        this.onRejectedCallBack = null;
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(result) {
        if (this.state === PENDING) {
            this.state = FULFILLED;
            this.value = result;
            this.onFulfilledCallBack && this.onFulfilledCallBack(this.value);
        }
    }
    reject(reason) {
        if (this.state === PENDING) {
            this.state = REJECT;
            this.value = reason;
            this.onRejectedCallBack && this.onRejectedCallBack(this.value);
        }
    }
    then(onFulfilled, onRejected) {
        /** then 方法可以被同一个 promise 调用多次 */
        let promise2 = new MyPromise((resolve, reject) => {
            /** onFulfilled 和 onRejected 都是可选参数, 但必须是函数类型 */
            if (typeof onFulfilled !== 'function') {
                onFulfilled = function (data) {
                    return data;
                };
            }
            if (typeof onRejected !== 'function') {
                onRejected = function (reason) {
                    return reason;
                };
            }
            switch (this.state) {
                case FULFILLED:
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolve(x);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    break;
                case REJECT:
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.value);
                            reject(x);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    break;
                case PENDING:
                    this.onFulfilledCallBack = () => {
                        setTimeout(() => {
                            try {
                                const x = onFulfilled(this.value);
                                resolve(x);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    };
                    this.onRejectedCallBack = () => {
                        setTimeout(() => {
                            try {
                                const x = onRejected(this.value);
                                reject(x);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    };
                    break;
                default:
                    break;
            }
        });
        return promise2;
    }
}

/** 仿 */
new MyPromise((resolve, reject) => {
    //throw new Error('cuole 404');
    console.log('start');
    console.log(1);
    setTimeout(() => {
        resolve(3);
    }, 1000);
    //resolve(3);
})
    .then(
        (d) => {
            //throw new Error('cuole 404');
            console.log('value', d);
            return 'then';
        },
        (e) => {
            console.log('reason:', e);
        }
    )
    .then(
        (d) => console.log('value', d),
        (e) => {
            console.log('reason:上面一级报错：', e);
        }
    )
    .then((d) => console.log(d));
console.log(2);

/** 真 */
// new Promise((resolve, reject) => {
//     console.log('start');
//     setTimeout(() => {
//         resolve(1);
//     });
// })
//     .then()
//     .then((d) => {
//         console.log('真value', d);
//     });

// console.log('==========');
