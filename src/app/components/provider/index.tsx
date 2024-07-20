import { StyleProvider } from '@ant-design/cssinjs';
import zhCN from 'antd/locale/zh_CN';

import AppContext from '~app/context';
import store, { globalConfig, STORE_KEY } from '~app/utils/store';

import 'dayjs/locale/zh-cn';

import { ConfigProvider, theme } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

interface IProps {
  children?: React.ReactElement;
}

/**
 * ant design国际化包裹器组件
 * @param {React.ReactElement} children - 待包裹的子元素
 * @returns React.ReactElement
 */
export default function Provider(props: IProps): React.ReactElement {
  const { children } = props;
  const [global, setGlobal] = useState(null);
  useEffect(() => {
    store.get(STORE_KEY.GLOBAL_CONFIG).then((data: any) =>
      setGlobal((last) => ({
        ...last,
        ...data,
      }))
    );
    store.watch({
      [STORE_KEY.GLOBAL_CONFIG]: (c) => {
        setGlobal((last) => ({
          ...last,
          ...c.newValue,
        }));
      },
    });
  }, []);

  const globalTheme = useMemo(() => {
    return global?.[globalConfig.THEME];
  }, [global?.[globalConfig.THEME]]);

  useEffect(() => {
    if (globalTheme) {
      document.documentElement.setAttribute('data-theme', globalTheme);
    }
  }, [globalTheme]);

  return global ? (
    <ConfigProvider
      locale={zhCN}
      theme={{ algorithm: global?.[globalConfig.THEME] === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <StyleProvider hashPriority="high">
        <AppContext.Provider value={{ ...global, setGlobal }}>{children}</AppContext.Provider>
      </StyleProvider>
    </ConfigProvider>
  ) : null;
}
