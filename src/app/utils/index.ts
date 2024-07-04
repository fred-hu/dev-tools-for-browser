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

export function jsonToTsTypes(json: any, rootTypeName: string = 'Root', parentTypeName: string = ''): string {
  const typeMap: { [key: string]: string } = {};
  let anonymousTypeIndex = 0; // 用于生成匿名类型的索引
  let levelIndexMap: { [key: string]: number } = {}; // 记录每个类型名称出现的次数

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getType(obj: any, name: string, parentTypeName: string, isRoot: boolean = false): string {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return 'any[]';
        }
        const elementType = getType(obj[0], name, parentTypeName);
        return `${elementType}[]`;
      } else {
        let typeName = isRoot ? rootTypeName : `${capitalizeFirstLetter(name)}`;
        let fullTypeName = parentTypeName ? `${parentTypeName}${typeName}` : typeName;
        // 对于同名类型，通过增加索引来区分
        if (levelIndexMap[fullTypeName] !== undefined) {
          levelIndexMap[fullTypeName] += 1;
          fullTypeName += levelIndexMap[fullTypeName];
        } else {
          levelIndexMap[fullTypeName] = 1;
        }
        if (typeMap[fullTypeName]) {
          // 如果名称已存在，则创建一个匿名类型
          fullTypeName += `_${++anonymousTypeIndex}`; 
        }
        typeMap[fullTypeName] = ''; // 占位，防止循环引用
        const properties = Object.keys(obj).map(key => {
          return `  ${key}: ${getType(obj[key], key, fullTypeName)}`;
        }).join(';\n');
        typeMap[fullTypeName] = `{\n${properties}\n}`;
        return fullTypeName;
      }
    } else {
      return typeof obj;
    }
  }

  // 传入 true 标记这是根对象
  const rootType = getType(json, rootTypeName, '', true);
  let allTypes = '';
  Object.keys(typeMap).forEach(key => {
    allTypes += `type ${key} = ${typeMap[key]};\n\n`;
  });

  return allTypes.trim();
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