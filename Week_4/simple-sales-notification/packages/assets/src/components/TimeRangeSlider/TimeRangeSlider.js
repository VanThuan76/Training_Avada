import PropTypes from 'prop-types';
import {InlineGrid, RangeSlider, Text, TextField} from '@shopify/polaris';

const TimeRangeSlider = ({lable, max = 100, currentValue, helpText, onChange}) => {
//   const [rangeValue, setRangeValue] = useState(100);
//   const handleRangeSliderChange = useCallback(value => setRangeValue(value), []);
  return (
    <InlineGrid gap={{xs: '100', sm: '200'}} columns={1} alignItems="start">
      <InlineGrid gap={{xs: '100', sm: '200'}} columns={{xs: 1, sm: 1, md: 2}} alignItems="end">
        <RangeSlider
          output
          label={lable}
          min={0}
          max={max}
          value={currentValue}
          onChange={onChange}
        />
        <TextField autoComplete="off" disabled value={currentValue} suffix="seconds(s)" />
      </InlineGrid>
      <Text as="span" tone='subdued'>{helpText}</Text>
    </InlineGrid>
  );
};
TimeRangeSlider.propTypes = {
  label: PropTypes.string,
  helpText: PropTypes.string,
  max: PropTypes.number,
  currentValue: PropTypes.number,
  onChange: PropTypes.func
};

export default TimeRangeSlider;
