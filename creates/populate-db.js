const _ = require('lodash');

const { ApiUrl } = require('../constants');

const AddLocation = require('./add-location');
const AddQuest = require('./add-quest');

const dataGenerators = require('../data-generators');

const perform = (z, bundle) => {

  // Add Quests
  _.each(dataGenerators.generateQuests(), (quest) => {
    bundle.inputData = quest;
    AddQuest.operation.perform(z, bundle);
  });

  // Add Locations
  _.each(dataGenerators.generateLocations(), (location) => {
    bundle.inputData = location;
    AddLocation.operation.perform(z, bundle);
  });

  return {status: 'success'};
};

module.exports = {
  key: 'populateDb',
  noun: 'Record',

  display: {
    label: 'Populate Storage DB',
    description: 'Populates your DB with example data',
    important: false
  },

  operation: {
    perform: perform
  }
};


