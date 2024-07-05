/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface IProps {
  children?: React.ReactElement;
  name?: string;
  description?: string;
  backgroundColor?: string;
  color?: string;
  icon?: React.ReactElement;
  width?: string;
  height?: string;
  onClick?: () => void;
}
/**
 * Loading组件
 * @param {children} React.ReactElement - 子元素
 * @returns React.ReactElement
 */
export default function MainTag(props: IProps): React.ReactElement {
  const { name, description, backgroundColor, color, icon, width, height, onClick } = props;
  const innerStyle = css`
    border: none;
    background-color: white;
    padding: 10px 20px 10px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    color: rgba(0, 0, 0, 0.7);
    font-size: 15px;
    border-radius: 12px;
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    cursor: wait;

    .loader {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: transparent;
      border-radius: 50%;
    }

    .loader {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: transparent;
      width: 23px;
      height: 23px;
      animation: spin89345 1s linear infinite;
    }

    @keyframes spin89345 {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `;
  return (
    <button className="loader__btn" css={innerStyle}>
      <div className="loader" />
      Loading ...
    </button>
  );
}
