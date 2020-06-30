function _shuffle(original_arr) {
    let arr = original_arr.slice(0);
    /** 从最后一个元素下标开始，向前移动，随机选中一个下标进行元素交换 */
    for (let index = arr.length - 1; index >= 0; index--) {
        const randomIndex = ~~(Math.random() * (index + 1));
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    }
    return arr;
}

console.log(_shuffle([1, 2, 3, 4, 5, 6]));
