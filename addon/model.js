import Model from 'ember-eureka/model';
import Ember from 'ember';

const FILE_FORMAT = [
    'css', 'flv', 'js', 'odt', 'py',
    'tgz', 'dat', 'gif', 'key', 'otp',
    'qt', 'tiff', 'aac', 'dmg', 'h',
    'less', 'ots', 'rar', 'txt', 'ai',
    'doc', 'hpp', 'mid', 'ott', 'rb',
    'wav', 'aiff', 'dotx', 'html', 'mp3',
    'pdf', 'rtf', 'xls', 'avi', 'dwg',
    'ics', 'mp4', 'php', 'sass', 'xlsx',
    'bmp', 'dxf', 'iso', 'mpg', 'png',
    'scss', 'xml', 'c', 'eps', 'java',
    'odf', 'ppt', 'sql', 'yml', 'cpp',
    'exe', 'jpg', 'ods', 'psd', 'tga',
    'zip'
];

export default Model.extend({

    isImage: Ember.computed('mime', function() {
        return this.get('mime').search(/^image/) > -1;
    }),

    filesEndpoint: Ember.computed('meta.store.db.endpoint', function() {
        // TODO get eureka config to fetch the endpoint
        let apiEndpoint = this.get('meta.store.db.endpoint');
        let endpoint = '/attachment';
        return `${apiEndpoint}${endpoint}`;
    }),

    url: Ember.computed('filesEndpoint', 'path', function() {
        let endpoint = this.get('filesEndpoint');
        let filename = this.get('path');
        if (filename[0] !== '/') {
            filename = `/${filename}`;
        }
        return `${endpoint}${filename}`;
    }),

    thumb: Ember.computed('filesEndpoint', 'path', function() {
        if (this.get('isImage')) {
            let endpoint = this.get('filesEndpoint');
            let filename = this.get('path');
            if (filename[0] !== '/') {
                filename = `/${filename}`;
            }
            return `${endpoint}/i/thumb/200x200${filename}`;
        }
        let ext = this.get('path').split('.').slice(-1)[0];
        if (FILE_FORMAT.indexOf(ext) === -1) {
            ext = '_blank';
        }
        return `/assets/images/file-icons/${ext}.png`;
    })
});
