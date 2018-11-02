const _ = require('lodash');

const { ApiUrl } = require('../constants');
const { generateQuests } = require('../data-generators');
const { getValueFromStoreKey } = require('../utils');

const perform = (z, bundle) => {
  let responsePromise;
  if (process.env.LIVE_CALLS == 'true') {
    responsePromise = z.request({
      method: 'GET',
      url: ApiUrl,
      params: {key: 'quests'}
    }).then((response) => {
      const data = JSON.parse(response.content);
      return getValueFromStoreKey(data, 'quests');
    });
  } else {
    responsePromise = Promise.resolve(generateQuests())
  }

  return responsePromise.then((quests) => {
    const title = bundle.inputData.title.toLowerCase();
    return _.filter(quests, (quest) => {
      if (quest.title.toLowerCase().indexOf(title) >= 0) {
        return true;
      }
      return false;
    });
  });
};

module.exports = {
  key: 'findQuest',
  noun: 'Quest',

  display: {
    label: 'Find Quest',
    description: 'Finds a Quest in your quest log.'
  },

  operation: {
    inputFields: [
      {key: 'title', type: 'string', required: true},
    ],
    perform: perform,
    sample: {
      id: 123,
      title: 'A Sample Quest'
    }
  }
};
