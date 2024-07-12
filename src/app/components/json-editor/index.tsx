import { css } from '@emotion/react';
import { theme } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';

import 'jsoneditor/dist/jsoneditor.css';

import JSONEditor from 'jsoneditor/dist/jsoneditor';

import AppContext from '~app/context';

const { useToken } = theme;
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
  const { token } = useToken();
  const config = useContext<any>(AppContext);
  const styles =
    config?.theme === 'dark'
      ? css`
          div.jsoneditor,
          div.jsoneditor-menu {
            border-color: #4b4b4b;
          }
          div.jsoneditor-menu {
            background-color: #4b4b4b;
          }
          div.jsoneditor-tree,
          div.jsoneditor textarea.jsoneditor-text {
            background-color: #666666;
            color: #ffffff;
          }
          div.jsoneditor-field,
          div.jsoneditor-value {
            color: #ffffff;
          }
          table.jsoneditor-search div.jsoneditor-frame {
            background: #808080;
          }

          tr.jsoneditor-highlight,
          tr.jsoneditor-selected {
            background-color: #808080;
          }

          div.jsoneditor-field[contenteditable='true']:focus,
          div.jsoneditor-field[contenteditable='true']:hover,
          div.jsoneditor-value[contenteditable='true']:focus,
          div.jsoneditor-value[contenteditable='true']:hover,
          div.jsoneditor-field.jsoneditor-highlight,
          div.jsoneditor-value.jsoneditor-highlight {
            background-color: #808080;
            border-color: #808080;
          }

          div.jsoneditor-field.highlight-active,
          div.jsoneditor-field.highlight-active:focus,
          div.jsoneditor-field.highlight-active:hover,
          div.jsoneditor-value.highlight-active,
          div.jsoneditor-value.highlight-active:focus,
          div.jsoneditor-value.highlight-active:hover {
            background-color: #b1b1b1;
            border-color: #b1b1b1;
          }

          div.jsoneditor-tree button:focus {
            background-color: #868686;
          }

          /* coloring of JSON in tree mode */
          div.jsoneditor-readonly {
            color: #acacac;
          }
          div.jsoneditor td.jsoneditor-separator {
            color: #acacac;
          }
          div.jsoneditor-value.jsoneditor-string {
            color: #00ff88;
          }
          div.jsoneditor-value.jsoneditor-object,
          div.jsoneditor-value.jsoneditor-array {
            color: #bababa;
          }
          div.jsoneditor-value.jsoneditor-number {
            color: #ff4040;
          }
          div.jsoneditor-value.jsoneditor-boolean {
            color: #ff8048;
          }
          div.jsoneditor-value.jsoneditor-null {
            color: #49a7fc;
          }
          div.jsoneditor-value.jsoneditor-invalid {
            color: white;
          }
        `
      : css``;
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
  return <div id={id || 'jsoneditor'} style={{ width: width || '100%', height: height || '300px' }} css={styles} />;
}
