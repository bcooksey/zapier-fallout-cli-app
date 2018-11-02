require('should');

const _ = require('lodash');

const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(require('../index'));

describe('My App', () => {
  const basicBundle = {
    authData: {
      apiKey: process.env.API_KEY
    }
  };

  it('should find a quest', (done) => {
    const bundle = _.assign(basicBundle, {
      inputData: {
        title: 'atom' 
      }
    });

    appTester(App.searches.findQuest.operation.perform, basicBundle)
    .then(results => {
      results.length.should.above(0);
      done();
    })
    .catch(done);
  });

});
