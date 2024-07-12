import { Button, Input, QRCode, Space, theme } from 'antd';
import React, { useEffect } from 'react';

import { MESSAGE_TYPES } from '~app/constants';

const { useToken } = theme;

const App: React.FC = () => {
  const [text, setText] = React.useState('');
  const { token } = useToken();

  function doDownload(url: string, fileName: string) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  const downloadCanvasQRCode = () => {
    const canvas = document.getElementById('qrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      doDownload(url, 'QRCode.png');
    }
  };
  useEffect(() => {
    chrome.runtime?.id &&
      chrome.runtime.sendMessage(
        {
          action: MESSAGE_TYPES.SET_QR_CODE_READY,
          payload: {
            secret: 'qrcode-to-popup',
            data: true,
          },
        },
        function (response) {
          setText(response?.data ?? '');
        }
      );

    const callback = (request, sender, sendResponse) => {
      request?.data && setText(request.data);
    };
    chrome.runtime.id && chrome.runtime.onMessage.addListener(callback);
    return () => {
      chrome.runtime.id && chrome.runtime.onMessage.removeListener(callback);
    };
  }, []);
  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }} id="qrcode">
      <Input.TextArea
        placeholder="请输入二维码内容"
        rows={5}
        style={{ width: '350px' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <>
          <QRCode value={text || '-'} color={token.colorInfoText} bgColor={token.colorBgLayout} />
        </>
      )}
      <Button type="primary" disabled={!text} onClick={downloadCanvasQRCode}>
        Download
      </Button>
    </Space>
  );
};

export default App;
