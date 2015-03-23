import Dropzone from './dropzone';
import Ember from 'ember';

export default Ember.Mixin.create({
    acceptedMimeTypes: null,
    maxFilesize: 250, // in MB
    maxFiles: 20,
    autoProcessQueue: false,
    _dropzone: null,

    url: function() {
        return this.get('store.resourceEndpoint') + '/files';
    }.property('store.resourceEndpoint'),

    /** fired when the file model has been created.
     * take the file model in parameter
     */
    onfileUploaded: Ember.required,


    /** returns the dropzone's accept function **/
    dropzoneAccept: function() {
        var model = this.get('model');
        return function(file, done) {
            // 'this' represent the dropzone context here
            done();
            var dzContext = this;
            var scheduledFn = function() {
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    dzContext.processQueue();
                    dzContext.on('queuecomplete', function() {
                        Ember.run.next(function() {
                            return resolve();
                        });
                    });
                    dzContext.on('error', function(error, bla) {
                        console.log('error>', error, bla);
                        Ember.run.next(function() {
                            return reject(error);
                        });
                    });
                });
            };
            model._scheduleFor('save', 'uploadFiles', scheduledFn);
        };
    },

    dropzoneSuccess: function() {
        var that = this;
        return function(file, res){
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

            var dzContext = this;
            var fileRecord = that.get('store.db')['File'].createRecord(record);
            that.onfileUploaded(fileRecord);

            dzContext.removeFile(file);
            Ember.run.next(function() {
                dzContext.processQueue();
            });
        };
    },

    _insertDropzone: function() {
        var dropozone = new Dropzone(this.$('.dropzone')[0], {
            url: this.get('url'),
            autoProcessQueue: this.get('autoProcessQueue'),
            maxFiles: this.get('maxFiles'),
            addRemoveLinks: true,
            // dictRemoveFile: 'reeeeemove',
            previewTemplate: this.$('.dz-template').html(),
            maxFilesize: this.get('maxFilesize'),
        //       acceptedFiles: this.get('acceptedMimeTypes'),
            success: this.dropzoneSuccess(),
            accept: this.dropzoneAccept(),
            maxfilesexceeded: function(file, bla, foo) {
                // this.removeFile(file);
                console.log('maxfilesexceeded>>>', file, bla, foo);
            }
        });
        this.set('_dropzone', dropozone);

    }.on('didInsertElement'),

});