import '@emotion/react';
import { SerializedStyles } from '@emotion/react';
// 定义全局变量
declare global {
  namespace React {
    interface DOMAttributes<T> {
      css?: SerializedStyles;
    }
  }

  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
    css?: SerializedStyles;
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
}
