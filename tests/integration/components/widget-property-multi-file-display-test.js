import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widget-property-multi-file-display', 'Integration | Component | widget property multi file display', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{widget-property-multi-file-display}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widget-property-multi-file-display}}
      template block text
    {{/widget-property-multi-file-display}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
