import Ember from 'ember';
import Widget from 'eureka-widget-model-form';

export default Widget.extend({
    layoutName: 'components/widget-model-form',

    fieldNames: function() {
        return Ember.A(['title', 'description']);
    }.property()
});
