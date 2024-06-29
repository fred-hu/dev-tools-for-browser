/* eslint-disable no-unused-vars */
import { Storage } from "@plasmohq/storage"

export enum STORE_KEY {
  ROUTES = 'routes',
  GLOBAL_SWITCH_CONFIG = 'globalSwitchConfig',
  LOADING = 'loading',
  GROUPS = 'groups',
  GROUPS_MAP = 'groupsMap',
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