module.exports = {
  description: '',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('dropzone', '~4.0.1');
  }
};
