import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Input, Select } from 'antd'
import type { InputRef, SelectProps } from 'antd'
import React, { useRef, useState } from 'react'

interface IProps {
  onChange?: (v) => void
  onAdd?: (v) => void
  value?: string
  isInputNumber?: boolean
  options: SelectProps['options']
  placeholder?: string
  inputAddonAfter?: React.ReactNode | string
}
const App: React.FC<IProps> = (props: IProps) => {
  const {
    onChange = () => {},
    options = [],
    onAdd = () => {},
    value,
    placeholder,
    isInputNumber = false,
    inputAddonAfter
  } = props
  const [val, setVal] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const onInputChange = (event) => {
    setVal(event.target.value)
  }
  const handleDropdownVisibleChange = (open) => {
    setIsOpen(open)
  }
  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // 输入框有值时才触发添加
    if (val.trim()) {
      onChange(val)
      onAdd(val)
      setVal('')
      setIsOpen(false)
    } else {
      inputRef.current?.focus()
    }
  }

  return (
    <Select
      style={{ width: '100%' }}
      open={isOpen}
      placeholder={placeholder || '请选择或输入'}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      allowClear
      showSearch
      popupMatchSelectWidth={false}
      value={value}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Flex style={{ padding: '0 4px 4px' }} justify="space-between" align="center">
            <Input
              placeholder="自定义输入"
              ref={inputRef}
              value={val}
              type={isInputNumber ? 'number' : 'text'}
              style={{ width: '100%' }}
              allowClear
              {...(inputAddonAfter ? { inputAddonAfter } : {})}
              onChange={onInputChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button style={{ marginLeft: 5 }} size="small" type="text" onClick={addItem}>
              确定
            </Button>
          </Flex>
        </>
      )}
      options={options}
    />
  )
}

export default App
