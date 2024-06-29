/* eslint-disable no-unused-vars */
import { convertDictToArray } from '~app/utils'

import { HTTP_STATUS_CODE, HTTP_STATUS_CODE_DICT } from './httpStatus'

export const MESSAGE_TYPES = {
  MATCHING_UPDATE: 'matchingUpdate',
  SET_LOADING: 'setLoading',
  SET_RECORD: 'setRecord',
}

export enum OPERATE_TYPE {
  EDIT = 'edit',
  DELETE = 'delete',
  UPDATE_RECORD = 'updateRecord',
  TOP = 'top',
  CLONE = 'clone'
}
export enum REQUEST_TYPE {
  ALL = '*',
  GET = 'get',
  POST = 'post', // 向服务器提交数据。
  PUT = 'put', // 向服务器上传更新数据。
  DELETE = 'delete', // 请求服务器删除指定的资源。
  HEAD = 'head', // 类似于 GET 请求，但只返回首部，不返回实际内容。
  OPTIONS = 'options', // 用于描述对目标资源的通信选项。
  PATCH = 'patch', // 用于对资源进行局部修改，即对资源的部分内容进行更新或修改
  TRACE = 'trace' // 回显服务器收到的请求，主要用于测试或诊断。
}
export const REQUEST_TYPE_DICT = {
  [REQUEST_TYPE.ALL]: '不限',
  [REQUEST_TYPE.GET]: 'GET',
  [REQUEST_TYPE.POST]: 'POST',
  [REQUEST_TYPE.PUT]: 'PUT',
  [REQUEST_TYPE.DELETE]: 'DELETE',
  [REQUEST_TYPE.HEAD]: 'HEAD',
  [REQUEST_TYPE.OPTIONS]: 'OPTIONS',
  [REQUEST_TYPE.PATCH]: 'PATCH',
  [REQUEST_TYPE.TRACE]: 'TRACE'
}
export const REQUEST_TYPE_OPTIONS = convertDictToArray(REQUEST_TYPE_DICT)

export enum PROXY_ROUTE_KEY {
  ID = 'id',
  MOCK_TYPE = 'mockType',
  ENABLE = 'enable',
  MATCH_TYPE = 'matchType',
  REQUEST_TYPE = 'requestType',
  RESPONSE_STATUS = 'responseStatus',
  REDIRECT_URL = 'redirectUrl',
  DELAY = 'delay',
  URL = 'url',
  GROUP = 'group',
  NAME = 'name',
  RESPONSE = 'response',
  MOCK_REQUEST_HEADERS = 'mockRequestHeaders',
  ENABLE_MOCK_REQUEST_HEADERS = 'enableMockRequestHeaders',
  REQUEST_HEADERS = 'requestHeaders',
  MOCK_RESPONSE_HEADERS = 'mockResponseHeaders',
  ENABLE_MOCK_RESPONSE_HEADERS = 'enableMockResponseHeaders',
  RESPONSE_HEADERS = 'responseHeaders'
}
export type PROXY_ROUTE_ITEM = {
  [PROXY_ROUTE_KEY.ID]: string
  [PROXY_ROUTE_KEY.MOCK_TYPE]: MOCK_TYPE
  [PROXY_ROUTE_KEY.ENABLE]: boolean
  [PROXY_ROUTE_KEY.MATCH_TYPE]: MATCH_TYPE
  [PROXY_ROUTE_KEY.REQUEST_TYPE]: REQUEST_TYPE
  [PROXY_ROUTE_KEY.RESPONSE_STATUS]: string
  [PROXY_ROUTE_KEY.REDIRECT_URL]: string
  [PROXY_ROUTE_KEY.DELAY]: number
  [PROXY_ROUTE_KEY.URL]: string
  [PROXY_ROUTE_KEY.GROUP]: string
  [PROXY_ROUTE_KEY.NAME]: string
  [PROXY_ROUTE_KEY.RESPONSE]: undefined | string
  [PROXY_ROUTE_KEY.REQUEST_HEADERS]: any[]
  [PROXY_ROUTE_KEY.RESPONSE_HEADERS]: any[]
  [PROXY_ROUTE_KEY.MOCK_REQUEST_HEADERS]: any[]
  [PROXY_ROUTE_KEY.ENABLE_MOCK_REQUEST_HEADERS]: boolean
  [PROXY_ROUTE_KEY.MOCK_RESPONSE_HEADERS]: any[]
  [PROXY_ROUTE_KEY.ENABLE_MOCK_RESPONSE_HEADERS]: boolean
}

