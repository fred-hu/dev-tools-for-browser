// 定义全局变量
declare global {
  
}
declare module "*.png" {
  const value: any;
  export = value;
}
declare module "*.svg" {
  const content: any;
  export default content;
}
declare interface Window {
  REQUEST_MAP: Map;
  hello: Record<string, any>;
  [key: string]: any;
}
declare interface HTMLElement {
  css: any;
}