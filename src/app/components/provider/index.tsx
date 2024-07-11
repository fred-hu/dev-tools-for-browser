import { StyleProvider } from '@ant-design/cssinjs';
import { ThemeProvider } from 'antd-style';
import zhCN from 'antd/locale/zh_CN';

import AppContext from '~app/context';
import store, { globalConfig, STORE_KEY } from '~app/utils/store';

import 'dayjs/locale/zh-cn';

import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';

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
  const [switchConfig, setSwitchConfig] = useState({});
  const [global, setGlobal] = useState(null);
  useEffect(() => {
    store.get(STORE_KEY.GLOBAL_CONFIG).then((data: any) =>
      setGlobal((last) => ({
        ...last,
        ...data,
      }))
    );
    store.get(STORE_KEY.GLOBAL_SWITCH_CONFIG).then((data: any) =>
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
      [STORE_KEY.GLOBAL_SWITCH_CONFIG]: (c) => {
        setGlobal((last) => ({
          ...last,
          ...c.newValue,
        }));
      },
    });
  }, []);
  return global ? (
    <ConfigProvider locale={zhCN}>
      <ThemeProvider themeMode={global[globalConfig.THEME]}>
        <StyleProvider hashPriority="high">
          <AppContext.Provider
            value={global}>
            {children}
          </AppContext.Provider>
        </StyleProvider>
      </ThemeProvider>
    </ConfigProvider>
  ) : null;
}
