const _ = require('lodash');

const { ApiUrl } = require('../constants');
const { getValueFromStoreKey } = require('../utils');

const { getLocation } = require('../hydrators');

const { generateQuests } = require('../data-generators');

const perform = (z, bundle) => {
  if (process.env.LIVE_CALLS == 'true') {
    const responsePromise = z.request({
      method: 'GET',
      url: ApiUrl,
      params: {key: 'quests'}
    });
    return responsePromise
      .then((response) => {
        const data = JSON.parse(response.content);
        const quests = getValueFromStoreKey(data, 'quests');
        if (bundle.inputData.shouldHydrate) {
          quests.forEach((quest) => {
            quest.location = z.dehydrate(getLocation, {id: quest.locationId});
          });
        }
        return quests;
      });
  }

  return generateQuests();
};

module.exports = {
  key: 'newQuest',
  noun: 'Quest',
  display: {
    label: 'New Quest',
    description: 'Triggers when a new quest is added to your quest log.'
  },
  operation: {
    inputFields: [
      {key: 'shouldHydrate', label: 'Include Location Details?', type: 'boolean', 'default': 'yes'}
    ],
    perform: perform,
    outputFields: [
      {key: 'id'},
      {key: 'title'},
    ],
    sample: {
      id: 123,
      title: 'A Sample Quest'
    }
  }
};
