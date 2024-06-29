import { CheckOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Select, Space, Switch, Tooltip, Typography } from 'antd'
import type { SelectProps } from 'antd'
import React, { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { GROUP_KEY } from '~app/constants/group'
import type { GROUP_ITEM } from '~app/constants/group'
import useGroupsStorage from '~app/hooks/useGroupsStorage'
import { STORE_KEY } from '~app/utils/store'

import '~app/styles/tailwind.scss'

import InputSelect from '~app/components/input-select'
import JsonEditor from '~app/components/json-editor'
import {
  DEFAULT_REQUEST_HEADERS_KEYS,
  DEFAULT_RESPONSE_HEADERS_KEYS,
  HTTP_STATUS_CODE_OPTIONS,
  MATCH_TYPE,
  MATCH_TYPE_OPTIONS,
  MOCK_TYPE,
  MOCK_TYPE_OPTIONS,
  PROXY_ROUTE_KEY,
  REQUEST_TYPE,
  REQUEST_TYPE_OPTIONS
} from '~app/constants'
import { HTTP_STATUS_CODE } from '~app/constants/httpStatus'

const { Option } = Select
const { Text } = Typography
export interface IProps {
  form: any
  // eslint-disable-next-line no-unused-vars
  setIsAll: (bool: boolean) => void
  isAll: boolean
}
type OmitId<K extends string | number | symbol> = Exclude<K, typeof PROXY_ROUTE_KEY.ID>
/**
 * Form组件
 * @param {any} prop1 - xx属性
 * @param {function} prop2 - xx方法
 * @returns React.ReactElement
 */
export default function EditForm(props: IProps): React.ReactElement {
  const { form, setIsAll = () => {}, isAll = false } = props
  const formWidth = 680
  const [groups, setGroups] = useGroupsStorage()
  const mockType = Form.useWatch([PROXY_ROUTE_KEY.MOCK_TYPE], form) || MOCK_TYPE.NORMAL
  const requestHeaders = Form.useWatch([PROXY_ROUTE_KEY.REQUEST_HEADERS], form)
  const responseHeaders = Form.useWatch([PROXY_ROUTE_KEY.RESPONSE_HEADERS], form)
  const enableRequestHeaders = Form.useWatch([PROXY_ROUTE_KEY.ENABLE_MOCK_REQUEST_HEADERS], form)
  const enableResponseHeaders = Form.useWatch([PROXY_ROUTE_KEY.ENABLE_MOCK_RESPONSE_HEADERS], form)
  const [requestHeadersKeys] = useState<SelectProps['options']>(
    DEFAULT_REQUEST_HEADERS_KEYS.map((v) => ({ label: v, value: v }))
  )
  const [responseHeadersKeys] = useState<SelectProps['options']>(
    DEFAULT_RESPONSE_HEADERS_KEYS.map((v) => ({ label: v, value: v }))
  )
  const initialValues: Record<OmitId<PROXY_ROUTE_KEY>, any> = {
    [PROXY_ROUTE_KEY.DELAY]: '0',
    [PROXY_ROUTE_KEY.ENABLE_MOCK_REQUEST_HEADERS]: false,
    [PROXY_ROUTE_KEY.ENABLE_MOCK_RESPONSE_HEADERS]: false,
    [PROXY_ROUTE_KEY.MATCH_TYPE]: MATCH_TYPE.CONTAINS,
    [PROXY_ROUTE_KEY.MOCK_TYPE]: MOCK_TYPE.NORMAL,
    [PROXY_ROUTE_KEY.REQUEST_TYPE]: REQUEST_TYPE.ALL,
    [PROXY_ROUTE_KEY.RESPONSE_STATUS]: HTTP_STATUS_CODE.OK,
    [PROXY_ROUTE_KEY.RESPONSE]: undefined,
    [PROXY_ROUTE_KEY.REDIRECT_URL]: '',
    [PROXY_ROUTE_KEY.REQUEST_HEADERS]: [],
    [PROXY_ROUTE_KEY.RESPONSE_HEADERS]: [],
    [PROXY_ROUTE_KEY.MOCK_REQUEST_HEADERS]: [],
    [PROXY_ROUTE_KEY.MOCK_RESPONSE_HEADERS]: [],
    [PROXY_ROUTE_KEY.ENABLE]: true,
    [PROXY_ROUTE_KEY.URL]: '',
    [PROXY_ROUTE_KEY.NAME]: '',
    [PROXY_ROUTE_KEY.GROUP]: ''
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  return (
    <Form
      initialValues={initialValues}
      form={form}
      {...formItemLayout}
      variant="filled"
      style={{ maxWidth: formWidth, paddingTop: 20 }}>
      <Form.Item label="ID" hidden name={PROXY_ROUTE_KEY.ID} rules={[{ required: false, message: '' }]}>
        <Input placeholder="请输入ID" />
      </Form.Item>
      <Form.Item
        label="Mock类型"
        name={PROXY_ROUTE_KEY.MOCK_TYPE}
        rules={[{ required: true, message: '请选择mock方式' }]}>
        <Select placeholder="请选择mock方式" allowClear>
          {MOCK_TYPE_OPTIONS.map((item, i) => (
            <Option key={`${item.value}-${i}`} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="是否启动" name={PROXY_ROUTE_KEY.ENABLE} rules={[{ required: true, message: '请选择mock方式' }]}>
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
      </Form.Item>
      <Form.Item
        label="分组"
        name={PROXY_ROUTE_KEY.GROUP}
        rules={[
          {
            validator: async (_, value) => {
              if (value === undefined) {
                return Promise.reject(new Error('请选择分组'))
              }
              return Promise.resolve()
            }
          }
        ]}>
        <Select placeholder="请选择分组">
          {groups.map((item, i) => (
            <Option key={`${item.value}-${i}`} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="URL地址"
        {...(isAll ? {} : { name: PROXY_ROUTE_KEY.URL })}
        rules={[{ required: true, message: '请输入URL地址' }]}>
        <Input
          disabled={isAll}
          addonBefore={
            <Select
              defaultValue="自定义"
              style={{ width: 90 }}
              value={isAll ? '不限' : '自定义'}
              onChange={(v) => (v === '不限' ? setIsAll(true) : setIsAll(false))}>
              <Option value="自定义">自定义</Option>
              <Option value="不限">不限</Option>
            </Select>
          }
          placeholder={!isAll ? '请输入URL地址' : ''}
        />
      </Form.Item>

      {!isAll && (
        <Form.Item
          label="URL匹配方式"
          name={PROXY_ROUTE_KEY.MATCH_TYPE}
          rules={[{ required: true, message: '请选择URL匹配方式' }]}>
          <Select placeholder="请选择URL匹配方式" allowClear>
            {MATCH_TYPE_OPTIONS.map((item, i) => (
              <Option key={`${item.value}-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item label="MOCK名" name={PROXY_ROUTE_KEY.NAME} rules={[{ required: true, message: '请输入MOCK名' }]}>
        <Input placeholder="请输入MOCK名" />
      </Form.Item>
      {mockType === MOCK_TYPE.NORMAL && (
        <Form.Item
          label="请求方式"
          name={PROXY_ROUTE_KEY.REQUEST_TYPE}
          rules={[{ required: true, message: '请选择请求方式' }]}>
          <Select placeholder="请选择请求方式" allowClear>
            {REQUEST_TYPE_OPTIONS.map((item, i) => (
              <Option key={`${item.value}-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {mockType === MOCK_TYPE.NORMAL && (
        <Form.Item
          label="返回状态"
          name={PROXY_ROUTE_KEY.RESPONSE_STATUS}
          rules={[{ required: true, message: '请选择返回状态' }]}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.label?.toString()?.includes(input) || option?.value?.toString()?.includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.value?.toString() ?? '')
                .toLowerCase()
                .localeCompare((optionB?.value?.toString() ?? '').toLowerCase())
            }
            placeholder="请选择返回状态"
            allowClear>
            {HTTP_STATUS_CODE_OPTIONS.map((item, i) => (
              <Option key={`${item.value}-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {mockType === MOCK_TYPE.NORMAL && (
        <Form.Item label="延迟时间">
          <Flex align="center" justify="space-between" gap={10}>
            <Form.Item noStyle name={PROXY_ROUTE_KEY.DELAY} rules={[{ required: true, message: '请选择延迟时间' }]}>
              <InputSelect
                isInputNumber
                options={[
                  { label: '无延迟', value: '0' },
                  { label: '500', value: '500' },
                  { label: '1000', value: '1000' },
                  { label: '3000', value: '3000' },
                  { label: '5000', value: '5000' }
                ]}
                placeholder="请选择延迟时间"
              />
            </Form.Item>

            <Tooltip title="单位是毫秒">
              <Text italic style={{ width: 75 }}>
                ms(毫秒)
              </Text>
            </Tooltip>
          </Flex>
        </Form.Item>
      )}
      {mockType === MOCK_TYPE.NORMAL && (
        <>
          {/* <Form.Item
            label="Mock请求头"
            name={PROXY_ROUTE_KEY.ENABLE_MOCK_REQUEST_HEADERS}
            rules={[{ required: true, message: '请选择是否Mock请求头' }]}>
            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked={false} />
          </Form.Item>
          {enableRequestHeaders && (
            <Form.Item
              label=" "
              colon={false}
              name={PROXY_ROUTE_KEY.MOCK_REQUEST_HEADERS}
              rules={[
                { required: false, message: '' },
                {
                  validator: (_, value) => {
                    if (value === undefined || value === null || value === '') {
                      return Promise.resolve()
                    }
                    try {
                      const val = JSON.parse(value)
                      if (Object.prototype.toString.call(val) === '[object Object]' && value !== null) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject(new Error('请输入合法的对象'))
                      }
                    } catch (error) {
                      return Promise.reject(new Error('请输入合法的对象'))
                    }
                  }
                }
              ]}>
              <JsonEditor id="requestHeader" height="220px" placeholder="请输入请求头" />
            </Form.Item>
          )} */}

          <Form.Item
            label="Mock响应头"
            name={PROXY_ROUTE_KEY.ENABLE_MOCK_RESPONSE_HEADERS}
            rules={[{ required: true, message: '请选择是否Mock响应头' }]}>
            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked={false} />
          </Form.Item>

          {enableResponseHeaders && (
            <Form.Item
              label=" "
              colon={false}
              name={PROXY_ROUTE_KEY.MOCK_RESPONSE_HEADERS}
              rules={[
                { required: false, message: '' },
                {
                  validator: (_, value) => {
                    if (value === undefined || value === null || value === '') {
                      return Promise.resolve()
                    }
                    try {
                      const val = JSON.parse(value)
                      if (Object.prototype.toString.call(val) === '[object Object]' && value !== null) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject(new Error('请输入合法的对象'))
                      }
                    } catch (error) {
                      return Promise.reject(new Error('请输入合法的对象'))
                    }
                  }
                }
              ]}>
              <JsonEditor id="responseHeader" height="220px" placeholder="请输入返回头" />
            </Form.Item>
          )}
          <Form.Item
            label="返回数据"
            name={PROXY_ROUTE_KEY.RESPONSE}
            rules={[
              { required: false, message: '' },
              {
                validator: (_, value) => {
                  if (value === undefined || value === null || value === '') {
                    return Promise.resolve()
                  }
                  try {
                    const val = JSON.parse(value)
                    if (
                      (Array.isArray(val) || Object.prototype.toString.call(val) === '[object Object]') &&
                      value !== null
                    ) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(new Error('请输入合法的数组或者对象'))
                    }
                  } catch (error) {
                    return Promise.reject(new Error('请输入合法的数组或者对象'))
                  }
                }
              }
            ]}>
            <JsonEditor id="response" placeholder="请输入返回数据" />
          </Form.Item>
        </>
      )}
      {mockType === MOCK_TYPE.MODIFY_HEADERS && (
        <>
          <Form.Item
            label="请求头"
            name={PROXY_ROUTE_KEY.REQUEST_HEADERS}
            rules={[{ required: false, message: '请输入请求头信息' }]}>
            <Form.List name={PROXY_ROUTE_KEY.REQUEST_HEADERS}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const isNotRemove = requestHeaders?.[key]?.operationType !== 'remove'
                    return (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'key']}
                          style={{ width: isNotRemove ? 190 : 292 }}
                          rules={[{ required: true, message: '请输入键' }]}>
                          <InputSelect options={requestHeadersKeys} placeholder="键" />
                        </Form.Item>
                        {isNotRemove && (
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            rules={[{ required: true, message: '请输入值' }]}>
                            <Input placeholder="值" allowClear />
                          </Form.Item>
                        )}
                        <Form.Item
                          {...restField}
                          name={[name, 'operationType']}
                          rules={[{ required: true, message: '请选择操作类型' }]}>
                          <Select placeholder="操作类型" allowClear style={{ width: '100px' }}>
                            <Option value="set">Set</Option>
                            <Option value="remove">Remove</Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    )
                  })}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      新增请求头
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            label="响应头"
            name={PROXY_ROUTE_KEY.RESPONSE_HEADERS}
            rules={[{ required: false, message: '请输入响应头信息' }]}>
            <Form.List name={PROXY_ROUTE_KEY.RESPONSE_HEADERS}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const isNotRemove = responseHeaders?.[key]?.operationType !== 'remove'
                    return (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'key']}
                          style={{ width: isNotRemove ? 190 : 292 }}
                          rules={[{ required: true, message: '请输入键' }]}>
                          <InputSelect options={responseHeadersKeys} placeholder="键" />
                        </Form.Item>
                        {isNotRemove && (
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            rules={[{ required: true, message: '请输入值' }]}>
                            <Input placeholder="值" allowClear />
                          </Form.Item>
                        )}
                        <Form.Item
                          {...restField}
                          name={[name, 'operationType']}
                          rules={[{ required: true, message: '请选择操作类型' }]}>
                          <Select placeholder="操作类型" allowClear style={{ width: '100px' }}>
                            <Option value="set">Set</Option>
                            <Option value="append">Append</Option>
                            <Option value="remove">Remove</Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    )
                  })}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      新增响应头
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </>
      )}
      {mockType === MOCK_TYPE.REDIRECT && (
        <Form.Item
          label="重定向地址"
          name={PROXY_ROUTE_KEY.REDIRECT_URL}
          rules={[{ required: true, message: '请输入重定向地址' }]}>
          <Input placeholder="请输入重定向地址" />
        </Form.Item>
      )}
    </Form>
  )
}
