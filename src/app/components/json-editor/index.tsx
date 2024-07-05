import React, { useEffect, useRef } from 'react';

import 'jsoneditor/dist/jsoneditor.css';

import JSONEditor from 'jsoneditor/dist/jsoneditor';

interface IProps {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (data?: string) => void;
  placeholder?: string;
  id: string;
  height?: string;
  width?: string;
}

/**
 * JsonEditor组件
 * @param {value} string - 值属性
 * @param {function} onChange - onChange方法
 * @returns React.ReactElement
 */
export default function JsonEditorComponent(props: IProps): React.ReactElement {
  const { value, onChange = () => {}, id, width, height } = props;
  const editorRef = useRef<any>();
  useEffect(() => {
    // create the editor
    const container = document.getElementById(id || 'jsoneditor');
    const options = {
      mode: 'text',
      onChangeText: (val) => {
        onChange(val);
      },
    };
    const editor = new JSONEditor(container, options);
    editor.setText(value);
    editorRef.current = editor;
    return () => {
      editor.destroy();
    };
  }, []);
  useEffect(() => {
    if (editorRef?.current) {
      editorRef.current.setText(value ?? '');
    }
  }, [value]);
  return <div id={id || 'jsoneditor'} style={{ width: width || '100%', height: height || '300px' }} />;
}
