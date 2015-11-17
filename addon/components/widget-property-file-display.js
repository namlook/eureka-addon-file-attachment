import Ember from 'ember';
import layout from '../templates/components/widget-property-file-display';
import WidgetProperty from 'ember-eureka/widget-property';
import mimoza from '../mimoza';

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


export default WidgetProperty.extend({
    layout: layout,
    filepath: Ember.computed.alias('field.value'),

    isImage: Ember.computed('filepath', function() {
        let filepath = this.get('filepath');
        console.log('filepath', filepath, mimoza.getMimeType(filepath));
        return mimoza.getMimeType(filepath).search(/^image/) > -1;
    }),

    filesEndpoint: Ember.computed('appConfig', function() {
        let apiEndpoint = this.get('appConfig.apiEndpoint');
        let uploadEndpoint = this.get('appConfig.fileUploadEndpoint');
        return `${apiEndpoint}${uploadEndpoint}`;
    }),

    url: Ember.computed('filesEndpoint', 'filepath', function() {
        let endpoint = this.get('filesEndpoint');
        let filepath = this.get('filepath');
        if (filepath[0] !== '/') {
            filepath = `/${filepath}`;
        }
        return `${endpoint}${filepath}`;
    }),

    thumb: Ember.computed('filesEndpoint', 'filepath', function() {
        if (this.get('isImage')) {
            let endpoint = this.get('filesEndpoint');
            let filepath = this.get('filepath');
            if (filepath[0] !== '/') {
                filepath = `/${filepath}`;
            }
            return `${endpoint}/i/thumb/200x200${filepath}`;
        }
        let ext = this.get('filepath').split('.').slice(-1)[0];
        if (FILE_FORMAT.indexOf(ext) === -1) {
            ext = '_blank';
        }
        return `/assets/images/file-icons/${ext}.png`;
    })
});
