function deepClone(target, hash = new WeakMap()) {
	// const type = Object.prototype.toString.apply(target).slice(8,-1)
	if (target === null || typeof target !== 'object') return target;
	let newObj = null;
	if (hash.has(target)) {
		return hash.get(target);
	}
	const type = target.constructor.toString().slice(9, -20);
	switch (type) {
		case 'Array':
		case 'Object':
			const keys = Object.keys(target);
			newObj = type === 'Array' ? [] : {};
			// 弱引用解决循环引用闭环
			hash.set(target, target);
			keys.forEach(key => {
				const value = target[key];
				typeof value === 'object' ? (newObj[key] = deepClone(value, hash)) : (newObj[key] = value);
			});
			break;
		case 'Map':
			newObj = new Map([...target]);
			break;
		case 'Set':
			newObj = new Set([...target]);
			break;
		case 'Date':
			newObj = new Date(target.valueOf());
			break;
		case 'RegExp':
			newObj = new RegExp(target.valueOf());
			break;
		default:
			break;
	}

	return newObj;
}

function newDeepClone(obj, hash = new WeakMap()) {
	if (hash.has(obj)) {
		return obj;
	}
	let res = null;
	const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];
	if (reference.includes(obj?.constructor)) {
		res = new obj.constructor(obj);
	} else if (Array.isArray(obj)) {
		obj.forEach((e, i) => {
			res[i] = newDeepClone(e);
		});
	} else if (typeof obj === 'object' && obj !== null) {
		res = {};
		for (const key in obj) {
			if (Object.hasOwnProperty.call(obj, key)) {
				res[key] = deepClone(obj[key]);
			}
		}
		hash.set(obj, res);
	} else {
		res = obj;
	}
	return res;
}

// test
let testValue = [1, 2, 3, [24, 24], { a: 1, b: 1 }, null, new Map()];
let result = deepClone(testValue);
testValue[0] = 'change';
testValue[4]['a'] = 0;
console.log(testValue);
console.log(result);

console.log('==============================');

// 测试数据项
let data = {
	age: 18,
	name: 'Allen',
	education: ['小学', '初中', '高中', '大学', undefined, null],
	likesFood: new Set(['fish', 'banana']),
	friends: [
		{ name: 'summer', sex: 'woman' },
		{ name: 'daWen', sex: 'woman' },
		{ name: 'yang', sex: 'man' },
	],
	work: {
		time: '2019',
		project: { name: 'test', obtain: ['css', 'html', 'js'] },
	},
	play: function () {
		console.log('玩滑板');
	},
};
let result2 = deepClone(data);
result2.play();
data.play = 123;
console.log(data, result2);

console.log('==============================');

// 闭环问题
let obj = {
	name: 'foo',
	child: null,
};
obj.child = obj;

console.log(deepClone(obj));
