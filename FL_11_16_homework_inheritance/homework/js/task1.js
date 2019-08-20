function assign(target, ...sources) {
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    } 
    sources.forEach((srcObj) => {
        if (srcObj !== null && srcObj !== undefined) {
            for (let srcKey in srcObj) {
                if (Object.prototype.hasOwnProperty.call(srcObj, srcKey)) { 
                    target[srcKey] = srcObj[srcKey];
                } 
            }
        }
    })
    return target;
}

const defaults = { a: 123, b: 777 };
const options = { a: 456 };
const configs = assign({}, defaults, options);
console.log(configs);