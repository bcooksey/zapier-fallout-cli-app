const _ = require('lodash');

const { ApiUrl } = require('../constants');
const { generateId } = require('../utils');

const perform = (z, bundle) => {
  const item = {
    'id': generateId()
  };

  _.assign(item, bundle.inputData);

  if (process.env.LIVE_CALLS == 'true') {
    return z.request(bundle.inputData.file).then((fileResponse) => {
      item.leadingBytes = fileResponse.content.substr(0, 10);
      return z.request({
        method: 'POST',
        url: ApiUrl,
        body: JSON.stringify({'lastScreenshot': item})
      }).then((response) => {
        return item;
      });
    });
  } else {
    item.leadingBytes = 'bha80hais';
  }

  return item;
};

module.exports = {
  key: 'uploadScreenshot',
  noun: 'File',

  display: {
    label: 'Upload Screenshot',
    description: 'Uploads a screenshot'
  },

  operation: {
    inputFields: [
      {key: 'name', type: 'string', required: true},
      {key: 'file', type: 'file', required: true}
    ],
    perform: perform,
    sample: {
      id: 123
    }
  }
};
