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
      method: 'POST',
      url: ApiUrl,
      body: JSON.stringify({'lastItem': item})
    });
    return responsePromise
      .then((response) => {
        return item;
      });
  }

  return item;
};

module.exports = {
  key: 'craftItem',
  noun: 'Item',

  display: {
    label: 'Craft Item',
    description: 'Craft an Item',
    important: true
  },

  operation: {
    inputFields: [
      {key: 'name', required: true},
      {key: 'itemType', label: 'Type', choices: ['Weapon', 'Armor', 'Food', 'Chemistry'], 'default': 'Armor'},
      {key: 'components', dict: true, helpText: 'Pairs of `component type`: `quantity`'},
    ],
    perform: perform,
    sample: {
      id: 1234,
      name: 'T-51 Power Armor',
      itemType: 'Armor'
    }
  }
};
