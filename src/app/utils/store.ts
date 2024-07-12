/* eslint-disable no-unused-vars */

import { Storage } from '@plasmohq/storage';

export enum STORE_KEY {
  ROUTES = 'routes',
  GLOBAL_SWITCH_CONFIG = 'globalSwitchConfig',
  LOADING = 'loading',
  GROUPS = 'groups',
  GROUPS_MAP = 'groupsMap',
  GLOBAL_CONFIG = 'globalConfig',
}

export enum globalSwitchConfig {
  MOCK = 'mock',
  COPY = 'copy',
  JSON_TO_TS = 'jsonToTs',
  QR_CODE = 'qrCode',
}

export enum globalConfig {
  THEME = 'theme',
}

export type TYPE_GLOBAL_SWITCH_CONFIG = {
  [globalSwitchConfig.MOCK]?: boolean;
  [globalSwitchConfig.COPY]?: boolean;
};

export type TYPE_GLOBAL_CONFIG = {
  [globalConfig.THEME]?: 'dark' | 'light' | '';
};

const store = new Storage({
  area: 'sync',
  copiedKeyList: [],
});

store.watch({
  [STORE_KEY.GROUPS]: (c) => {
    const map = {};
    (c?.newValue || []).forEach((element) => {
      map[element.value] = element.label;
    });
    store.set(STORE_KEY.GROUPS_MAP, map);
  },
});

const initStore = async () => {
  store.set(STORE_KEY.GLOBAL_SWITCH_CONFIG, {
    [globalSwitchConfig.MOCK]: false,
    [globalSwitchConfig.COPY]: false,
  })
  store.set(STORE_KEY.GLOBAL_CONFIG, {
    [globalConfig.THEME]: 'light',
  })
}

export default store;

export {
  store,
  initStore,
}