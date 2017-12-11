exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../specs/e2e.js'],

  baseUrl: '',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 100000
  },

  suites: {
    e2e: ['../specs/e2e.js'],
    sanity: ['../specs/sanity.js'],
    everything: ['../specs/e2e.js', '../specs/sanity.js']
  }

};
