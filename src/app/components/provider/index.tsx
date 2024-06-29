import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import React from 'react';
import { ConfigProvider } from 'antd';

interface IProps {
  children?:  React.ReactElement;
}

/**
 * ant design国际化包裹器组件
 * @param {React.ReactElement} children - 待包裹的子元素
 * @returns React.ReactElement
 */
export default function Provider(props: IProps): React.ReactElement {
  const { children } = props;
  return (
    <ConfigProvider locale={zhCN}>
      {children}
    </ConfigProvider>
  );
}