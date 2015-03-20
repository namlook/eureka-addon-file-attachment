import Ember from 'ember';
import DropzoneMixin from './mixin';
import WidgetProperty from 'ember-eureka/widget-property';

export default WidgetProperty.extend(DropzoneMixin, {
    classNames: ['eureka-widget-property-file-attachment-form'],

    maxFiles: 1,

    autosuggestEnabled: Ember.computed.alias('config.autosuggest'),

    actions: {
        edit: function(file) {
            file.set('_ui.editing', true);
        },
        cancel: function(file) {
            file.set('_ui.editing', false);
        },
        save: function(file) {
            file.save().then(function() {
                file.set('_ui.editing', false);
            });
        },
        remove: function(file) {
            // TODO file.delete(function(){
                this.set('field.value', null);
            // });
        }
    },

    fileFormWidgetConfig: function() {
        return {fields: ['title', 'description']};
    }.property(),


    onfileUploaded: function(fileRecord) {
        this.set('field.value', fileRecord);
    }

});