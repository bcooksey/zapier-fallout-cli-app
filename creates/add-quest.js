const _ = require('lodash');

const { ApiUrl } = require('../constants');
const { generateId } = require('../utils');

const perform = (z, bundle) => {
  const item = {
    'id': generateId()
  };

  _.assign(item, bundle.inputData);

  if (process.env.LIVE_CALLS == 'true') {
    const responsePromise = z.request({
      method: 'PATCH',
      url: ApiUrl,
      body: JSON.stringify({
        action: 'list_push',
        data: {
          key: 'quests',
          location: 'tail',
          value: item
        }
      })
    });
    return responsePromise
      .then((response) => {
        return item;
      });
  }

  return item;
};

const computeAltPathFields = (z, bundle) => {
  if (bundle.inputData.hasAltPath === 'true') {
    // Note: Zapier doesn't currently support children on custom fields, so the
    // altRewards field won't render in the Editor
    return [{
      key: 'altConditions',
      label: 'Alternative Conditions',
      list: true,
      helpText: 'What is the alternative path the player can take?'
    }, {
      key: 'altRewards', label: 'Alternative Rewards', children: rewardFields
    }];
  }

  return [];
};

const rewardFields = [
  {key: 'desc'},
  {key: 'type', choices: {'xp': 'Experience', 'item': 'Item', 'caps': 'Caps'}},
  {key: 'quantity', type: 'integer'}
];

module.exports = {
  key: 'addQuest',
  noun: 'Quest',

  display: {
    label: 'Add Quest',
    description: 'Adds a Quest to your quest log',
    important: true
  },

  operation: {
    inputFields: [
      {key: 'title', required: true},
      {key: 'description', type: 'text', placeholder: 'In this quest...'},
      {key: 'locationId', label: 'Location', type: 'integer', dynamic: 'newLocation.id.name'},
      {key: 'conditions', list: true, helpText: 'What must a player do to complete the quest?'},
      {key: 'rewards', children: rewardFields},
      {key: 'hasAltPath', label: 'Has Alternate Path', type: 'boolean', default: 'no',
        helpText: 'Is there a secondary way to complete the quest?', altersDynamicFields: true},
      computeAltPathFields,
    ],
    perform: perform,
    sample: {
      id: 123,
      title: 'A Sample Quest'
    }
  }
};


