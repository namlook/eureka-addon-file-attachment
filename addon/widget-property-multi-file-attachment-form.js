import Widget from './widget-property-file-attachment-form';

export default Widget.extend({
    classNames: ['eureka-widget-property-multi-file-attachment-form'],

    maxFiles: 20,

    actions: {
        remove: function(file) {
            // TODO file.delete(function(){
                this.get('field.values').removeObject(file);
            // });
        }
    },

    onfileUploaded: function(fileRecord) {
        this.get('field.values').pushObject(fileRecord);
    }
});