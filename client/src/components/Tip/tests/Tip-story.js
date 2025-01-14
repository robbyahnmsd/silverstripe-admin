import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setAddon, storiesOf } from '@storybook/react';
import { withKnobs, selectV2, text } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

import notes from '../README.md';

import Tip, { TIP_IMPORTANCE_LEVELS, TIP_TYPES } from 'components/Tip/Tip';
import ValueTracker from 'stories/ValueTracker';
import { FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const inputProps = {
  name: 'MyField',
  id: 'MyField',
  title: 'Field title',
  placeholder: 'Placeholder text',
};

const importanceLevels = Object.keys(TIP_IMPORTANCE_LEVELS)
  .reduce((accumulator, key) => ({
    ...accumulator,
    [`TIP_IMPORTANCE_LEVELS.${key}`]: TIP_IMPORTANCE_LEVELS[key]
  }), {});


storiesOf('Admin/Tip', module)
  .addDecorator(withKnobs)
  .addDecorator((storyFn) => (
    <div style={{ margin: '5em', width: '30em' }}>
      <ValueTracker>{storyFn()}</ValueTracker>
    </div>
  ))
  .addWithJSX(
    'Title tip',
    withNotes(notes)(
      () => (
        <FormGroup>
          {inputProps.title}
          <Tip
            id={`FieldHolder-${inputProps.id}-titleTip`}
            content={text('Content', 'Example tip contents')}
            icon="menu-help"
            fieldTitle={inputProps.fieldTitle}
            type={TIP_TYPES.TITLE}
          />
          <div className="form__field-holder">
            <Input {...inputProps} />
          </div>
        </FormGroup>
      )
    )
  )
  .addWithJSX(
    'Input group tip',
    withNotes(notes)(
      () => (
        <InputGroup>
          <Input {...inputProps} />
          <InputGroupAddon addonType="append">
            <Tip
              id={'input-group-tip-field'}
              content={text('Content', 'Example tip contents')}
              fieldTitle={inputProps.fieldTitle}
              icon={selectV2('Icon (examples)', ['lamp', 'attention', 'flag'], 'lamp')}
              importance={selectV2('Importance', importanceLevels, 'normal')}
              type={TIP_TYPES.INPUT_GROUP}
            />
          </InputGroupAddon>
        </InputGroup>
      )
    )
  );
