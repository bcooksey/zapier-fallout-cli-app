const _ = require('lodash');

const { ApiUrl } = require('../constants');

const { getFile } = require('../hydrators');

const perform = (z, bundle) => {
  const results = [
    {'id': 1, 'url': 'https://cdn.zapier.com/storage/photos/1abb63af26d215e0800584e28d3a0174.jpg', 'size': 'small'},
    {'id': 2, 'url': 'https://cdn.zapier.com/storage/photos/207ce0a9a33306fbe59d0692db98de14.jpg', 'size': 'medium'},
    {'id': 3, 'url': 'https://cdn.zapier.com/storage/photos/b28e9628e9a3a65a21d1823d9dc45d4f.jpg', 'size': 'big'},
  ];

  return results.map((result) => {
    result.file = z.dehydrate(getFile, {url: result.url});
    return result;
  });
};

module.exports = {
 key: 'newScreenshot',
 noun: 'File',
 display: {
   label: 'New Screenshot',
   description: 'Triggers when a new screenshot is added.'
 },
 operation: {
   perform: perform,
   sample: {
     id: 123
   }
 }
};
