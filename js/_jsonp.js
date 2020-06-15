function _jsonp(url, params) {
    var head = document.getElementsByTagName('head')[0];
    var scriptTag = document.createElement('script');
    var queryStr = Object.keys(params)
        .map((key) => {
            return `${key}=${params[key]}`;
        })
        .join('&');

    scriptTag.src = url + (url.indexOf('?') > 0 ? queryStr : '?' + queryStr);
    head.append(scriptTag);
}

function jsonpTest(data) {
    console.log(data);
}
_jsonp(`http://127.0.0.1:5000/jsonp`, {
    callback: 'jsonpTest',
    name: 'lebronjs',
});
