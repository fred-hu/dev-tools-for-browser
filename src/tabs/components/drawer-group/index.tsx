import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, InputNumber, message, Radio, Row, Select, Space, Switch } from 'antd';
import React, { useEffect } from 'react';

import { useStorage } from '@plasmohq/storage/hook';

import { GROUP_KEY } from '~app/constants/group';
import type { GROUP_ITEM } from '~app/constants/group';
import useGroupsStorage from '~app/hooks/useGroupsStorage';
import store, { STORE_KEY } from '~app/utils/store';

const { Option } = Select;
export interface IProps {
  drawerData: { open: boolean; data: GROUP_ITEM };
  // eslint-disable-next-line no-unused-vars
  setDrawerData: ({ open, data }: { open: boolean; data: GROUP_ITEM }) => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (data: GROUP_ITEM & { type: 'edit' | 'add' }) => void;
}
const App: React.FC<IProps> = (props: IProps) => {
  const initialValues = {
    [GROUP_KEY.LABEL]: '',
    [GROUP_KEY.VALUE]: '',
    [GROUP_KEY.ORDER]: undefined,
    [GROUP_KEY.CLOSABLE]: true,
  };
  const [form] = Form.useForm();
  const key = Form.useWatch([GROUP_KEY.VALUE], form);
  const { drawerData, setDrawerData, onSubmit = () => {} } = props;
  const [groups, setGroups] = useGroupsStorage();
  const onClose = () => {
    setDrawerData({
      ...drawerData,
      open: false,
      data: null,
    });
  };
  const onSubmitForm = async () => {
    const newKey = `${+new Date()}`;
    const values: GROUP_ITEM = await form.validateFields();
    const { label, order, value, closable } = values;
    if (!value) {
      if (groups.find((item) => item.label === label)) {
        return message.error('分组名称重复');
      }
      // 新增
      groups.splice(order, 0, {
        [GROUP_KEY.LABEL]: label,
        [GROUP_KEY.VALUE]: value || newKey,
        [GROUP_KEY.ORDER]: order,
        [GROUP_KEY.CLOSABLE]: closable,
      });
      groups.slice(order + 1).forEach((item, i) => {
        item[GROUP_KEY.ORDER] = order + 1 + i;
      });
      setGroups([...groups]);
    } else {
      const index = groups.findIndex((item) => item.value === value);
      // 删除
      groups.splice(index, 1);
      // 插入
      groups.splice(order, 0, {
        [GROUP_KEY.LABEL]: label,
        [GROUP_KEY.VALUE]: value,
        [GROUP_KEY.ORDER]: order,
        [GROUP_KEY.CLOSABLE]: closable,
      });
      if (order <= index) {
        // 前移
        groups.slice(order + 1).forEach((item, i) => {
          item[GROUP_KEY.ORDER] = order + 1 + i;
        });
      } else {
        // 后移
        groups[0][GROUP_KEY.ORDER] = 0;
        groups.slice(1).forEach((item, i) => {
          item[GROUP_KEY.ORDER] = i + 1;
        });
      }
      setGroups([...groups]);
    }
    setDrawerData({
      ...drawerData,
      open: false,
      data: null,
    });
    onSubmit({ ...values, [GROUP_KEY.VALUE]: value || newKey, type: value ? 'edit' : 'add' });
  };
  useEffect(() => {
    if (drawerData?.open) {
      if (drawerData?.data) {
        const { label, value, order, closable } = drawerData.data;
        form?.setFieldsValue?.({
          [GROUP_KEY.LABEL]: label,
          [GROUP_KEY.VALUE]: value,
          [GROUP_KEY.ORDER]: order,
          [GROUP_KEY.CLOSABLE]: closable === undefined ? true : closable,
        });
      } else {
        // 新增
        form.resetFields();
        form.setFieldValue(GROUP_KEY.ORDER, groups.length);
      }
    }
  }, [drawerData]);
  return (
    <>
      <Drawer
        title={key ? '编辑分组' : '新建分组'}
        width={400}
        onClose={onClose}
        open={drawerData?.open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}>
        <Form layout="vertical" form={form} initialValues={initialValues}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={GROUP_KEY.VALUE} label="KEY" rules={[{ required: false, message: '' }]}>
                <Input disabled placeholder="自动生成" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={GROUP_KEY.LABEL} label="组名" rules={[{ required: true, message: '请输入组名' }]}>
                <Input allowClear placeholder="请输入组名" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={GROUP_KEY.CLOSABLE}
                label="是否可删除"
                rules={[{ required: true, message: '请选择是否可删除' }]}>
                <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={GROUP_KEY.ORDER} label="排序" rules={[{ required: true, message: '请输入排序' }]}>
                <InputNumber
                  type="number"
                  style={{ width: '100%' }}
                  min={1}
                  step={1}
                  max={groups.length - (key ? 1 : 0)}
                  placeholder="请输入排序"
                />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onSubmitForm} type="primary">
              确定
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
