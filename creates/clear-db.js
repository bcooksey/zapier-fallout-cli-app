const _ = require('lodash');

const { ApiUrl } = require('../constants');

const AddLocation = require('./add-location');
const AddQuest = require('./add-quest');

const dataGenerators = require('../data-generators');

const perform = (z, bundle) => {
  if (process.env.LIVE_CALLS == 'true') {
    return z.request({
      url: ApiUrl, 
      method: 'DELETE'
    }).then((response) => {
      return {status: 'success'}; 
    });
  }

  return {status: 'success'};
};

module.exports = {
  key: 'clearDb',
  noun: 'Record',

  display: {
    label: 'Clear Storage DB',
    description: 'Clears out existing data in your DB',
    important: false
  },

  operation: {
    perform: perform
  }
};


