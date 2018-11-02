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

  it('should see new locations', (done) => {
    appTester(App.triggers.newLocation.operation.perform, basicBundle)
    .then(results => {
      results.length.should.above(0);
      done();
    })
    .catch(done);
  });

  it('should see new quests', (done) => {
    const bundle = _.assign(basicBundle, {
      inputData: {
        shouldHydrate: true
      }
    });

    appTester(App.triggers.newQuest.operation.perform, bundle)
    .then(results => {
      results.length.should.above(0);
      done();
    })
    .catch(done);
  });

  it('should return screenshots', (done) => {
    appTester(App.triggers.newScreenshot.operation.perform, basicBundle)
    .then(results => {
      results.length.should.above(0);
      done();
    })
    .catch(done);
  });

  it('should hydrate a screenshot', (done) => {
    const bundle = _.assign(basicBundle, {
      inputData: {
        url: 'https://cdn.zapier.com/storage/photos/c2f8a3c482c7a559eb8e7bf754885e40.jpg'
      }
    });

    appTester(App.hydrators.getFile, bundle)
    .then(result => {
      if (process.env.LIVE_CALLS) {
        result.should.containEql('s3.amazonaws.com/cli-platform/');
      }

      done();
    })
    .catch(done);
  });
});
