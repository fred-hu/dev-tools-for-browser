import { ClearOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Provider from '~app/components/provider';
import { MESSAGE_TYPES, PROXY_ROUTE_KEY } from '~app/constants';

const { Text, Link } = Typography;

const MockRecord = () => {
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (text: any) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '请求地址',
      dataIndex: PROXY_ROUTE_KEY.URL,
      key: PROXY_ROUTE_KEY.URL,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: '请求类型',
      dataIndex: 'xhrType',
      key: 'xhrType',
    },
    {
      title: '响应状态',
      dataIndex: PROXY_ROUTE_KEY.RESPONSE_STATUS,
      key: PROXY_ROUTE_KEY.RESPONSE_STATUS,
    },
    {
      title: '延迟时间',
      dataIndex: PROXY_ROUTE_KEY.DELAY,
      key: PROXY_ROUTE_KEY.DELAY,
      render: (text: any) => `${text > 0 ? `${text} ms` : '无延迟'}`,
    },
    {
      title: '响应头',
      dataIndex: PROXY_ROUTE_KEY.MOCK_RESPONSE_HEADERS,
      key: PROXY_ROUTE_KEY.MOCK_RESPONSE_HEADERS,
    },
    {
      title: '响应',
      dataIndex: PROXY_ROUTE_KEY.RESPONSE,
      key: PROXY_ROUTE_KEY.RESPONSE,
    },
  ];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const callback = (request, sender, sendResponse) => {
      const { action, payload } = request;
      if (action === MESSAGE_TYPES.SET_RECORD && payload.secret === 'content-to-devtools') {
        const data = [payload.data, ...records].slice(0, 10);
        setRecords(data);
      }
    };
    chrome.runtime.id && chrome.runtime.onMessage.addListener(callback);
    return () => {
      chrome.runtime.id && chrome.runtime.onMessage.removeListener(callback);
    };
  }, []);
  return (
    <Provider>
      <div style={{ padding: '20px' }}>
        <Space size={40}>
          <Button type="primary" danger onClick={() => setRecords([])} icon={<ClearOutlined />}>
            清空记录
          </Button>
          <Text type="danger">Note: 仅保留10条记录</Text>
        </Space>
        <Table
          style={{ marginTop: '10px' }}
          rowKey={(record) => record.time}
          dataSource={records}
          columns={columns}
          pagination={false}
          size="small"
        />
      </div>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<MockRecord />);
