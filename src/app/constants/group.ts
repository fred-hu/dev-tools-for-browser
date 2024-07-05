/* eslint-disable no-unused-vars */
export enum GROUP_KEY {
  LABEL = 'label',
  VALUE = 'value',
  ORDER = 'order',
  CLOSABLE = 'closable',
}
export type GROUP_ITEM = {
  [GROUP_KEY.LABEL]: string;
  [GROUP_KEY.VALUE]: string;
  [GROUP_KEY.ORDER]: number | undefined;
  [GROUP_KEY.CLOSABLE]: boolean;
};
export default {
  GROUP_KEY,
};
