function _ajax(options) {
    options = options || {};
    var method = options.method || 'GET',
        params = options.params,
        data = options.data,
        url =
            options.url +
            (params
                ? '?' +
                  Object.keys(params)
                      .map(
                          (key) =>
                              encodeURIComponent(key) +
                              '=' +
                              encodeURIComponent(params[key])
                      )
                      .join('&')
                : ''),
        async = options.async === false ? false : true,
        headers = options.headers,
        withCredentials = options.withCredentials,
        success = options.success,
        fail = options.fail;

    /**
     * 1、初始化一个请求
     * XMLHttpRequest（XHR）对象用于与服务器交互。
     * 通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据
     */
    var request = new XMLHttpRequest();
    request.open(method, url, async);
    /**
     * 设置请求头
     * setRequestHeader 必须在 open 和 send 之间调用
     */
    headers &&
        Object.keys(headers).forEach((key) =>
            request.setRequestHeader(key, headers[key])
        );

    /**
     * 要跨域携带cookie时，要把withCredentials设置为true
     */
    request.withCredentials = withCredentials || false;
    /**
     * 2、发送请求
     */
    method === 'GET' ? request.send() : request.send(data);
    /**
     * 3、readyState:
          0: 请求未初始化
          1: 服务器连接已建立
          2: 请求已接收
          3: 请求处理中
          4: 请求已完成，且响应已就绪
    
     *   status: HTTP 状态码
     */
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                success && success(request.responseText);
            } else {
                fail && fail(request.status);
            }
        }
    };
}

_ajax({
    url: `https://rap2.taobao.org:38080/app/mock/229571/example/1566982479149`,
    params: {
        foo: 'abc',
        bar: 123,
    },
    success: function (res) {
        console.log(res);
    },
    fail: function (s) {
        console.log(s);
    },
});
