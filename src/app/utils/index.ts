export const log = (data) => chrome.devtools.inspectedWindow.eval(`console.log('${JSON.stringify(data)}')`)

export function convertDictToArray(
  dict: {
    [key: string]: string
  },
  config: string[] = ['value', 'label']
): { [key: string]: string }[] {
  const [keyName = 'value', valueName = 'label'] = config
  return Object.entries(dict).map(([key, value]) => ({
    [keyName]: key,
    [valueName]: value
  }))
}
export function jointUrl(url) {
  try {
    // 尝试创建一个URL对象
    const parsedUrl = new URL(url)

    // 检查协议是否为http或https
    if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      return url // 返回原URL，因为它是一个有效的HTTP(S)地址
    } else {
      throw new Error('Invalid protocol') // 抛出错误，处理非HTTP(S)协议
    }
  } catch (error) {
    // 如果URL构造失败或协议不正确，则返回修正后的URL
    return location.origin + url
  }
}
export function moveToTop(arr, index) {
  if (index >= 0 && index < arr.length) {
    // 从指定索引位置移除元素
    const [item] = arr.splice(index, 1)
    // 将该元素插入到数组的开头
    arr.unshift(item)
  }
}

export function encryptDecrypt(input: string, key: string) {
  // 将输入字符串转换为字符码数组
  const inputChars = Array.from(input).map((char) => char.charCodeAt(0))

  // 生成密钥的字符码数组
  const keyChars = Array.from(key).map((char) => char.charCodeAt(0))

  // 执行异或加密或解密
  const output = inputChars.map((char, index) => {
    return String.fromCharCode(char ^ keyChars[index % keyChars.length])
  })

  // 将字符数组转换回字符串
  return output.join('')
}

export function jsonToTsTypes(json: any, rootTypeName: string = 'RootType'): string {
  const typeMap: { [key: string]: string } = {};

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getType(obj: any, name: string): string {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return 'any[]';
        }
        const singularName = name;
        const elementType = getType(obj[0], singularName);
        return `${elementType}[]`;
      } else {
        const typeName = `${capitalizeFirstLetter(name)}Type`;
        if (typeMap[typeName]) {
          return typeName; // 如果已处理过相同名称的类型，则直接返回类型名称
        }
        typeMap[typeName] = ''; // 占位，防止循环引用
        const properties = Object.keys(obj).map(key => {
          const propName = capitalizeFirstLetter(key);
          return `  ${key}: ${getType(obj[key], propName)}`;
        }).join(';\n');
        typeMap[typeName] = `{\n${properties}\n}`;
        return typeName;
      }
    } else {
      return typeof obj;
    }
  }

  const rootType = getType(json, rootTypeName);
  let allTypes = '';
  Object.keys(typeMap).forEach(key => {
    allTypes += `type ${key} = ${typeMap[key]};\n\n`;
  });

  return `${allTypes}type ${rootTypeName} = ${rootType};`;
}

/**
 * 复制文本
 * @param {string} str 待复制的文本
 * @returns {string | Promise<void>}
 */
export const copyText = async str => {
  const copyFn = () => {
    const elm = document.createElement('textarea');
    elm.value = str;
    elm.setAttribute('readonly', '');
    elm.style.position = 'absolute';
    elm.style.left = '-9999px';
    document.body.appendChild(elm);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    elm.select();
    document.execCommand('copy');
    document.body.removeChild(elm);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };
  if (navigator.clipboard) {
    const text = str;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      copyFn();
    }
  } else {
    copyFn();
  }
};

export default {
  copyText,
  jsonToTsTypes,
  convertDictToArray,
  log,
  jointUrl,
  moveToTop
}