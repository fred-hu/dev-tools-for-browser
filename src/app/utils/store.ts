/* eslint-disable no-unused-vars */
import { Storage } from "@plasmohq/storage"

export enum STORE_KEY {
  ROUTES = 'routes',
  GLOBAL_SWITCH_CONFIG = 'globalSwitchConfig',
  LOADING = 'loading',
  GROUPS = 'groups',
  GROUPS_MAP = 'groupsMap',
}

export enum globalSwitchConfig {
  MOCK = 'mock',
  COPY = 'copy',
  JSON_TO_TS = 'jsonToTs',
}

export type TYPE_GLOBAL_SWITCH_CONFIG = {
  [globalSwitchConfig.MOCK]: boolean,
  [globalSwitchConfig.COPY]: boolean,
  [globalSwitchConfig.JSON_TO_TS]: boolean,
}

const store = new Storage({
  area: "sync",
  copiedKeyList: [],
})

store.watch({
  [STORE_KEY.GROUPS]: (c) => {
    const map = {};
    (c?.newValue || []).forEach(element => {
      map[element.value] = element.label
    });
    store.set(STORE_KEY.GROUPS_MAP, map)
  },
})

export default store