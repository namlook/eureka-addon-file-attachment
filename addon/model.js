import Model from 'ember-eureka/model';

export default Model.extend({

    isImage: function() {
        return this.get('type').search(/^image/) > -1;
    }.property('type'),

    _getFileUrl: function(path) {
        if (path) {
            var dasherizedResource = path.split('/')[1];
            var fileName = path.split('/').slice(2).join('/');
            var url = this.get('meta.store.db.endpoint')+'/'+dasherizedResource+'/files/'+fileName;
            return url;
        }
    },

    url: function() {
        return this._getFileUrl(this.get('path'));
    }.property('path'),

    thumb: function() {
        return this._getFileUrl(this.get('thumbPath'));
    }.property('thumbPath')
});
