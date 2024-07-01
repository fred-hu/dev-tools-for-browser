/* eslint-disable max-len */
import { ChromeOutlined, CopyOutlined, GlobalOutlined } from '@ant-design/icons'

import '~app/styles/tailwind.scss'

import { Button, Divider, Drawer, Flex, Space, Spin, Switch, Tag, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import './index.css'

import { sendToBackground } from '@plasmohq/messaging'
import { useStorage } from '@plasmohq/storage/hook'

import AppCard from '~app/components/popup-app-card'
import store, { STORE_KEY } from '~app/utils/store'

import copy from '/assets/svg/copy.svg'
import iconInterface from '/assets/svg/interface.svg'
import iconSearch from '/assets/svg/search.svg'

function IndexPopup() {
  const [drawerData, setDrawerData] = useState<{
    open: boolean
    app: { title?: string; description?: string; icon?: string; code?: string }
  }>({
    open: false,
    app: {}
  })
  const [globalSwitch, setGlobalSwitch] = useStorage<{ [key: string]: boolean }>(STORE_KEY.GLOBAL_SWITCH_CONFIG, {
    mock: false,
    copy: false,
    jsonToTs: false,
  })
  const onClose = () => {
    setDrawerData((last) => ({
      ...last,
      open: false,
      app: {}
    }))
  }
  const loading = Object.keys(globalSwitch).length === 0
  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        width: 500,
        height: 400,
        overflow: 'auto'
      }}>
      <div className="cards" style={{ padding: 20 }}>
        <Spin tip="Loading" size="small" spinning={false}>
          <Flex wrap gap="12px">
            <AppCard
              loading={loading}
              settingIcon
              backgroundColor="#c7c7ff"
              color="rgba(149, 149, 255, 1)"
              name="MOCK工具"
              description="mock、重定向等"
              enable={globalSwitch.mock ?? false}
              onEnableChange={async (v) => {
                if (v) {
                  message.success('MOCK工具已开启', 1)
                } else {
                  message.info('MOCK工具已关闭', 1)
                }
                globalSwitch.mock = v
                setGlobalSwitch({ ...globalSwitch })
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
              }}
              onClick={() => {
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
              }}
              icon={<img src={iconInterface} />}
            />
            <AppCard
              loading={loading}
              backgroundColor="#f3bbe1"
              color="rgba(220,91,183,1)"
              name="Enable Copy"
              description="Enable Copy"
              enable={globalSwitch.copy ?? false}
              onEnableChange={async (v) => {
                if (v) {
                  message.success('Enable Copy已开启', 0.8)
                } else {
                  message.info('Enable Copy已关闭', 0.8)
                }
                globalSwitch.copy = v
                setGlobalSwitch({ ...globalSwitch })
                await sendToBackground({
                  name: 'enableCopy',
                  body: {
                    enable: v
                  }
                })
              }}
              icon={<img src={copy} />}
            />
            {window.model && <AppCard
              loading={loading}
              backgroundColor="#ffd8be"
              color="rgba(252, 161, 71, 1)"
              name="Gemini"
              description="google gemini"
              clickable
              showSwitch={false}
              onClick={async () => {
                chrome.windows.create({
                  url: `chrome-extension://${chrome.runtime.id}/tabs/gemini.html`,
                  type: "panel",
                  width: 500,
                  height: 500
                });
              }}
              icon={<img src={iconSearch} />}
            />}
          </Flex>
        </Spin>
      </div>

      {/* <div style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={async () => {
            const [tab] = await chrome.tabs.query({
              active: true,
              // lastFocusedWindow: true
            })
            if (tab) {
              const tabId = tab.id;
              await chrome.sidePanel.open({ tabId });
              // await chrome.sidePanel.setOptions({
              //   tabId,
              //   path: 'sidepanel-tab.html',
              //   enabled: true
              // });
            }
            
          }}>
          快捷开关
        </Button>
      </div> */}
      <Drawer
        title={drawerData?.app?.title}
        placement={'bottom'}
        width={'100%'}
        height={320}
        onClose={onClose}
        open={drawerData.open}
        // extra={
        //   <Space>
        //     <Button onClick={() => {}}>Cancel</Button>
        //     <Button type="primary" onClick={() => {}}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
        {}
      </Drawer>
    </div>
  )
}

export default IndexPopup
