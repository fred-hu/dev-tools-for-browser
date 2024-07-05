import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { PopconfirmProps, TableColumnsType } from 'antd';
import { Button, message, Popconfirm, Switch, Table, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { useStorage } from '@plasmohq/storage/hook';

import Provider from '~app/components/provider';
import {
  MATCH_TYPE_DICT,
  MOCK_TYPE,
  MOCK_TYPE_DICT,
  MOCK_TYPE_DICT_SHADOW,
  OPERATE_TYPE,
  PROXY_ROUTE_KEY,
  REQUEST_TYPE_DICT,
} from '~app/constants';
import type { PROXY_ROUTE_ITEM } from '~app/constants';
import { type GROUP_ITEM, GROUP_KEY } from '~app/constants/group';
import store, { STORE_KEY } from '~app/utils/store';
import type { TFilter } from '~tabs/mock';

import s from './index.module.scss';

const { Paragraph, Text } = Typography;

type DataType = PROXY_ROUTE_ITEM & Partial<{ id: string; index: number }>;

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
interface IProps {
  dataSource: DataType[];
  filter: TFilter;
  // eslint-disable-next-line no-unused-vars
  callback: (opt: string, record) => void;
}
const App: React.FC<IProps> = React.memo((props: IProps) => {
  const { dataSource, callback = () => {}, filter } = props;
  const [groupMap] = useStorage(STORE_KEY.GROUPS_MAP, {});
  const data: DataType[] = (dataSource || [])
    .map((v, i) => ({
      ...v,
      id: v?.id ?? `${i}`,
      index: i,
    }))
    .filter(
      filter?.keyWords
        ? (v) => v?.name?.includes(filter?.keyWords ?? '') || v?.url?.includes(filter?.keyWords ?? '')
        : () => true
    )
    .filter(filter?.group ? (v) => v?.group === filter?.group : (v) => !v?.group);
  const columns: TableColumnsType<DataType> = [
    {
      title: 'MOCK类型',
      dataIndex: PROXY_ROUTE_KEY.MOCK_TYPE,
      key: PROXY_ROUTE_KEY.MOCK_TYPE,
      render: (text: string) => (
        <Text
          className={s.claymorphism}
          italic
          strong
          style={{
            boxShadow: MOCK_TYPE_DICT_SHADOW[text],
          }}>
          {MOCK_TYPE_DICT[text]}
        </Text>
      ),
    },
    {
      title: '是否开启',
      dataIndex: PROXY_ROUTE_KEY.ENABLE,
      key: PROXY_ROUTE_KEY.ENABLE,
      render: (_, record) => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={!!record?.[PROXY_ROUTE_KEY.ENABLE]}
          onChange={(checked) => {
            callback(OPERATE_TYPE.UPDATE_RECORD, {
              ...record,
              [PROXY_ROUTE_KEY.ENABLE]: checked,
            });
          }}
        />
      ),
    },
    {
      title: '当前分组',
      dataIndex: PROXY_ROUTE_KEY.GROUP,
      key: PROXY_ROUTE_KEY.GROUP,
      render: (text: string) => <Text strong>{groupMap[text] || '默认分组'}</Text>,
    },
    {
      title: 'MOCK名',
      dataIndex: PROXY_ROUTE_KEY.NAME,
      key: PROXY_ROUTE_KEY.NAME,
      render: (text: string) => (
        <Tooltip color="purple" title={`${text}`}>
          <span>{text}</span>
        </Tooltip>
      ),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'URL地址',
      dataIndex: PROXY_ROUTE_KEY.URL,
      key: PROXY_ROUTE_KEY.URL,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record) => {
        // prettier-ignore
        const isRedirect = record[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.REDIRECT;
        // prettier-ignore
        const redirectText = isRedirect ? " -> " + record[PROXY_ROUTE_KEY.REDIRECT_URL] : "";
        return (
          <Tooltip color="purple" title={`${text}${redirectText}`}>
            <span>{!record[PROXY_ROUTE_KEY.MATCH_TYPE] && !text ? '*' : `${text}${redirectText}`}</span>
          </Tooltip>
        );
      },
    },
    {
      title: 'URL匹配方式',
      dataIndex: PROXY_ROUTE_KEY.MATCH_TYPE,
      key: PROXY_ROUTE_KEY.MATCH_TYPE,
      render: (text: string) => (text ? <Text code>{MATCH_TYPE_DICT[text]}</Text> : '-'),
    },
    {
      title: '请求方式',
      dataIndex: PROXY_ROUTE_KEY.REQUEST_TYPE,
      key: PROXY_ROUTE_KEY.REQUEST_TYPE,
      render: (text: string) => {
        const config = {
          [REQUEST_TYPE_DICT.get.toLowerCase()]: 'blue',
          [REQUEST_TYPE_DICT.post.toLowerCase()]: 'green',
          [REQUEST_TYPE_DICT.put.toLowerCase()]: 'geekblue',
          [REQUEST_TYPE_DICT.delete.toLowerCase()]: 'red',
          [REQUEST_TYPE_DICT.patch.toLowerCase()]: 'purple',
          [REQUEST_TYPE_DICT.options.toLowerCase()]: 'volcano',
          [REQUEST_TYPE_DICT.head.toLowerCase()]: 'orange',
          [REQUEST_TYPE_DICT.trace.toLowerCase()]: 'lime',
        };
        return <span>{text ? <Tag color={config[text]}>{REQUEST_TYPE_DICT[text]}</Tag> : '-'}</span>;
      },
    },
    {
      title: '延迟时间',
      dataIndex: PROXY_ROUTE_KEY.DELAY,
      key: PROXY_ROUTE_KEY.DELAY,
      render: (text: string) => <span>{text === '0' ? '无延迟' : text ? text + ' ms' : '-'}</span>,
    },
    {
      title: '操作',
      dataIndex: 'opt',
      key: 'opt',
      width: 320,
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => callback(OPERATE_TYPE.EDIT, record)}>
            编辑
          </Button>
          <Button onClick={() => callback(OPERATE_TYPE.CLONE, record)} style={{ marginLeft: 8 }}>
            克隆
          </Button>
          <Popconfirm
            title={'删除记录'}
            description={<p style={{ marginTop: 10 }} />}
            onConfirm={() => {
              callback(OPERATE_TYPE.DELETE, record);
              message.success('删除成功！');
            }}
            okText="确认"
            cancelText="取消">
            <Button danger style={{ marginLeft: 8 }}>
              删除
            </Button>
          </Popconfirm>
          <Button
            type="dashed"
            disabled={record.index === 0}
            onClick={() => callback(OPERATE_TYPE.TOP, record)}
            style={{ marginLeft: 8 }}>
            置顶
          </Button>
        </>
      ),
    },
  ];

  return (
    <Provider>
      {/* <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group> */}

      <Table
        // rowSelection={{
        //   type: selectionType,
        //   ...rowSelection,
        // }}
        columns={columns}
        rowKey={PROXY_ROUTE_KEY.ID}
        dataSource={data}
      />
    </Provider>
  );
});
App.displayName = 'MockTable';
export default App;
