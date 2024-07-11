/* eslint-disable max-len */
import {
  AppstoreOutlined,
  CheckOutlined,
  ChromeOutlined,
  CloseOutlined,
  CopyOutlined,
  GlobalOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import Provider from '~app/components/provider';
import { MESSAGE_TYPES } from '~app/constants';

import '~app/styles/tailwind.scss';

import {
  Avatar,
  Button,
  Descriptions,
  Divider,
  Drawer,
  Flex,
  List,
  message,
  Segmented,
  Skeleton,
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import './index.css';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import Search from '~app/components/focus-input';
import ThemeSwitcher from '~app/components/theme-switch';
import store, { globalSwitchConfig, STORE_KEY } from '~app/utils/store';
import type { TYPE_GLOBAL_SWITCH_CONFIG } from '~app/utils/store';

import copy from '/assets/svg/copy.svg';
import mockIcon from '/assets/svg/mock.svg';
import qrcode from '/assets/svg/qrcode.svg';
import typescript from '/assets/svg/typescript.svg';

type AppConfigItem = {
  app: string;
  name: string;
  description: string;
  icon: string;
  enable?: boolean;
  loading: boolean;
  onSettingClick?: () => void;
  onOpen?: () => void;
  onEnableChange?: (v: boolean) => void;
};

function IndexPopup() {
  const apps = useRef([]);
  const [list, setList] = useState<AppConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerData, setDrawerData] = useState<{
    open: boolean;
    app: { title?: string; description?: string; icon?: string; code?: string };
  }>({
    open: false,
    app: {},
  });
  const [globalSwitch, setGlobalSwitch] = useStorage<{ [key: string]: boolean }>(STORE_KEY.GLOBAL_SWITCH_CONFIG, {
    [globalSwitchConfig.MOCK]: false,
    [globalSwitchConfig.COPY]: false,
  });
  const onClose = () => {
    setDrawerData((last) => ({
      ...last,
      open: false,
      app: {},
    }));
  };

  useEffect(() => {
    const getData = async () => {
      const data: TYPE_GLOBAL_SWITCH_CONFIG = (await store.get(STORE_KEY.GLOBAL_SWITCH_CONFIG)) || {
        [globalSwitchConfig.MOCK]: false,
        [globalSwitchConfig.COPY]: false,
      };
      apps.current = [
        {
          app: globalSwitchConfig.MOCK,
          name: 'MOCK工具',
          description: 'MOCK接口数据、URL重定向、修改响应头',
          icon: mockIcon,
          loading: false,
          enable: !!data[globalSwitchConfig.MOCK],
          onSettingClick: () => {
            //edge的扩展url前缀为 extension://
            const url = `chrome-extension://${chrome.runtime.id}/tabs/mock.html`;
            // 查询是否已有相应URL的标签页
            chrome.tabs.query({}, function (tabs) {
              const existingTab = tabs.find((tab) => tab.url.includes(url));
              if (existingTab) {
                // 如果找到了，激活对应的标签页
                chrome.tabs.update(existingTab.id, { active: true });
              } else {
                // 如果没有找到，新建一个标签页
                chrome.tabs.create({ url: url });
              }
            });
          },
          onEnableChange: async (v) => {
            if (v) {
              message.success('MOCK工具已开启', 1);
            } else {
              message.info('MOCK工具已关闭', 1);
            }
            globalSwitch[globalSwitchConfig.MOCK] = v;
            setGlobalSwitch({ ...globalSwitch });
            setList((last) => {
              last.find((v) => v.app === globalSwitchConfig.MOCK).enable = v;
              return [...last];
            });
            await sendToBackground({
              name: 'enableMock',
              body: {
                enable: v,
              },
            });
            await sendToBackground({
              name: 'updateRules',
              body: {},
            });
          },
        },
        {
          app: globalSwitchConfig.COPY,
          name: 'Enable Copy',
          description: '一键破除网页复制限制',
          icon: copy,
          loading: false,
          enable: !!data[globalSwitchConfig.COPY],
          onEnableChange: async (v) => {
            if (v) {
              message.success('Enable Copy已开启', 0.8);
            } else {
              message.info('Enable Copy已关闭', 0.8);
            }
            globalSwitch[globalSwitchConfig.COPY] = v;
            setGlobalSwitch({ ...globalSwitch });
            setList((last) => {
              last.find((v) => v.app === globalSwitchConfig.COPY).enable = v;
              return [...last];
            });
            await sendToBackground({
              name: 'enableCopy',
              body: {
                enable: v,
              },
            });
          },
        },
        {
          app: globalSwitchConfig.JSON_TO_TS,
          name: 'JSON to TS type',
          description: '通过json生成typescript类型',
          icon: typescript,
          loading: false,
          onOpen: () => {
            chrome.windows.getAll({ populate: true }, (windows) => {
              const panelUrl = `chrome-extension://${chrome.runtime.id}/tabs/jsontots.html`;
              let existingPanel = null;
              // 遍历所有窗口，查找是否已经存在具有相同 URL 的面板
              for (const window of windows) {
                if (window.type === 'popup') {
                  for (const tab of window.tabs) {
                    if (tab.url.includes(panelUrl)) {
                      existingPanel = window;
                      break;
                    }
                  }
                }
                if (existingPanel) break;
              }
              if (existingPanel) {
                // 如果已经存在具有相同 URL 的面板，则激活该窗口
                chrome.windows.update(existingPanel.id, { focused: true });
              } else {
                // 如果不存在，则创建一个新的面板
                chrome.windows.create({
                  url: panelUrl,
                  type: 'panel',
                  width: 600,
                  height: 750,
                });
              }
            });
          },
        },
        {
          app: globalSwitchConfig.QR_CODE,
          name: '二维码',
          description: '生成二维码',
          icon: qrcode,
          loading: false,
          onOpen: async () => {
            let url = '';
            const tab = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.length) {
              const tabUrl = tab[0].url;
              url = tabUrl.startsWith('http') ? tabUrl : '';
            }
            chrome.windows.getAll({ populate: true }, async (windows) => {
              const panelUrl = `chrome-extension://${chrome.runtime.id}/tabs/qrcode.html`;
              let existingPanel = null;
              // 遍历所有窗口，查找是否已经存在具有相同 URL 的面板
              for (const window of windows) {
                if (window.type === 'popup') {
                  for (const tab of window.tabs) {
                    if (tab.url.includes(panelUrl)) {
                      existingPanel = window;
                      break;
                    }
                  }
                }
                if (existingPanel) break;
              }
              const callback = function (request, sender, sendResponse) {
                if (request.action === MESSAGE_TYPES.SET_QR_CODE_READY) {
                  if (request.payload.secret === 'qrcode-to-popup' && request.payload.data) {
                    sendResponse({ data: url });
                  }
                }
              };
              if (existingPanel) {
                // 如果已经存在具有相同 URL 的面板，则激活该窗口
                await chrome.windows.update(existingPanel.id, { focused: true });
                chrome.tabs.sendMessage(existingPanel.tabs[0].id, { data: url });
              } else {
                if (chrome.runtime?.id) {
                  chrome.runtime.onMessage.removeListener(callback);
                  chrome.runtime.onMessage.addListener(callback);
                }
                // 如果不存在，则创建一个新的面板
                const tab = await chrome.windows.create({
                  url: panelUrl,
                  type: 'panel',
                  width: 400,
                  height: 400,
                });
              }
            });
          },
        },
      ];
      setList([...apps.current]);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <Provider>
      <div
        style={{
          width: 400,
          height: 600,
          overflow: 'auto',
        }}>
        <div className="cards" style={{ padding: 20 }}>
          <Flex align="center" justify="right">
            <ThemeSwitcher />
          </Flex>
          <Flex align="center" justify="center" style={{ margin: '20px 0px' }}>
            <Search
              style={{ width: '100%' }}
              placeholder="搜索工具"
              onChange={(val) => {
                if (val.trim()) {
                  const filter = apps.current.filter((v) => {
                    return v.app?.includes(val) || v.name?.includes(val) || v.description?.includes(val);
                  });
                  setList([...filter]);
                } else {
                  setList([...apps.current]);
                }
              }}
            />
          </Flex>
          <List
            className=""
            loading={loading}
            itemLayout="horizontal"
            loadMore={null}
            dataSource={list || []}
            renderItem={(item) => (
              <List.Item style={{ padding: '5px 0' }}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Flex gap={5} justify="center" align="center" vertical>
                        <Avatar src={item.icon} size="large" shape="square" />
                      </Flex>
                    }
                    title={<span>{item.name}</span>}
                    description={
                      <Tooltip title={item.description} placement="topLeft">
                        <span
                          style={{
                            fontSize: 12,
                            display: 'inline-block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: 190,
                            boxSizing: 'border-box',
                          }}>
                          {item.description}
                        </span>
                      </Tooltip>
                    }
                  />
                  <Flex justify="space-between" align="center" vertical={false} gap={10} style={{ paddingLeft: 10 }}>
                    {item.onSettingClick && <Button icon={<SettingOutlined />} onClick={item.onSettingClick}></Button>}
                    {item.onEnableChange && (
                      <Switch
                        checkedChildren="启用"
                        unCheckedChildren="关闭"
                        value={item.enable}
                        onChange={item.onEnableChange}
                      />
                    )}
                    {item.onOpen && (
                      <Button size="small" type="link" onClick={item.onOpen}>
                        打开
                      </Button>
                    )}
                  </Flex>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Provider>
  );
}

export default IndexPopup;
