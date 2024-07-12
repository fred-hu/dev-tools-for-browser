import {
  CheckOutlined,
  ClearOutlined,
  CloseOutlined,
  CoffeeOutlined,
  DownloadOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SwitcherOutlined,
  UploadOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Dropdown,
  Flex,
  Form,
  Layout,
  message,
  Modal,
  notification,
  Select,
  Space,
  Switch,
  Tabs,
  theme,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import '~app/styles/tailwind.scss';
import '~tabs/styles/mock.css';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import FocusInput from '~app/components/focus-input';
import { MOCK_TYPE, OPERATE_TYPE, PROXY_ROUTE_KEY } from '~app/constants';
import { GROUP_KEY } from '~app/constants/group';
import type { GROUP_ITEM } from '~app/constants/group';
import useGroupsStorage from '~app/hooks/useGroupsStorage';
import { encryptDecrypt, moveToTop } from '~app/utils';
import store, { STORE_KEY } from '~app/utils/store';
import EditGroup from '~tabs/components/drawer-group';
import EditForm from '~tabs/components/mock-form';
import MockTable from '~tabs/components/table';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const { Text } = Typography;
const { Header, Content, Footer } = Layout;
export type TFilter = {
  keyWords: string;
  group: string;
};
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout },
  } = theme.useToken();
  const formWidth = 680;
  const fileInputRef = useRef(null);
  const [api, notificationContextHolder] = notification.useNotification();
  const [modal, modalContextHolder] = Modal.useModal();
  const [form] = Form.useForm();
  const id = Form.useWatch([PROXY_ROUTE_KEY.ID], form);
  const [drawerData, setDrawerData] = useState({
    open: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAll, setIsAll] = useState(false); // 是否不限URL
  const [filter, setFilter] = useState<TFilter>({
    keyWords: '',
    group: '',
  });
  const [proxyRoutes, setProxyRoutes] = useStorage(
    {
      key: STORE_KEY.ROUTES,
      instance: store,
    },
    []
  );
  const [globalSwitchConfig] = useStorage(
    {
      key: STORE_KEY.GLOBAL_SWITCH_CONFIG,
      instance: store,
    },
    {}
  );
  const emptyGroupMocks = useRef(false);
  const [groups, setGroups] = useGroupsStorage();
  const [groupMap] = useStorage(STORE_KEY.GROUPS_MAP, {});
  const openNotificationWithIcon = (type: NotificationType, message, description) => {
    api[type]({
      message,
      description,
    });
  };
  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}-${hours}${minutes}`;
  };
  const showModal = () => {
    setOpen(true);
    setIsAll(false);
    setTimeout(() => {
      // 新增时重置表单
      form.resetFields();
      form.setFieldValue(PROXY_ROUTE_KEY.GROUP, filter?.group || '');
    }, 0);
  };
  const updateRules = async () => {
    const result = await sendToBackground({
      name: 'updateRules',
      body: {},
    });
    if (!result) {
      console.log('updateRules success');
    }
  };
  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      if (isAll) {
        Object.assign(values, {
          [PROXY_ROUTE_KEY.URL]: undefined,
          [PROXY_ROUTE_KEY.MATCH_TYPE]: undefined,
        });
      }
      const { requestHeaders = [], responseHeader = [] } = values;
      requestHeaders.forEach((v) => {
        if (v.operationType === 'remove') {
          delete v?.value;
        }
      });
      responseHeader.forEach((v) => {
        if (v.operationType === 'remove') {
          delete v?.value;
        }
      });
      if (!values[PROXY_ROUTE_KEY.ID]) {
        // 新增
        setProxyRoutes((last) => [{ ...values, id: `${+new Date()}` }, ...last]);
      } else {
        // 编辑
        const item = proxyRoutes.find((item, i) => item.id === values.id || i === +values.id);
        if (item) {
          // 更新编辑了的字段
          Object.keys(values).forEach((key) => {
            item[key] = values[key];
          });
          if (values[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.NORMAL) {
            [PROXY_ROUTE_KEY.REDIRECT_URL, PROXY_ROUTE_KEY.REQUEST_HEADERS, PROXY_ROUTE_KEY.RESPONSE_HEADERS].forEach(
              (v) => delete item[v]
            );
          }
          if (values[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.REDIRECT) {
            [
              PROXY_ROUTE_KEY.RESPONSE_STATUS,
              PROXY_ROUTE_KEY.RESPONSE,
              PROXY_ROUTE_KEY.REQUEST_HEADERS,
              PROXY_ROUTE_KEY.MOCK_REQUEST_HEADERS,
              PROXY_ROUTE_KEY.ENABLE_MOCK_REQUEST_HEADERS,
              PROXY_ROUTE_KEY.RESPONSE_HEADERS,
              PROXY_ROUTE_KEY.MOCK_RESPONSE_HEADERS,
              PROXY_ROUTE_KEY.ENABLE_MOCK_RESPONSE_HEADERS,
              PROXY_ROUTE_KEY.DELAY,
              PROXY_ROUTE_KEY.REQUEST_TYPE,
            ].forEach((v) => delete item[v]);
          }
          if (values[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.MODIFY_HEADERS) {
            [
              PROXY_ROUTE_KEY.RESPONSE_STATUS,
              PROXY_ROUTE_KEY.RESPONSE,
              PROXY_ROUTE_KEY.MOCK_REQUEST_HEADERS,
              PROXY_ROUTE_KEY.ENABLE_MOCK_REQUEST_HEADERS,
              PROXY_ROUTE_KEY.MOCK_RESPONSE_HEADERS,
              PROXY_ROUTE_KEY.ENABLE_MOCK_RESPONSE_HEADERS,
              PROXY_ROUTE_KEY.DELAY,
              PROXY_ROUTE_KEY.REDIRECT_URL,
              PROXY_ROUTE_KEY.REQUEST_TYPE,
            ].forEach((v) => delete item[v]);
          }
          setProxyRoutes([...proxyRoutes]);
        }
      }
      setOpen(false);
      setLoading(false);
      // 编辑后重置表单
      setTimeout(() => {
        form.resetFields();
      }, 200);
      updateRules();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setIsAll(false);
    // 取消时重置表单
    setTimeout(() => {
      form.resetFields();
    }, 200);
  };
  const onCallBack = (opt, record) => {
    const { index, ...mockConfig } = record;
    switch (opt) {
      case OPERATE_TYPE.EDIT:
        setIsAll(!mockConfig[PROXY_ROUTE_KEY.MATCH_TYPE] && !mockConfig[PROXY_ROUTE_KEY.URL]);
        setOpen(true);
        form.setFieldsValue({ ...mockConfig, id: mockConfig.id });
        break;
      case OPERATE_TYPE.DELETE:
        const filter = proxyRoutes.filter((item, i) => item.id !== mockConfig.id && i !== +mockConfig.id);
        setProxyRoutes([...filter]);
        updateRules();
        break;
      case OPERATE_TYPE.UPDATE_RECORD:
        const item = proxyRoutes.find((item, i) => item.id === mockConfig.id || i === +mockConfig.id);
        if (item) {
          Object.keys(mockConfig).forEach((key) => {
            item[key] = mockConfig[key];
          });
          setProxyRoutes([...proxyRoutes]);
          updateRules();
        }
        break;
      case OPERATE_TYPE.TOP: // 置顶
        moveToTop(proxyRoutes, index ?? proxyRoutes.findIndex((item) => item.id === mockConfig.id));
        setProxyRoutes([...proxyRoutes]);
        message.success('置顶成功', 1);
        break;
      case OPERATE_TYPE.CLONE: // 克隆
        proxyRoutes.splice(index + 1, 0, {
          ...mockConfig,
          id: `${+new Date()}`,
        });
        setProxyRoutes([...proxyRoutes]);
        message.success('克隆成功', 1);
        updateRules();
        break;
      default:
        // You can handle the default case here if needed
        break;
    }
  };
  const handleExport = async () => {
    if (!proxyRoutes.length) {
      return message.warning('暂无数据', 1);
    }
    const data = encryptDecrypt(
      JSON.stringify({
        secret: 'MOCK',
        proxyRoutes,
        groups,
      }),
      'upload'
    );
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `config-${formatDate()}.mock`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      try {
        let mergedRoutes = [];
        let mergedTabs = [];
        const data = encryptDecrypt(text as string, 'upload');
        const result = JSON.parse(data);
        const { secret, proxyRoutes: routes, groups: tabs } = result;

        if (secret === 'MOCK') {
          if (routes) {
            mergedRoutes = proxyRoutes.concat(routes).reduce(
              (acc, current) => {
                if (!acc.map[current[PROXY_ROUTE_KEY.ID]]) {
                  acc.map[current[PROXY_ROUTE_KEY.ID]] = true;
                  acc.result.push(current);
                }
                return acc;
              },
              { map: {}, result: [] }
            ).result;
            setProxyRoutes([...mergedRoutes]);
          }
          if (groups) {
            mergedTabs = groups.concat(tabs).reduce(
              (acc, current) => {
                if (!acc.map[current[GROUP_KEY.VALUE]]) {
                  acc.map[current[GROUP_KEY.VALUE]] = true;
                  acc.result.push(current);
                }
                return acc;
              },
              { map: {}, result: [] }
            ).result;
            setGroups([...mergedTabs]);
          }
          openNotificationWithIcon(
            'success',
            '导入成功',
            `成功导入${mergedTabs.length - groups.length}条分组，${mergedRoutes.length - proxyRoutes.length}条数据`
          );
        } else {
          openNotificationWithIcon('warning', '导入失败', '导入失败，请检查数据格式');
        }
      } catch (error) {
        console.error(error);
        openNotificationWithIcon('warning', '导入失败', '导入失败，请检查数据格式');
      }
      fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const onChange = (newActiveKey: string) => {
    setFilter({ ...filter, group: newActiveKey });
  };

  const add = () => {
    setDrawerData({ open: true, data: null });
  };

  const remove = (targetKey: TargetKey, empty = false) => {
    setFilter({ ...filter, group: '' });
    setGroups((last) => last.filter((item) => item?.value !== targetKey));
    // 清空组下所有数据
    if (empty) {
      setProxyRoutes(proxyRoutes.filter((item) => item[PROXY_ROUTE_KEY.GROUP] !== targetKey));
    } else {
      proxyRoutes
        .filter((item) => item[PROXY_ROUTE_KEY.GROUP] === targetKey)
        .forEach((v) => {
          v[PROXY_ROUTE_KEY.GROUP] = '';
        });
      setProxyRoutes([...proxyRoutes]);
    }
    message.success('操作成功', 1);
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      modal.confirm({
        title: `确认删除当前分组-【${groups.find((v) => v?.value === targetKey)?.label}】?`,
        centered: true,
        icon: <ExclamationCircleOutlined />,
        content: (
          <div style={{ padding: '20px 0' }}>
            <Space size={20}>
              <label>是否清空当前组下所有数据</label>
              <Switch
                id="save"
                checkedChildren="是"
                unCheckedChildren="否"
                onChange={() => (emptyGroupMocks.current = !emptyGroupMocks.current)}
              />
            </Space>
          </div>
        ),
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          remove(targetKey, emptyGroupMocks.current);
          emptyGroupMocks.current = false;
        },
        onCancel: () => {
          emptyGroupMocks.current = false;
        },
      });
    }
  };
  return (
    <Layout style={{ height: '100%', overflow: 'auto', minWidth: 1450 }}>
      {notificationContextHolder}
      {modalContextHolder}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 2,
          backgroundColor: colorBgLayout,
        }}>
        <Flex align="center" justify="space-between" gap={20} style={{ width: '100%' }}>
          <div>
            <Text type="success">
              <CoffeeOutlined style={{ marginRight: 5 }} />
              支持mock数据、重定向、修改响应头等
            </Text>
          </div>
          <Flex gap={20} align="center" justify="start">
            {(globalSwitchConfig as any)?.mock === false && (
              <Text type="warning">
                <WarningOutlined style={{ marginRight: 5 }} />
                全局已禁用MOCK功能
              </Text>
            )}
            <Button type="primary" icon={<DownloadOutlined />} size={'middle'} onClick={handleExport}>
              导出
            </Button>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              size={'middle'}
              onClick={() => {
                fileInputRef.current.click();
              }}>
              导入
            </Button>
            <Dropdown.Button
              size="middle"
              style={{ width: 140 }}
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <Button size="small" danger type="link" icon={<ClearOutlined />}>
                        清空全部数据
                      </Button>
                    ),
                  },
                  {
                    key: '2',
                    label: (
                      <Button className="text-black" size="small" type="link" icon={<CloseOutlined />}>
                        全部禁用
                      </Button>
                    ),
                  },
                  {
                    key: '3',
                    label: (
                      <Button className="text-black" size="small" type="link" icon={<CheckOutlined />}>
                        全部启用
                      </Button>
                    ),
                  },
                ],
                onClick: (e) => {
                  switch (e.key) {
                    case '1': {
                      if (proxyRoutes.length) {
                        modal.confirm({
                          title: '确认清空',
                          icon: <ExclamationCircleOutlined />,
                          content: '此操作将清空包含分组在内的所有数据，是否继续？',
                          okText: '确认',
                          cancelText: '取消',
                          onOk: () => {
                            setProxyRoutes([]);
                            setGroups([groups[0]]);
                            setFilter({ ...filter, group: '' });
                            message.success('清空成功', 1);
                          },
                        });
                      } else {
                        message.warning('暂无数据', 1);
                      }
                      break;
                    }
                    case '2': {
                      if (proxyRoutes.length) {
                        setProxyRoutes(proxyRoutes.map((item) => ({ ...item, [PROXY_ROUTE_KEY.ENABLE]: false })));
                        message.success('已全部禁用', 1);
                      } else {
                        message.warning('暂无数据', 1);
                      }
                      break;
                    }
                    case '3': {
                      if (proxyRoutes.length) {
                        setProxyRoutes(proxyRoutes.map((item) => ({ ...item, [PROXY_ROUTE_KEY.ENABLE]: true })));
                        message.success('已全部启用', 1);
                      } else {
                        message.warning('暂无数据', 1);
                      }
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                },
              }}>
              <SwitcherOutlined />
              批量操作
            </Dropdown.Button>
            <input
              type="file"
              id="upload"
              name="upload"
              onChange={handleUpload}
              accept=".mock"
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </Flex>
        </Flex>
      </Header>
      <Content style={{ padding: '10px', overflow: 'auto' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
          <Flex justify="space-between" align="center">
            <Space size={20}>
              <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                新增Mock
              </Button>
              <Button
                type="default"
                disabled={filter?.group === ''}
                icon={<EditOutlined />}
                onClick={() =>
                  setDrawerData({ ...drawerData, open: true, data: groups.find((v) => v?.value === filter?.group) })
                }>
                编辑当前分组
              </Button>
            </Space>
            <Space size={50}>
              <Select
                labelInValue
                optionLabelProp="label"
                style={{ width: 300 }}
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const arrOption = option?.value?.toString().split('$').slice(0, 2);
                  return arrOption.some((v) => v.toLowerCase().includes(input.toLowerCase()));
                }}
                filterSort={(optionA, optionB) =>
                  (optionA?.value?.toString() ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.value?.toString() ?? '').toLowerCase())
                }
                placeholder="全局搜索：MOCK名、URL地址"
                onChange={(value) => {
                  const url = value?.value?.split('$')?.[0];
                  if (url) {
                    const filter = url === '*' ? '' : url;
                    const selectedItem = proxyRoutes.find((item) => item.url === filter);
                    setFilter({ ...filter, group: selectedItem?.group || '' });
                  }
                }}>
                {proxyRoutes.map((item) => (
                  <Select.Option
                    key={item.id}
                    value={`${item?.url || '*'}$${item.name}$${item.id}`}
                    label={<span style={{ fontSize: 13, color: '#333' }}>{`URL地址: ${item.url || '*'}`}</span>}>
                    <div style={{ padding: 5 }}>
                      <Flex justify="start" align="center" style={{ fontSize: 13 }}>
                        <strong>URL地址：{item.url || '*'}</strong>
                      </Flex>
                      <Flex justify="space-between" align="center" style={{ fontSize: 12, color: '#666' }}>
                        <span style={{ width: '50%' }}>分组：{groupMap[item.group] || '默认分组'}</span>
                        <span style={{ width: '50%' }}>MOCK名：{item.name}</span>
                      </Flex>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Flex>
          <Divider />
          <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={filter?.group ?? ''}
            onEdit={onEdit}
            items={groups.map((v) => {
              return {
                label: v?.label,
                children: (
                  <div>
                    <MockTable dataSource={proxyRoutes} callback={onCallBack} filter={{ ...filter, group: v?.value }} />
                  </div>
                ),
                key: v?.value,
                closable: v?.closable,
              };
            })}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', padding: '0px', height: '30px', lineHeight: '30px' }}>Author: Fred</Footer>
      <Modal
        open={open}
        title={id ? '编辑' : '新增'}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        width={formWidth}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确认
          </Button>,
        ]}>
        <EditForm form={form} isAll={isAll} setIsAll={setIsAll} />
      </Modal>
      <EditGroup
        drawerData={drawerData}
        setDrawerData={setDrawerData}
        onSubmit={(v) => {
          setFilter({ ...filter, group: v?.value });
          message.success(v.type === 'add' ? '新建成功' : '编辑成功', 1);
        }}
      />
    </Layout>
  );
};

export default App;
