const { ApiUrl } = require('./constants');
const hydrators = require('./hydrators');

// Triggers
const NewLocation = require('./triggers/location');
const NewQuest = require('./triggers/quest');
const NewScreenshot = require('./triggers/screenshot')

// Actions
const CraftItem = require('./creates/craft-item');
const AddQuest = require('./creates/add-quest');
const AddLocation = require('./creates/add-location');
const UploadScreenshot = require('./creates/upload-screenshot');
const PopulateDb = require('./creates/populate-db');
const ClearDb = require('./creates/clear-db');
const FindQuest = require('./searches/quest');

// Middleware
const addApiKeyToHeader = (request, z, bundle) => {
  if (request.url && request.url.indexOf('store.zapier.com') > 0) {
    // We don't want to leak our secret to any old website
    request.headers['X-Secret'] = bundle.authData.apiKey;
  }
  return request;
};

const handleErrors = (response, z, bundle) => {
  response.throwForStatus();
  return response;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
    connectionLabel: 'Storage Key {{preview}}',
    type: 'custom',
    fields: [
      {key: 'apiKey', type: 'string', required: true, helpText: 'Visit [Zapier Storage](https://store.zapier.com/api/secret) to get a key'}
    ],
    test: (z, bundle) => {
      if (process.env.LIVE_CALLS == 'true') {
        const promise = z.request(ApiUrl);
        return promise.then((response) => {
          return {id: 123, preview: bundle.authData.apiKey.substr(0,5)};
        });
      } else {
        return {id: 123, preview: 'faked'};
      }
    }
  },

  beforeRequest: [
    addApiKeyToHeader
  ],

  afterResponse: [
    handleErrors
  ],

  hydrators: {
    getLocation: hydrators.getLocation,
    getFile: hydrators.getFile
  },

  resources: {
  },

  triggers: {
    [NewLocation.key]: NewLocation,
    [NewQuest.key]: NewQuest,
    [NewScreenshot.key]: NewScreenshot
  },

  searchOrCreates: {
    [FindQuest.key]: {
      key: FindQuest.key,
      display: {
        label: 'Find or Create a Quest',
        description: 'Searches for Quest by title'
      },
      search: FindQuest.key,
      create: AddQuest.key
    }
  },

  searches: {
    [FindQuest.key]: FindQuest,
  },

  creates: {
    [CraftItem.key]: CraftItem,
    [AddQuest.key]: AddQuest,
    [AddLocation.key]: AddLocation,
    [PopulateDb.key]: PopulateDb,
    [ClearDb.key]: ClearDb,
    [UploadScreenshot.key]: UploadScreenshot,
  }
};

module.exports = App;
