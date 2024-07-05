/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface IProps {
  value?: string;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value?: boolean) => void;
}
/**
 * download-switch组件
 * @param {checked} boolean - 是否选中
 * @returns React.ReactElement
 */
export default function DownloadSwitch(props: IProps): React.ReactElement {
  const { onChange, checked } = props;
  const innerStyle = css`
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;

    .label {
      background-color: transparent;
      border: 2px solid rgb(91, 91, 240);
      display: flex;
      align-items: center;
      border-radius: 50px;
      width: 150px;
      cursor: pointer;
      transition: all 0.4s ease;
      padding: 5px;
      position: relative;
    }

    .label::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      width: 8px;
      height: 8px;
      transition: all 0.4s ease;
      border-radius: 100%;
      margin: auto;
      opacity: 0;
      visibility: hidden;
    }

    .label .input {
      display: none;
    }

    .label .title {
      font-size: 17px;
      color: #fff;
      transition: all 0.4s ease;
      position: absolute;
      right: 15px;
      bottom: 14px;
      text-align: center;
    }

    .label .title:last-child {
      opacity: 0;
      visibility: hidden;
    }

    .label .circle {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      background-color: rgb(91, 91, 240);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.4s ease;
      position: relative;
      box-shadow: 0 0 0 0 rgb(255, 255, 255);
      overflow: hidden;
    }

    .label .circle .icon {
      color: #fff;
      width: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
    }

    .label .circle .square {
      aspect-ratio: 1;
      width: 15px;
      border-radius: 2px;
      background-color: #fff;
      opacity: 0;
      visibility: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
    }

    .label .circle::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background-color: #3333a8;
      width: 100%;
      height: 0;
      transition: all 0.4s ease;
    }

    .label:has(.input:checked) {
      width: 57px;
      animation: installed 0.4s ease 3.5s forwards;
    }

    .label:has(.input:checked)::before {
      animation: rotate 3s ease-in-out 0.4s forwards;
    }

    .label .input:checked + .circle {
      animation:
        pulse 1s forwards,
        circleDelete 0.2s ease 3.5s forwards;
      rotate: 180deg;
    }

    .label .input:checked + .circle::before {
      animation: installing 3s ease-in-out forwards;
    }

    .label .input:checked + .circle .icon {
      opacity: 0;
      visibility: hidden;
    }

    .label .input:checked ~ .circle .square {
      opacity: 1;
      visibility: visible;
    }

    .label .input:checked ~ .title {
      opacity: 0;
      visibility: hidden;
    }

    .label .input:checked ~ .title:last-child {
      animation: showInstalledMessage 0.4s ease 3.5s forwards;
    }

    @keyframes pulse {
      0% {
        scale: 0.95;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
      }
      70% {
        scale: 1;
        box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
      }
      100% {
        scale: 0.95;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }

    @keyframes installing {
      from {
        height: 0;
      }
      to {
        height: 100%;
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(-90deg) translate(27px) rotate(0);
        opacity: 1;
        visibility: visible;
      }
      99% {
        transform: rotate(270deg) translate(27px) rotate(270deg);
        opacity: 1;
        visibility: visible;
      }
      100% {
        opacity: 0;
        visibility: hidden;
      }
    }

    @keyframes installed {
      100% {
        width: 150px;
        border-color: rgb(35, 174, 35);
      }
    }

    @keyframes circleDelete {
      100% {
        opacity: 0;
        visibility: hidden;
      }
    }

    @keyframes showInstalledMessage {
      100% {
        opacity: 1;
        visibility: visible;
        right: 56px;
      }
    }
  `;
  return (
    <div className="container" css={innerStyle}>
      <label className="label">
        <input className="input" type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="circle">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="icon">
            <path
              d="M12 19V5m0 14-4-4m4 4 4-4"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
            />
          </svg>
          <div className="square" />
        </span>
        <p className="title">Download</p>
        <p className="title">Open</p>
      </label>
    </div>
  );
}
