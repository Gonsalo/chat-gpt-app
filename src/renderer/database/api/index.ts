import ChatsApi from './chats/api';
import MessagesApi from './messages/api';
import SettingsApi from './settings/api';

export const settingsApi = new SettingsApi();
export const chatsApi = new ChatsApi();
export const messagesApi = new MessagesApi();
