/* eslint-disable no-unused-vars */

import { Storage } from '@plasmohq/storage';

export enum STORE_KEY {
  ROUTES = 'routes',
  LOADING = 'loading',
  GROUPS = 'groups',
  GROUPS_MAP = 'groupsMap',
  GLOBAL_CONFIG = 'globalConfig',
}

export enum globalSwitchConfig {
  MOCK = 'mock',
  COPY = 'copy',
  QR_CODE = 'qrCode',
  JSON_TO_TS = 'jsonToTs',
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
} & TYPE_GLOBAL_SWITCH_CONFIG;

const store = new Storage({
  area: 'sync',
  copiedKeyList: [],
});

const dataStore = new Storage({
  area: 'local',
  copiedKeyList: [],
});

dataStore.watch({
  [STORE_KEY.GROUPS]: (c) => {
    const map = {};
    (c?.newValue || []).forEach((element) => {
      map[element.value] = element.label;
    });
    dataStore.set(STORE_KEY.GROUPS_MAP, map);
  },
});

const initStore = async () => {
  store.set(STORE_KEY.GLOBAL_CONFIG, {
    [globalConfig.THEME]: 'light',
    [globalSwitchConfig.MOCK]: false,
    [globalSwitchConfig.COPY]: false,
  })
}

export default store;

export {
  store,
  dataStore,
  initStore,
}