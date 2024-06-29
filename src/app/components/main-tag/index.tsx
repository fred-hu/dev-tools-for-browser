/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"

import style from "./index.module.scss"

interface IProps {
  children?: React.ReactElement
}
/**
 * MainTag组件
 * @param {children} React.ReactElement - 子元素
 * @returns React.ReactElement
 */
export default function MainTag(props: IProps): React.ReactElement {
  const buttonStyle = css`
    background-color: transparent;
    button {
      outline: none;
    }
  `
  return (
    <div css={buttonStyle}>
      <button className={style.button} role="button">
        {props.children}
      </button>
    </div>
  )
}
