import React, { useState } from 'react';

import { useStorage } from '@plasmohq/storage/hook';

import Provider from '~app/components/provider';

function IndexOptions(): React.ReactElement {
  return (
    <Provider>
      <div
        style={{
          padding: 16,
          minWidth: 400,
        }}>
        <h2>dev tools</h2>
      </div>
    </Provider>
  );
}

export default IndexOptions;