export enum MOCK_TYPE {
  NORMAL = 'normal',
  REDIRECT = 'redirect',
  MODIFY_HEADERS = 'modifyHeaders'
}
export const MOCK_TYPE_DICT = {
  [MOCK_TYPE.NORMAL]: 'Mock',
  [MOCK_TYPE.REDIRECT]: 'Redirect',
  [MOCK_TYPE.MODIFY_HEADERS]: 'ModifyHeaders'
}
export const MOCK_TYPE_DICT_SHADOW = {
  [MOCK_TYPE.NORMAL]:
    // eslint-disable-next-line max-len
    '2px 2px 68px 0px rgba(145, 192, 255, 0.5), inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)',
  [MOCK_TYPE.REDIRECT]:
    // eslint-disable-next-line max-len
    '2px 2px 68px 0px rgba(189, 16, 224, 0.5), inset -9px -9px 16px 0px rgba(189, 16, 224, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)',
  [MOCK_TYPE.MODIFY_HEADERS]:
    // eslint-disable-next-line max-len
    '2px 2px 68px 0px rgba(184, 233, 134, 0.5), inset -8px -8px 16px 0px rgba(184, 233, 134, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)'
}
export const MOCK_TYPE_OPTIONS = convertDictToArray(MOCK_TYPE_DICT)

export enum MATCH_TYPE {
  CONTAINS = 'contains',
  EQUALS = 'equals',
  REGEXP = 'regexp'
}
export const MATCH_TYPE_DICT = {
  [MATCH_TYPE.CONTAINS]: 'contains',
  [MATCH_TYPE.EQUALS]: 'equals',
  [MATCH_TYPE.REGEXP]: 'regexp'
}

export enum ResourceType {
  MAIN_FRAME = 'main_frame',
  SUB_FRAME = 'sub_frame',
  STYLESHEET = 'stylesheet',
  SCRIPT = 'script',
  IMAGE = 'image',
  FONT = 'font',
  OBJECT = 'object',
  XMLHTTPREQUEST = 'xmlhttprequest',
  PING = 'ping',
  CSP_REPORT = 'csp_report',
  MEDIA = 'media',
  WEBSOCKET = 'websocket',
  OTHER = 'other',
  WEBBUNDLE = 'webbundle',
  WEBTRANSPORT = 'webtransport'
}

export enum RuleActionType {
  BLOCK = 'block',
  REDIRECT = 'redirect',
  ALLOW = 'allow',
  UPGRADE_SCHEME = 'upgradeScheme',
  MODIFY_HEADERS = 'modifyHeaders',
  ALLOW_ALL_REQUESTS = 'allowAllRequests'
}

export const MATCH_TYPE_OPTIONS = convertDictToArray(MATCH_TYPE_DICT)

export const HTTP_STATUS_CODE_OPTIONS = Object.keys(HTTP_STATUS_CODE_DICT).map((v) => ({
  value: +v,
  label: `${v} ${HTTP_STATUS_CODE_DICT[v]}`
}))

export enum GLOBAL_VARIABLE {
  CHROME_PLUS_ORIGINAL_XHR = 'CHROME_PLUS_ORIGINAL_XHR',
  CHROME_PLUS_REQUEST_MAP = 'CHROME_PLUS_REQUEST_MAP',
  CHROME_PLUS_PROXY_XHR = 'CHROME_PLUS_PROXY_XHR',
  CHROME_PLUS_PROXY_ROUTES = 'CHROME_PLUS_PROXY_ROUTES'
}
export const GLOBAL_VARIABLE_MAP = {
  [GLOBAL_VARIABLE.CHROME_PLUS_ORIGINAL_XHR]: 'CHROME_PLUS_ORIGINAL_XHR',
  [GLOBAL_VARIABLE.CHROME_PLUS_REQUEST_MAP]: 'CHROME_PLUS_REQUEST_MAP',
  [GLOBAL_VARIABLE.CHROME_PLUS_PROXY_XHR]: 'CHROME_PLUS_PROXY_XHR',
  [GLOBAL_VARIABLE.CHROME_PLUS_PROXY_ROUTES]: 'CHROME_PLUS_PROXY_ROUTES'
}

