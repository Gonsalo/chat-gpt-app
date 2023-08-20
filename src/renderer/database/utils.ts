/* eslint-disable import/prefer-default-export */

import { settingsApi, chatsApi, messagesApi } from './api';

export const initApis = async () =>
  Promise.all([settingsApi, chatsApi, messagesApi].map((api) => api.init()));

export const instanceAsObject = <E>(instance: E) => ({
  ...instance,
});
