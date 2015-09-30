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
            if (file.get('isFulfilled')) { // handle promise proxy
                file = file.get('content');
            }

            file.save().then(function() {
                file.set('_ui.editing', false);
            });
        },
        remove: function(file) {
            if (file.get('isFulfilled')) { // handle promise proxy
                file = file.get('content');
            }

            var model = this.get('model');
            var field = this.get('field');

            file.delete().then(function(){
                if (field.get('meta.isMulti')) {
                    var obj = field.get('values').findBy('_id', file.get('_id'));
                    field.get('values').removeObject(obj);
                } else {
                    field.set('value', null);
                }
            }).then(function() {
                return model.save();
            });
        }
    },

    fileFormWidgetConfig: Ember.computed(function() {
        return {fields: ['title', 'description']};
    }),


    onfileUploaded: function(fileRecord) {
        this.set('field.value', fileRecord);
    }

});