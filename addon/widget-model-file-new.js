import DropzoneMixin from './mixin';
import WidgetModel from 'ember-eureka/widget-model';

export default WidgetModel.extend(DropzoneMixin, {
    classNames: ['eureka-widget-property-file-attachment-form'],

    maxFiles: 1,

    onfileUploaded: function(fileRecord) {
        var routePath = this.get('config.actions.save.transitionTo');
        var that = this;
        fileRecord.save().then(function(record) {
            var payload = {model: record, routePath: routePath};
            that.sendAction('toControllerAction', {name: 'transitionTo', payload: payload});
        });
    }
});
