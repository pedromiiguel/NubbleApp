import {MMKV} from 'react-native-mmkv';

import {Storage} from '../storage';

const MMKVIntance = new MMKV();

export const MMKVStorage: Storage = {
  getItem: async key => {
    const item = await MMKVIntance.getString(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return null;
    }
  },
  setItem: async (key, value) => {
    await MMKVIntance.set(key, JSON.stringify(value));
  },
  removeItem: async key => {
    await MMKVIntance.delete(key);
  },
};
