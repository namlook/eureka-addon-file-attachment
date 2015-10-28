import Widget from './widget-property-file-attachment-form';

export default Widget.extend({
    classNames: ['eureka-widget-property-multi-file-attachment-form'],

    maxFiles: 20,

    onfileUploaded: function(fileRecord) {
        fileRecord.save();
        this.get('field.values').pushObject(fileRecord);
    }
});