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
          key: 'locations',
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

module.exports = {
  key: 'addLocation',
  noun: 'Location',

  display: {
    label: 'Discover Location',
    description: 'Adds a Location to your map',
    important: true
  },

  operation: {
    inputFields: [
      {key: 'name', required: true},
      {key: 'leader'},
      {key: 'factions', list: true},
      {key: 'hasMerchants', type: 'boolean'}
    ],
    perform: perform,
    sample: {
      id: 123,
      name: 'A Sample Location'
    }
  }
};


