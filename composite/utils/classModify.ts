/**
 * 处理参数返回ClassName
 *
 * @param value 目标对象
 *
 * examples: (参数) => (返回值)
 *      ('name') => ('name')
 *      ({name: true, age: false, name: true}) => ('name')
 *      (() => 'name') => ('name')
 *      ({name: true, age: () => false}) => ('name')
 */
export function CN(value: unknown) {
    /*
    * 初始化为一个空格，方便后序去重工作
    * */
    let classNames: string = ' ';           // 存储类的结果


    // 参数为普通对象的操作
    if (exactTypeof(value, 'object')) {
        for (const [key, val] of Object.entries(value)) {
            let isUse: boolean;

            if (typeof val === 'boolean') {
                isUse = val
            }

            if (typeof val === 'function') {
                const rt = CN(val);
                isUse = (typeof rt === 'boolean') ? rt : false;
            }

            // 对className进行去重
            if(isUse && !~classNames.indexOf(' ' + key + ' ')) {
                classNames += key + ' ';
            }
        }
        return classNames.trim();
    }

    // 参数为方法的操作
    if (typeof value === 'function') {
        return value.call(this);
    }

    // 参数为字符串的操作
    if (typeof value === 'string') {
        return value;
    }
}

/**
 * 判断目标对象是否为期望类型
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