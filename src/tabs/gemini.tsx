import { Button, Flex, Input, Select, Spin } from 'antd';
import React, { useRef, useState } from 'react';

export default function Gemini() {
  const model = useRef<any>();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const onAsk = async () => {
    if (!question.trim()) {
      return;
    }
    setLoading(true);
    setAnswer('');
    if (!model.current) {
      model.current = await window.model.createTextSession();
    }
    model.current.prompt(question).then((data) => {
      setAnswer(data);
      setLoading(false);
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}>
      <h2>Gemini</h2>
      <Input.TextArea placeholder="请输入问题" onChange={(e) => setQuestion(e.target.value)} />
      <Flex justify="right" style={{ padding: '10px 5px' }}>
        <Button onClick={onAsk}>提问</Button>
      </Flex>
      <div>
        <Spin tip="Loading" size="small" spinning={loading}>
          <pre>
            <code>{answer}</code>
          </pre>
        </Spin>
      </div>
    </div>
  );
}
