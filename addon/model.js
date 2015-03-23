import Model from 'ember-eureka/model';

export default Model.extend({

    isImage: function() {
        return this.get('type').search(/^image/) > -1;
    }.property('type'),

    _filesEndpoint: function() {
        return this.get('meta.store.db.endpoint')+'/_files';
    }.property('meta.store.db.endpoint'),

    url: function() {
        return this.get('_filesEndpoint')+this.get('path');
    }.property('_filesEndpoint', 'path'),

    thumb: function() {
        return this.get('_filesEndpoint')+this.get('thumbPath');
    }.property('_filesEndpoint', 'thumbPath')
});
