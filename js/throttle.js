function _throttle(func, interval) {
    let timeoutId;
    let throttled = function () {
        let context = this;
        let args = arguments;

        if (!timeoutId) {
            timeoutId = setTimeout(function () {
                timeoutId = null;
                func.apply(context, args);
            }, interval);
        }
    };

    throttled.cancel = function () {
        clearTimeout(timeoutId);
        timeoutId = null;
    };
    return throttled;
}
