/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"

interface IProps {
  checked?: boolean
  // eslint-disable-next-line no-unused-vars
  onChange: (value?: boolean) => void
}
/**
 * slider-switch组件
 * @param {checked} boolean - 是否选中
 * @returns React.ReactElement
 */
export default function SliderSwitch(props: IProps): React.ReactElement {
  const { checked, onChange } = props
  const innerStyle = css`
    --input-focus: #2d8cf0;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
    --input-out-of-focus: #ccc;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 70px;
    height: 36px;
    transform: translateX(calc(50% - 10px));
    .toggle {
      opacity: 0;
    }

    .slider {
      box-sizing: border-box;
      border-radius: 100px;
      border: 2px solid var(--main-color);
      box-shadow: 4px 4px var(--main-color);
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--input-out-of-focus);
      transition: 0.3s;
    }

    .slider:before {
      content: "off";
      box-sizing: border-box;
      height: 30px;
      width: 30px;
      position: absolute;
      left: 2px;
      bottom: 1px;
      border: 2px solid var(--main-color);
      border-radius: 100px;
      background-color: var(--bg-color);
      color: var(--main-color);
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      line-height: 25px;
      transition: 0.3s;
    }

    .toggle:checked + .slider {
      background-color: var(--input-focus);
      // transform: translateX(-32px);
    }

    .toggle:checked + .slider:before {
      content: "on";
      transform: translateX(32px);
    }
  `
  return (
    <label className="switch" css={innerStyle}>
      <input checked={checked} type="checkbox" className="toggle" onChange={(e) => onChange(e.target.checked)} />
      <span className="slider" />
      <span className="card-side" />
    </label>
  )
}
