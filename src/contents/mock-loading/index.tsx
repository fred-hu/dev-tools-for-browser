import cssText from 'data-text:./index.scss' // 引入自身样式
import type { PlasmoCSConfig } from 'plasmo'
import React, { useEffect, useRef, useState } from 'react'

import { MESSAGE_TYPES } from '~app/constants'

export const config: PlasmoCSConfig = {
  matches: ['*://*/*'],
  run_at: 'document_start'
}

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

export default function Loading() {
  const [loading, setLoading] = useState(false)
  const timer = useRef(null)
  useEffect(() => {
    const callback = function (msg) {
      const { data } = msg
      const { payload, action } = data
      if (
        action === MESSAGE_TYPES.SET_LOADING &&
        (payload.secret === 'content-to-content' || payload.secret === 'xhr-to-content')
      ) {
        timer.current && clearTimeout(timer.current)
        timer.current = setTimeout(
          () => {
            setLoading(payload.data)
          },
          payload.data ? 0 : 800
        )
        if (payload?.route) {
          chrome.runtime.sendMessage(
            {
              action: MESSAGE_TYPES.SET_RECORD,
              payload: {
                secret: 'content-to-devtools',
                data: payload.route
              }
            },
            function (response) {
              console.log(response)
            }
          )
        }
      }
    }
    window.addEventListener('message', callback)
    return () => {
      window.removeEventListener('message', callback)
      if (timer.current) {
        timer.current = null
        clearTimeout(timer.current)
      }
    }
  }, [])

  return (
    <>
      {loading && (
        <div className="loader" onClick={() => setLoading(false)}>
          <div className="wrapper">
            <div className="text">MOCKING</div>
            <div className="box" />
          </div>
        </div>
      )}
    </>
  )
}
