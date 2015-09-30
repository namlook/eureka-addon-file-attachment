import Model from 'ember-eureka/model';
import Ember from 'ember';

export default Model.extend({

    isImage: Ember.computed('type', function() {
        return this.get('type').search(/^image/) > -1;
    }),

    _filesEndpoint: Ember.computed('meta.store.db.endpoint', function() {
        return this.get('meta.store.db.endpoint')+'/_files';
    }),

    url: Ember.computed('_filesEndpoint', 'path', function() {
        return this.get('_filesEndpoint')+this.get('path');
    }),

    thumb: Ember.computed('_filesEndpoint', 'thumbPath', function() {
        return this.get('_filesEndpoint')+this.get('thumbPath');
    })
});
