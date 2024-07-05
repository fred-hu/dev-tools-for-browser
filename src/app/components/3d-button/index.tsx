/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface IProps {
  text?: string;
  width?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (value?: boolean) => void;
  style?: React.CSSProperties;
}
/**
 * Button3D组件
 * @param {text} string - 按钮文案
 * @returns React.ReactElement
 */
export default function Button3D(props: IProps): React.ReactElement {
  const { text, onClick = () => {}, width, style = {} } = props;
  const innerStyle = css`
    color: #090909;
    width: ${width || 'auto'};
    padding: 0.7em 1em;
    font-size: 14px;
    border-radius: 0.5em;
    background: #e8e8e8;
    cursor: pointer;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow:
      6px 6px 12px #c5c5c5,
      -6px -6px 12px #ffffff;

    :hover {
      border: 1px solid white;
    }

    :active {
      box-shadow:
        4px 4px 12px #c5c5c5,
        -4px -4px 12px #ffffff;
    }
  `;
  return (
    <button css={innerStyle} onClick={() => onClick()} style={style}>
      {text || 'Button'}
    </button>
  );
}
