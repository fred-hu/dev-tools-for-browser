/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface IProps {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value?: boolean) => void;
}
/**
 * turn-switch组件
 * @param {checked} boolean - 是否选中
 * @returns React.ReactElement
 */
export default function TurnSwitch(props: IProps): React.ReactElement {
  const { onChange, checked } = props;
  const [id] = useState(`${Math.random()}`);
  const innerStyle = css`
    .switch {
      display: none;
    }
    .switch + label {
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      color: #78768d;
      cursor: pointer;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 12px;
      line-height: 15px;
      position: relative;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .switch + label::before,
    .switch + label::after {
      content: '';
      display: block;
    }
    .switch + label::before {
      background-color: #05012c;
      border-radius: 500px;
      height: 15px;
      margin-right: 8px;
      -webkit-transition: background-color 0.125s ease-out;
      transition: background-color 0.125s ease-out;
      width: 25px;
    }
    .switch + label::after {
      background-color: #fff;
      border-radius: 13px;
      box-shadow:
        0 3px 1px 0 rgba(37, 34, 71, 0.05),
        0 2px 2px 0 rgba(37, 34, 71, 0.1),
        0 3px 3px 0 rgba(37, 34, 71, 0.05);
      height: 13px;
      left: 1px;
      position: absolute;
      top: 1px;
      -webkit-transition: -webkit-transform 0.125s ease-out;
      transition: -webkit-transform 0.125s ease-out;
      transition: transform 0.125s ease-out;
      transition:
        transform 0.125s ease-out,
        -webkit-transform 0.125s ease-out;
      width: 13px;
    }
    .switch + label .switch-x-text {
      display: block;
      margin-right: 0.3em;
    }
    .switch + label .switch-x-toggletext {
      display: block;
      font-weight: bold;
      height: 15px;
      overflow: hidden;
      position: relative;
      width: 18px;
    }
    .switch + label .switch-x-unchecked,
    .switch + label .switch-x-checked {
      left: 0;
      position: absolute;
      top: 0;
      -webkit-transition:
        opacity 0.125s ease-out,
        -webkit-transform 0.125s ease-out;
      transition:
        opacity 0.125s ease-out,
        -webkit-transform 0.125s ease-out;
      transition:
        transform 0.125s ease-out,
        opacity 0.125s ease-out;
      transition:
        transform 0.125s ease-out,
        opacity 0.125s ease-out,
        -webkit-transform 0.125s ease-out;
    }
    .switch + label .switch-x-unchecked {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
    .switch + label .switch-x-checked {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    .switch + label .switch-x-hiddenlabel {
      position: absolute;
      visibility: hidden;
    }

    .switch:checked + label::before {
      background-color: #ffb500;
    }

    .switch:checked + label::after {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }

    .switch:checked + label .switch-x-unchecked {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }

    .switch:checked + label .switch-x-checked {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
    * {
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }
  `;
  const Div = styled.div`
    ${innerStyle}
  `;
  return (
    <Div onClick={(e) => e.stopPropagation()}>
      <input
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        id={id}
        name={id}
        type="checkbox"
        className="switch"
      />
      <label htmlFor={id}>
        {/* <span className="switch-x-text">This is </span> */}
        <span className="switch-x-toggletext">
          <span className="switch-x-unchecked">
            <span className="switch-x-hiddenlabel">Unchecked: </span>Off
          </span>
          <span className="switch-x-checked">
            <span className="switch-x-hiddenlabel">Checked: </span>On
          </span>
        </span>
      </label>
    </Div>
  );
}
