import Dropzone from './dropzone';
import Ember from 'ember';

export default Ember.Mixin.create({
    acceptedMimeTypes: null,
    maxFilesize: 250, // in MB
    maxFiles: 20,
    _dropzone: null,

    url: function() {
        return this.get('store.resourceEndpoint') + '/files';
    }.property('store.resourceEndpoint'),

    /** fired when the file model has been created.
     * take the file model in parameter
     */
    onfileUploaded: Ember.required,

    insertDropzone: function() {
        var that = this;
        var dropozone = new Dropzone(this.$('.dropzone')[0], {
            url: this.get('url'),
            autoProcessQueue: true,
            maxFiles: this.get('maxFiles'),
            addRemoveLinks: true,
            // dictRemoveFile: 'reeeeemove',
            previewTemplate: this.$('.dz-template').html(),
            maxFilesize: this.get('maxFilesize'),
        //       acceptedFiles: this.get('acceptedMimeTypes'),
            success: function(file, res){
                if (file.previewElement) {
                    file.previewElement.classList.add("dz-success");
                }

                var record = {
                    title: file.name,
                    size: file.size,
                    path: res.path,
                    thumbPath: res.thumbPath,
                    type: file.type,
                    lastModified: file.lastModifiedDate
                };

                var fileRecord = that.get('store.db')['File'].createRecord(record);
                that.onfileUploaded(fileRecord);
                this.removeFile(file);
            },
            maxfilesexceeded: function(file, bla, foo) {
                console.log('maxfilesexceeded>>>', file, bla, foo);
            }
        });
        this.set('_dropzone', dropozone);

    }.on('didInsertElement'),

});