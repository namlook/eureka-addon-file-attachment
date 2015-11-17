/* jshint node: true */
'use strict';

module.exports = {
  name: 'eureka-addon-file-attachment',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/dropzone/dist/dropzone.js');
    app.import(app.bowerDirectory + '/dropzone/dist/basic.css');
    app.import(app.bowerDirectory + '/dropzone/dist/dropzone.css');

    app.import(app.bowerDirectory + '/mimoza/dist/mimoza.js');

    app.import('./vendor/addon.css');
  }
};
