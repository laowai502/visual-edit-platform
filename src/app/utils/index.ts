/**
 * 返回数据类型的字符串
 * @param obj 入参
 * @returns string
 */
const checkType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * 去除对象中的null, undefined, '', 顺便deepCopy了
 * @params obj 入参
 */
export const removeObjectEmptyValue = (obj: any): object => {
    const params = {};
    if (obj === null || obj === undefined || obj === '') {
        return params;
    }
    for (const key in obj) {
        if (checkType(obj[key]) === 'Object') {
            params[key] = removeObjectEmptyValue(obj[key]);
        } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            params[key] = obj[key];
        }
    }
    return params;
};

/**
 * 去除Object对象中的null, undefined, 但不包括Array
 * @params obj 入参
 */
export const removeObjectEmpty = (obj: any): object => {
    const params = {};
    if (obj === null || obj === undefined || obj === '') {
        return params;
    }
    if (checkType(obj) === 'Array') {
        return obj;
    }
    for (const key in obj) {
        if (checkType(obj[key]) === 'Object') {
            params[key] = removeObjectEmpty(obj[key]);
        } else if (obj[key] !== null && obj[key] !== undefined) {
            params[key] = obj[key];
        }
    }
    return params;
};

// Determine whether the event element is within the target element
export const isInTarget = (eventDom: any, targetDom: HTMLElement): boolean => {
	return targetDom.contains(eventDom);
};

// Generatre Guid: string
export const guid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		// tslint:disable-next-line:no-bitwise
		const r = Math.random() * 16 | 0;
		// tslint:disable-next-line:no-bitwise
		const v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

// whether the mouse inner of the current dom element
export const mouseLocInDom = (ev, dom: HTMLElement): boolean => {
	const { top: t, left: l, width: w, height: h } = dom.getBoundingClientRect();
	const { clientX: x, clientY: y } = ev;
	if (!(y > t && y < h + t)) {
		return false;
	}
	return true;
};

/**
 * get dom in page x
 * @param dom curdom
 * @returns the number of the dom in page x location
 */
export const getDomPageX = (dom): number => {
	let offset = dom.offsetLeft;
	if (dom.offsetParent !== null) {
		offset += getDomPageX(dom.offsetParent);
	}
	return offset;
};

/**
 * get dom in page y
 * @param dom curdom
 * @returns the number of the dom in page y location
 */
export const getDomPageY = (dom): number => {
	let offset = dom.offsetTop;
	if (dom.offsetParent !== null) {
		offset += getDomPageY(dom.offsetParent);
	}
	return offset;
};

export const errFileType = (fileName: string, regexp: string): boolean => {
	if (fileName.lastIndexOf(".") != -1) {
		const fileType = (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)).toLowerCase();
		return !regexp.includes(fileType);
	} else {
		return false;
	}
}
