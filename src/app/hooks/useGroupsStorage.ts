import { useStorage } from '@plasmohq/storage/hook';

import { GROUP_KEY } from '~app/constants/group';
import type { GROUP_ITEM } from '~app/constants/group';
import { STORE_KEY } from '~app/utils/store';

// eslint-disable-next-line no-unused-vars
type Setter<T> = ((v?: T, isHydrated?: boolean) => T) | T;
// eslint-disable-next-line no-unused-vars
function useGroupsStorage(): [GROUP_ITEM[], (setter: Setter<GROUP_ITEM[]>) => Promise<void>] {
  const [groups, setGroups] = useStorage(STORE_KEY.GROUPS, (groups: GROUP_ITEM[]) =>
    typeof groups === 'undefined' || !groups?.length
      ? [{ [GROUP_KEY.LABEL]: '默认分组', [GROUP_KEY.VALUE]: '', [GROUP_KEY.CLOSABLE]: false, [GROUP_KEY.ORDER]: 0 }]
      : groups
  );

  return [groups, setGroups];
}

export default useGroupsStorage;
