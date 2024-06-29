import React from "react"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-tomorrow"

interface IProps {
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (data?: string) => void
  onLoad?: () => void
  placeholder?: string
  name: string
  height?: string
  width?: string
}

/**
 * AceEditor组件
 * @param {value} string - 值属性
 * @param {function} onChange - onChange方法
 * @returns React.ReactElement
 */
export default function AceEditorComponent(props: IProps): React.ReactElement {
  const { value, onChange = () => {}, onLoad = () => {}, placeholder, name, width, height } = props

  return (
    <AceEditor
      placeholder={placeholder || "Placeholder Text"}
      mode="json"
      theme="tomorrow"
      name={name || "UNIQUE_ID_OF_DIV"}
      onLoad={onLoad}
      onChange={onChange}
      fontSize={14}
      lineHeight={19}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={value}
      width={width || "100%"}
      height={height || "300px"}
      style={{border: '1px solid #F5F5F5', boxShadow: '0px 0px 5px 0px #F5F5F5'}}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  )
}
