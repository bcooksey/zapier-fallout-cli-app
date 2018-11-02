const _ = require('lodash');

const NewLocation = require('./triggers/location');

const getLocation = (z, bundle) => {
  let results = NewLocation.operation.perform(z, bundle);
  if (!results.then) {
    // Not a promise yet
    results = Promise.resolve(results);
  }
  return results.then((locations) => {
    return _.find(locations, (location) => {
      return location.id === bundle.inputData.id;
    });
  });
};

const getFile = (z, bundle) => {
  if (process.env.LIVE_CALLS) {
    const file = z.request({url: bundle.inputData.url});
    return file.then(response => z.stashFile(response.content));
  }

  return '';
};

module.exports = {
  getLocation,
  getFile
};
