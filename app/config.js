export default {
  apiUrl: 'https://qjzd.net/api/v1',
  navJson: [
    { channel: 'index', text: '首页', to: '/' }
  ],
  tabJson: [
    { name: 'share', cnName: '分享' },
    { name: 'ask', cnName: '问答' },
    { name: 'coder', cnName: '码农' },
    { name: 'shoot', cnName: '摄影' },
    { name: 'bike', cnName: '单车' },
    { name: 'talk', cnName: '聊聊' },
    { name: 'love', cnName: '爱情' }
  ],

  getTab(tabName) {
    for (const tab of this.tabJson) {
      if (tab.name === tabName) {
        return tab;
      }
    }
    return { name: 'unkown', cnName: '未知' };
  }
};
