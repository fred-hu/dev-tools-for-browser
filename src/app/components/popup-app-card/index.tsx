/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, Divider, Drawer, Flex, Popover, Space, Spin, Tooltip } from 'antd'
import React from 'react'

import Turn from '~app/components/turn-switch'

import defaultSvg from '/assets/svg/defaultAppIcon.svg'
import setting from '/assets/svg/setting.svg'

interface IProps {
  loading?: boolean
  children?: React.ReactElement
  name?: string
  description?: string
  backgroundColor?: string
  color?: string
  icon?: React.ReactElement
  width?: string
  height?: string
  settingIcon?: boolean // 是否展示setting按钮
  clickable?: boolean // 是否可直接点击
  showSwitch?: boolean // 是否展示开关
  onClick?: () => void
  enable?: boolean
  // eslint-disable-next-line no-unused-vars
  onEnableChange?: (value?: boolean) => void
}
/**
 * AppCard组件
 * @param {children} React.ReactElement - 子元素
 * @returns React.ReactElement
 */
export default function AppCard(props: IProps): React.ReactElement {
  const {
    name,
    description,
    backgroundColor,
    color,
    icon,
    width,
    height,
    loading,
    onClick,
    enable = false,
    clickable = false, // 是否可直接点击
    settingIcon = false, // 是否展示setting按钮
    showSwitch = true,
    onEnableChange = () => {}
  } = props
  const innerStyle = css`
    border-radius: 10px;
    width: ${width || '110px'};
    height: ${height || '100px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background: ${backgroundColor};
    padding-top: 15px;
    box-sizing: border-box;
    position: relative;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.1),
      0 6px 20px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;
    :hover {
      cursor: ${clickable ? 'pointer' : 'default'};
      transform: scale(1.02);
      box-shadow:
        0 8px 16px rgba(0, 0, 0, 0.2),
        0 12px 30px rgba(0, 0, 0, 0.16);
      transition: all 300ms ease-in-out;
    }

    .title {
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      margin-top: 5px;
      display: inline-block;
      margin-bottom: 5px;
      height: 20px;
    }
    .text {
      font-size: 12px;
      font-family: inherit;
      font-weight: 600;
      opacity: 0.8;
      color: ${color || 'rgba(149, 149, 255, 1)'};
    }
    .popup {
      display: flex;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      opacity: 0;
      position: absolute;
      bottom: 0;
      height: 25px;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 0 0 10px 10px;
      width: 100%;
      transition: all 500ms ease-in-out;
    }
    :hover {
      .popup {
        opacity: 1;
      }
      .setting {
        opacity: 1;
      }
    }
    .setting {
      display: flex;
      position: absolute;
      transition: all 500ms ease-in-out;
      right: 0;
      top: 0;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-top-right-radius: 10px;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 0;
      border-top-left-radius: 0;
      width: 28px;
      height: 26px;
      justify-content: center;
      align-items: center;
      opacity: 0;
      img {
        :hover {
          cursor: pointer;
        }
      }
    }
    * {
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }
  `
  return (
    <div className="item item--1" css={innerStyle} onClick={clickable ? onClick : undefined}>
      {settingIcon && (
        <div className="setting">
          <img src={setting} width={20} onClick={onClick} />
        </div>
      )}
      {icon || <img src={defaultSvg} alt="default" />}
      <span className="title"> {name} </span>
      <span className="text"> {description} </span>
      {showSwitch && (
        <div className="popup">
          {loading ? <Spin size="small" /> : <Turn checked={enable} onChange={(v) => onEnableChange(v)} />}
        </div>
      )}
    </div>
  )
}
