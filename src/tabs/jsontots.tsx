import { CopyOutlined, FileOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import JsonEditor from '~app/components/json-editor'
import { copyText, jsonToTsTypes } from '~app/utils'

const { TextArea } = Input
/**
 * 组件
 * @returns React.ReactElement
 */
export default function UnnamedComponent(): React.ReactElement {
  const [data, setData] = useState('')
  const [ts, setTs] = useState('')

  const valid = (data) => {
    try {
      const result = JSON.parse(data)
      return result
    } catch (error) {
      return false
    }
  }
  return (
    <div>
      <JsonEditor id="jstojson" value={data} onChange={setData} />
      <Flex style={{ marginTop: 10 }} justify="space-between">
        <Button
          type="primary"
          icon={<FileOutlined />}
          onClick={() => {
            setTs('')
            const res = valid(data)
            if (res) {
              const result = jsonToTsTypes(res, 'RootType')
              setTs(result)
              message.success('转换成功', 1)
            }
          }}>
          转换
        </Button>
        <Button
          type="default"
          disabled={!ts}
          icon={<CopyOutlined />}
          onClick={async () => {
            await copyText(ts)
            message.success('已复制', 1)
          }}>
          复制结果
        </Button>
      </Flex>
      <pre style={{ border: '1px solid #f5f5f5', padding: 10, minHeight: 100 }}>
        <code>{ts}</code>
      </pre>
      {/* <TextArea rows={10} value={ts} readOnly /> */}
    </div>
  )
}
