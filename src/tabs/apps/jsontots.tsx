import { CopyOutlined, FileOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Layout, message, Space, theme } from 'antd';
import React, { useEffect, useState } from 'react';

import JsonEditor from '~app/components/json-editor';
import { MESSAGE_TYPES } from '~app/constants';
import { copyText, jsonToTsTypes } from '~app/utils';

import '../styles/common.scss';

const { useToken } = theme;
const { TextArea } = Input;
/**
 * 组件
 * @returns React.ReactElement
 */
export default function UnnamedComponent(): React.ReactElement {
  const [data, setData] = useState('');
  const [ts, setTs] = useState('');
  const { token } = useToken();
  const valid = (data) => {
    try {
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    chrome.runtime?.id &&
      chrome.runtime.sendMessage(
        {
          action: MESSAGE_TYPES.SET_JSON_TO_TYPES_READY,
          payload: {
            secret: 'jsontotype-to-popup',
            data: true,
          },
        },
        function (response) {
          setData(response?.data ?? '');
        }
      );

    const callback = (request, sender, sendResponse) => {
      setTs('');
      request?.data && setData(request.data);
    };
    chrome.runtime.id && chrome.runtime.onMessage.addListener(callback);
    return () => {
      setTs('');
      setData('');
      chrome.runtime.id && chrome.runtime.onMessage.removeListener(callback);
    };
  }, []);
  return (
    <Layout style={{ width: '100%', height: '100%', overflow: 'hidden', padding: 10 }}>
      <JsonEditor
        id="jstojson"
        value={data}
        onChange={(v) => {
          setData(v);
          setTs('');
        }}
      />
      <Flex style={{ marginTop: 10 }} justify="space-between">
        <Button
          type="primary"
          icon={<FileOutlined />}
          onClick={() => {
            setTs('');
            const res = valid(data);
            if (res) {
              const result = jsonToTsTypes(res, 'RootType');
              setTs(result);
              message.success('转换成功', 1);
            }
          }}>
          转换
        </Button>
        <Button
          type="default"
          disabled={!ts}
          icon={<CopyOutlined />}
          onClick={async () => {
            await copyText(ts);
            message.success('已复制', 1);
          }}>
          复制结果
        </Button>
      </Flex>
      <pre style={{ border: '1px solid #f5f5f5', padding: 10, minHeight: 100, color: token.colorText }}>
        <code>{ts}</code>
      </pre>
      {/* <TextArea rows={10} value={ts} readOnly /> */}
    </Layout>
  );
}