export const DEFAULT_REQUEST_HEADERS_KEYS = [
  'Accept', // Acceptable response Content-Types
  'Accept-Charset', // Acceptable character sets
  'Accept-Encoding', // Acceptable response content encoding
  'Accept-Language', // Acceptable response content languages
  'Accept-Datetime', // Acceptable version of the content based on datetime
  'Authorization', // Authorization information for authenticated resources
  'Cache-Control', // Cache control directives
  'Connection', // Preferred type of connection
  'Cookie', // HTTP Cookie from server's Set-Cookie
  'Content-Length', // Length of the request body in octal
  'Content-MD5', // MD5 hash of request body content, Base64 encoded
  'Content-Type', // MIME type of the request body
  'Date', // Date and time the message was sent
  'Expect', // Expected server behavior
  'From', // Email address of the request's user
  'Host', // Server domain name and port number
  'If-Match', // Only perform the action if the client's entity matches the server's entity
  'If-Modified-Since', // Allows a 304 Not Modified to be returned if content is unchanged
  'If-None-Match', // Allows a 304 Not Modified to be returned if content is unchanged
  'If-Range', // Send the parts that are missing if the entity is unchanged, otherwise send the entire new entity
  'If-Unmodified-Since', // Only send the response if the entity has not been modified since a specific time
  'Max-Forwards', // Limits the number of times a message can be forwarded through proxies or gateways
  'Origin', // Initiates a request for cross-origin resource sharing (CORS)
  'Pragma', // Implementation-specific headers that may have various effects anywhere along the request-response chain
  'Proxy-Authorization', // Authorization credentials for connecting to a proxy
  'Range', // Request a portion of an entity, byte offsets start at zero
  'Referer', // Address of the previous web page from which a link to the currently requested page was followed
  'TE', // Acceptable encodings for transfer
  'User-Agent', // Browser identification string
  'Upgrade', // Ask the server to upgrade to another protocol
  'Via', // Informs the server of proxies through which the request was sent
  'Warning' // General warning about possible errors in the entity body
]
export const DEFAULT_RESPONSE_HEADERS_KEYS = [
  'Access-Control-Allow-Origin', // 指示哪些网站可以参与跨源访问。它的值可以是一个具体的URI，或者*表示允许任何域的访问。
  'Access-Control-Allow-Methods', // 指定允许跨源请求的HTTP方法，如GET, POST, PUT等。
  'Access-Control-Allow-Headers', // 在预检请求中使用，指定允许的自定义请求头。
  'Access-Control-Allow-Credentials', // 表示是否允许发送Cookie。只有当值为true时，浏览器才会发送Cookie。
  // eslint-disable-next-line max-len
  'Access-Control-Expose-Headers', // 允许浏览器访问的服务端响应头列表，除了六个基本的响应头（Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, 和 Pragma）之外。
  'Access-Control-Max-Age', //  表示预检请求的结果能够被缓存多长时间（以秒为单位）。
  'Accept-Patch', // Specifies the patch document formats accepted by the server
  'Accept-Ranges', // Specifies the range of bytes that the server can handle
  'Age', // The time, in seconds, that the object has been in a proxy cache
  'Allow', // Valid actions for a specific resource
  'Cache-Control', // Directives for caching mechanisms in both requests and responses
  'Connection', // Options desired for the connection
  'Content-Disposition', // Directs the browser to display the file as an attachment for download
  'Content-Encoding', // The type of encoding used on the data
  'Content-Language', // The language the content is in
  'Content-Length', // The length of the response body in octets (8-bit bytes)
  'Content-Location', // An alternate location for the returned data
  'Content-MD5', // A Base64-encoded binary MD5 sum of the content of the response (deprecated)
  'Content-Range', // Where in the full content this partial message belongs
  'Content-Type', // The MIME type of this content
  'Date', // The date and time at which the message was sent
  'ETag', // An identifier for a specific version of a resource
  'Expires', // The date/time after which the response is considered stale
  'Last-Modified', // The last modification date of the resource that was requested
  'Link', // Used to express a typed relationship with another resource
  'Location', // Used in redirection, or when a new resource has been created
  'P3P', // P3P policy
  'Pragma', // Implementation-specific headers that may have various effects
  'Proxy-Authenticate', // Request for authentication to access the proxy
  // eslint-disable-next-line max-len
  'Public-Key-Pins', // HTTP Public Key Pinning, used to convey a commitment to a cryptographic identity for a certain period of time
  // eslint-disable-next-line max-len
  'Refresh', // Used for redirection or when a new resource has been created and should be retrieved after a certain time interval
  'Retry-After', // Indicates how long the user agent should wait before making a follow-up request
  'Server', // A name for the server
  'Set-Cookie', // An HTTP cookie
  'Status', // CGI header field used to define the status of a HTTP response
  'Trailer', // The header fields present in the trailer of a message encoded with chunked transfer-coding
  'Transfer-Encoding', // The form of encoding used to safely transfer the entity to the user
  'Upgrade', // Ask the client to switch to a different protocol
  // eslint-disable-next-line max-len
  'Vary', // Tells downstream proxies how to match future request headers to decide whether the cached response can be used rather than requesting a fresh one from the origin server
  'Via', // Informs the client of proxies through which the response was sent
  'Warning', // A general warning about possible problems with the entity body
  'WWW-Authenticate' // Indicates the authentication scheme that should be used to access the requested entity
]
export default {
  PROXY_ROUTE_KEY,
  MOCK_TYPE,
  MOCK_TYPE_DICT,
  MOCK_TYPE_OPTIONS,
  MATCH_TYPE,
  HTTP_STATUS_CODE,
  MESSAGE_TYPES,
  GLOBAL_VARIABLE_MAP
}
