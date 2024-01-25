import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, Button, HelperText, Paragraph } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimePicker = ({ label, register, setValue, defaultValue, ...restProps }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    // Handle the selected date, set it to the form value, etc.
    setValue(register?.name, date);
  };

  return (
    <View>
      <TextInput
        label={label}
        onFocus={showDatePicker}
        value={defaultValue} // You may need to format this based on your requirements
        {...restProps}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <HelperText type="error">
        {/* Display any error messages if needed */}
      </HelperText>
    </View>
  );
};

DateTimePicker.defaultProps = {
  label: '',
  register: () => {},
  setValue: () => {},
  defaultValue: null,
};

DateTimePicker.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
  defaultValue: PropTypes.instanceOf(Date),
};

export default DateTimePicker;
