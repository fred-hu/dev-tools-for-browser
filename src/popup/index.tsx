/* eslint-disable max-len */
import {
  AppstoreOutlined,
  BarsOutlined,
  CheckOutlined,
  ChromeOutlined,
  CloseOutlined,
  CopyOutlined,
  GlobalOutlined,
  SettingOutlined
} from '@ant-design/icons'

import '~app/styles/tailwind.scss'

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
  Tag
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import './index.css'

import { sendToBackground } from '@plasmohq/messaging'
import { useStorage } from '@plasmohq/storage/hook'

import AppCard from '~app/components/popup-app-card'
import store, { globalSwitchConfig, STORE_KEY } from '~app/utils/store'
import type { TYPE_GLOBAL_SWITCH_CONFIG } from '~app/utils/store'

import copy from '/assets/svg/copy.svg'
import iconInterface from '/assets/svg/interface.svg'
import typescript from '/assets/svg/typescript.svg'

type AppConfigItem = {
  app: string
  name: string
  description: string
  icon: string
  enable: boolean
  loading: boolean
  onSettingClick?: () => void
  onOpen?: () => void
  onEnableChange?: (v: boolean) => void
}

function IndexPopup() {
  const [list, setList] = useState<AppConfigItem[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerData, setDrawerData] = useState<{
    open: boolean
    app: { title?: string; description?: string; icon?: string; code?: string }
  }>({
    open: false,
    app: {}
  })
  const [globalSwitch, setGlobalSwitch] = useStorage<{ [key: string]: boolean }>(STORE_KEY.GLOBAL_SWITCH_CONFIG, {
    [globalSwitchConfig.MOCK]: false,
    [globalSwitchConfig.COPY]: false,
    [globalSwitchConfig.JSON_TO_TS]: false
  })
  const onClose = () => {
    setDrawerData((last) => ({
      ...last,
      open: false,
      app: {}
    }))
  }

  useEffect(() => {
    const getData = async () => {
      const data: TYPE_GLOBAL_SWITCH_CONFIG = (await store.get(STORE_KEY.GLOBAL_SWITCH_CONFIG)) || {
        [globalSwitchConfig.MOCK]: false,
        [globalSwitchConfig.COPY]: false,
        [globalSwitchConfig.JSON_TO_TS]: false
      }
      setList([
        {
          app: globalSwitchConfig.MOCK,
          name: 'MOCK工具',
          description: 'MOCK接口数据、URL重定向、修改响应头',
          icon: iconInterface,
          loading: false,
          enable: !!data[globalSwitchConfig.MOCK],
          onSettingClick: () => {
            //edge的扩展url前缀为 extension://
            const url = `chrome-extension://${chrome.runtime.id}/tabs/mock.html`
            // 查询是否已有相应URL的标签页
            chrome.tabs.query({}, function (tabs) {
              const existingTab = tabs.find((tab) => tab.url.includes(url))
              if (existingTab) {
                // 如果找到了，激活对应的标签页
                chrome.tabs.update(existingTab.id, { active: true })
              } else {
                // 如果没有找到，新建一个标签页
                chrome.tabs.create({ url: url })
              }
            })
          },
          onEnableChange: async (v) => {
            if (v) {
              message.success('MOCK工具已开启', 1)
            } else {
              message.info('MOCK工具已关闭', 1)
            }
            globalSwitch[globalSwitchConfig.MOCK] = v
            setGlobalSwitch({ ...globalSwitch })
            setList((last) => {
              last.find((v) => v.app === globalSwitchConfig.MOCK).enable = v
              return [...last]
            })
            await sendToBackground({
              name: 'enableMock',
              body: {
                enable: v
              }
            })
            await sendToBackground({
              name: 'updateRules',
              body: {}
            })
          }
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
              message.success('Enable Copy已开启', 0.8)
            } else {
              message.info('Enable Copy已关闭', 0.8)
            }
            globalSwitch[globalSwitchConfig.COPY] = v
            setGlobalSwitch({ ...globalSwitch })
            setList((last) => {
              last.find((v) => v.app === globalSwitchConfig.COPY).enable = v
              return [...last]
            })
            await sendToBackground({
              name: 'enableCopy',
              body: {
                enable: v
              }
            })
          }
        },
        {
          app: globalSwitchConfig.JSON_TO_TS,
          name: 'JSON to TS type',
          description: '通过json生成typescript类型',
          icon: typescript,
          loading: false,
          enable: !!data[globalSwitchConfig.JSON_TO_TS],
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
                  type: "panel",
                  width: 500,
                  height: 600
                });
              }
            });
          }
        }
      ])
      setLoading(false)
    }
    getData()
  }, [])
  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        width: 400,
        height: 600,
        overflow: 'auto'
      }}>
      <div className="cards" style={{ padding: 20 }}>
        <Flex align="center" justify="right">
          <Segmented
            disabled
            options={[
              { value: 'list', icon: <BarsOutlined /> },
              { value: 'cards', icon: <AppstoreOutlined /> }
            ]}
          />
        </Flex>
        <List
          className=""
          loading={loading}
          itemLayout="horizontal"
          loadMore={null}
          dataSource={list}
          renderItem={(item) => (
            <List.Item actions={[]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Flex gap={5} justify="center" align="center" vertical>
                      <Avatar src={item.icon} size="large" shape="square" />
                    </Flex>
                  }
                  title={<span>{item.name}</span>}
                  description={item.description}
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
  )
}

export default IndexPopup
