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

  it('should craft an item', (done) => {
    const bundle = _.assign(basicBundle, {
      inputData: {
        name: 'A New Item' 
      }
    });
    
    appTester(App.creates.craftItem.operation.perform, bundle)
    .then(result => {
      result.id.should.above(0);
      result.name.should.equal('A New Item');
      done();
    })
    .catch(done);
  });

  it('should add a quest', (done) => {
    const bundle = _.assign(basicBundle, {
      inputData: {
        title: 'A Test Quest (atom)'
      }
    });
    
    appTester(App.creates.addQuest.operation.perform, bundle)
    .then(result => {
      result.id.should.above(0);
      result.title.should.equal('A Test Quest (atom)');
      done();
    })
    .catch(done);
  });

  it('should add a location', (done) => {
    const bundle = _.assign(basicBundle, {
      inputData: {
        name: 'A New Location' 
      }
    });
    
    appTester(App.creates.addLocation.operation.perform, bundle)
    .then(result => {
      result.id.should.above(0);
      result.name.should.equal('A New Location');
      done();
    })
    .catch(done);
  });

  it('should upload a screenshot', (done) => {
    const bundle = _.assign(basicBundle, {
      inputData: {
        name: 'A New Screenshot',
        file: 'https://cdn.zapier.com/storage/photos/c2f8a3c482c7a559eb8e7bf754885e40.jpg'
      }
    });

    appTester(App.creates.uploadScreenshot.operation.perform, bundle)
    .then(result => {
      result.id.should.above(0);
      result.name.should.equal('A New Screenshot');
      done();
    })
    .catch(done);
  });
});
