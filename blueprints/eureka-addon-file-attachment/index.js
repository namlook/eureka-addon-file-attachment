module.exports = {
  description: '',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackagesToProject([
        {name: 'dropzone', target: '~4.2.0'},
        {name: 'mimoza', target: '1.0.0'}
    ]);
  }
};
