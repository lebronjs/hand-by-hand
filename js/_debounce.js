function _debounce(func, delay, immediate) {
    let timeoutId;
    let isFirst = immediate;
    let debounced = function () {
        let context = this;
        let args = arguments;
        //关键就是这个每次都清除定时器
        clearTimeout(timeoutId);
        if (!timeoutId && isFirst) {
            func.apply(context, args);
            isFirst = false;
        } else {
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        }
    };

    debounced.cancel = function () {
        clearTimeout(timeoutId);
        timeoutId = null;
        isFirst = immediate;
    };
    return debounced;
}
