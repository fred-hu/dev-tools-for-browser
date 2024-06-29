import React from 'react';
import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

function IndexOptions(): React.ReactElement  {
  const [data, setData] = useState("")
  const [openCount] = useStorage<number>("open-count")
  const [checked] = useStorage<boolean>("checked")
  const [serialNumber] = useStorage<string>("serial-number")
  const [hailingFrequency] = useStorage("hailing")
  return (
    <div
      style={{
        padding: 16,
        minWidth: 400
      }}>
      <h2>这是配置页面options</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16
        }}>
        <p>Times opened: {openCount}</p>
        <input
          type={"checkbox"}
          readOnly
          checked={checked === undefined ? true : checked}
        />
        <i>#{serialNumber || 0}</i>
      </div>
      <div>hailingFrequency: {hailingFrequency}</div>
    </div>
  )
}

export default IndexOptions
