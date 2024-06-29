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

// type JSONValue = string | number | boolean | JSONObject | JSONArray
// interface JSONObject {
//   [key: string]: JSONValue
// }
// interface JSONArray extends Array<JSONValue> {}

// function jsonToTypeScriptType(json: JSONValue, typeName: string = 'Root'): string {
//   if (typeof json === 'string') {
//     return 'string'
//   } else if (typeof json === 'number') {
//     return 'number'
//   } else if (typeof json === 'boolean') {
//     return 'boolean'
//   } else if (Array.isArray(json)) {
//     if (json.length === 0) {
//       return 'any[]'
//     }
//     const arrayType = jsonToTypeScriptType(json[0])
//     return `${arrayType}[]`
//   } else if (typeof json === 'object' && json !== null) {
//     let result = `interface ${typeName} {\n`
//     for (const key in json) {
//       const valueType = jsonToTypeScriptType(json[key], capitalizeFirstLetter(key))
//       result += `  ${key}: ${valueType};\n`
//     }
//     result += '}'
//     return result
//   } else {
//     return 'any'
//   }
// }

// function capitalizeFirstLetter(string: string): string {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }

// // 示例用法
// const jsonData = {
//   name: 'John',
//   age: 30,
//   isStudent: false,
//   courses: ['Math', 'Science'],
//   address: {
//     street: '123 Main St',
//     city: 'Anytown'
//   }
// }

// const typeScriptType = jsonToTypeScriptType(jsonData)
// console.log(typeScriptType)
export default {
  convertDictToArray,
  log,
  jointUrl,
  moveToTop
}
