import React from 'react';
import PropTypes from 'prop-types';
import {InlineGrid, InlineStack, Labelled, Text} from '@shopify/polaris';
import {desktopPositionOptions} from '@assets/const/setting';
import './DesktopPositionInput.scss';

const DesktopPositionInput = ({
  label,
  value,
  onChange,
  helpText,
  options = desktopPositionOptions
}) => {
  return (
    <Labelled label={label}>
      <InlineStack gap={"300"}>
        {options.map((option, key) => (
          <div
            key={key}
            className={`Avada-DesktopPosition ${
              value === option.value ? 'Avada-DesktopPosition--selected' : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </InlineStack>
      <Text as="span" tone="subdued">
        {helpText}
      </Text>
    </Labelled>
  );
};

DesktopPositionInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};

export default DesktopPositionInput;
