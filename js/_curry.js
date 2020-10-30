/**
 * 
 */
function uri(protocal) {
    return function(hostname, pathname){
        return `${protocal}${hostname}${pathname}`
    }
}

const uri_https = uri("https://")
const uri1 = uri_https("www.lebronjs.cn","/")
console.log(uri1);


/**
 * 
 */
const name_lists1 = [
    {mid:"王昭君", profession:"中单"},
    {mid:"妲己", profession:"中单"},
    {mid:"安琪拉", profession:"中单"},
]
const name_lists2 = [
    {juggle:"赵云", profession:"打野"},
    {juggle:"李白", profession:"打野"},
    {juggle:"韩信", profession:"打野"},
]
function curring(name){
    return item => item[name]
}
const name_mid = curring("mid")
const name_juggle = curring("juggle")
console.log(name_lists1.map(name_mid))
console.log(name_lists2.map(name_juggle))

/**
 * 实现 add(1)(2)(3) = 6、add(1,2,3)(4) = 10、add(1)(2)(3)(4)(5) = 15
 */

function add() {
    let args = [...arguments]
    let inner = function(){
        args.push(...arguments)
        return inner
    }
    inner.toString = function(){
        return args.reduce((prev, cur)=> prev + cur)
    }
    return inner
}
// 需要在浏览器中测试
console.log(add(1)(2)(3))
console.log(add(1)(2)(3)(4,5))