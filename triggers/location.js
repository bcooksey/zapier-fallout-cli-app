const _ = require('lodash');

const { ApiUrl } = require('../constants');
const { getValueFromStoreKey } = require('../utils');
const { generateLocations } = require('../data-generators');

const perform = (z, bundle) => {
  if (process.env.LIVE_CALLS == 'true') {
    const responsePromise = z.request({
      method: 'GET',
      url: ApiUrl,
      params: {key: 'locations'}
    });
    return responsePromise
      .then((response) => {
        const data = JSON.parse(response.content);
        return getValueFromStoreKey(data, 'locations');
      });
  }

  return generateLocations();
};

module.exports = {
  key: 'newLocation',
  noun: 'Location',
  display: {
    label: 'New Location',
    description: 'Triggers when a new location is discovered.'
  },
  operation: {
    perform: perform,
    outputFields: [
      {key: 'id'},
      {key: 'name'},
    ],
    sample: {
      id: 123,
      name: 'A Sample Location'
    }
  }
};
