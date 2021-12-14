/**
 * 处理目标对象，返回ClassName
 * @param value 目标对象
 * @constructor
 * example：(参数) => (返回值)
 *      （'name', 'age'） => ('name age')
 *       ({name: false, age: true, age: true}, 'color') => ('age color')
 *       ({name: () => false, age: true, age: true}) => ('age')
 *       (() => 'name') => ('name')
 *       (() => {name: true, age: true}, 'color') => ('name age color')
 */
export function CN(...args) {
    let resultStr = args.reduce((pre, cur) => {
        return addClassName(cur, pre);
    }, '');

    return resultStr.trim();
}

/**
 * 将目标对象与init合并为ClassName串
 * @param value 目标对象
 * @param init  之前的ClassName值
 */
function addClassName(value: unknown, init: string = '') {
    /*
    * 初始化为一个空格，方便后序去重工作
    * */
    let resultStr: string = ' ' + init;           // 存储类的结果

    // 参数为普通对象的操作
    if (exactTypeof(value, 'object')) {
        for (const [key, val] of Object.entries(value)) {
            let isUse: boolean;

            if (typeof val === 'boolean') {
                isUse = val
            }

            if (typeof val === 'function') {
                const rt = addClassName(val);
                isUse = (typeof rt === 'boolean') ? rt : false;
            }

            // 对className进行去重
            if(isUse && !~resultStr.indexOf(' ' + key + ' ')) {
                resultStr += key + ' ';
            }
        }
        return resultStr;
    }

    // 参数为方法的操作
    if (typeof value === 'function') {
        const rt = value.call(this);

        if (typeof rt === 'function' || exactTypeof(rt, 'object') || typeof rt === 'string') {
            return addClassName(rt, resultStr);
        }

        return rt;
    }

    // 参数为字符串的操作
    if (typeof value === 'string') {
        let classNames = value.split(' ');

        for(let i = 0, len = classNames.length; i < len; i++) {
            if (!~resultStr.indexOf(' ' + classNames[i] + ' ')) {
                resultStr += classNames[i] + ' ';
            }
        }

        return resultStr;
    }
}

/**
 * function: 判断目标对象是否为期望类型
 * @param value 目标对象
 * @param target 期望类型
 */
export function exactTypeof(value: unknown, target: string) {
    let type: string = Object.prototype.toString.call(value);
    type = type.slice(8, -1);

    if (type.toLowerCase() === target.toLowerCase()) {
        return true;
    }

    return false;
}