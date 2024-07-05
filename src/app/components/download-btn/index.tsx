/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

import download from '~assets/svg/download-white.svg';
import upload from '~assets/svg/upload-white.svg';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: () => void;
  text?: string;
  width?: number;
  type?: 'download' | 'upload';
  theme?: 'light' | 'dark';
}
/**
 * download组件
 * @param {onClick} function - 点击事件
 * @returns React.ReactElement
 */
export default function Download(props: IProps): React.ReactElement {
  const { onClick = () => {}, text, width, theme = 'dark', type = 'download' } = props;
  const innerStyle = css`
    --main-focus: ${theme === 'dark' ? '#2d8cf0' : '#2d8cf0'};
    --font-color: ${theme === 'dark' ? '#dedede' : '#323232'};
    --bg-color-sub: ${theme === 'dark' ? '#222' : '#dedede'};
    --bg-color: ${theme === 'dark' ? '#323232' : '#eee'};
    --main-color: ${theme === 'dark' ? '#dedede' : '#323232'};
    --main-width: ${width || 150}px;
    position: relative;
    width: var(--main-width);
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 2px solid var(--main-color);
    box-shadow: 2px 2px var(--main-color);
    background-color: var(--bg-color);
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    .button__icon,
    .button__text {
      transition: all 0.3s;
    }

    .button__text {
      transform: translateX(21px);
      color: var(--font-color);
      font-weight: 600;
    }

    .button__icon {
      position: absolute;
      transform: translateX(calc(var(--main-width) - 43px));
      height: 100%;
      width: 39px;
      background-color: var(--bg-color-sub);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .svg {
      width: 20px;
      fill: var(--main-color);
    }

    :hover {
      background: var(--bg-color);
    }

    :hover .button__text {
      // color: transparent;
    }

    // :hover .button__icon {
    //   width: var(--main-width);
    //   transform: translateX(-6px);
    // }

    :active {
      transform: translate(3px, 3px);
      box-shadow: 0px 0px var(--main-color);
    }
  `;
  return (
    <button
      type="button"
      className="button"
      css={innerStyle}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}>
      <span className="button__text">{text || 'Download'}</span>
      <span className="button__icon">
        {type === 'download' ? (
          <img width={20} src={download} alt="download" />
        ) : (
          <img width={20} src={upload} alt="upload" />
        )}
      </span>
    </button>
  );
}
