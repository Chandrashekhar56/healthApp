/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';

import WiredSelect from '../../wiredComponent/Form/Select';

import WiredAutoComplete from '../../wiredComponent/Form/Autocomplete';

import {
  onlyNumber,
  regEmail,
  regPassword,
  regTextArea,
  regexName,
  regexAlphanumeric,
  onlyAlphabet,
  noHtmlTagPattern,
  regPostalCode,
} from 'src/lib/constants';
import {City, Country, State} from 'country-state-city';
import {get, isEmpty} from '../../lib/lodash';
// import AutoComplete from './AutoComplete';
import CheckboxLabel from './Checkbox';
import RadioGroup from './RadioButton';
import TextAreaInput from './TextArea';
import DatePicker from './DatePicker';
import TextInput from './TextInput';
import NestedForm from './NestedForm';
import Select from './Select';

// import Editor from './Editor';
import UploadFile from './UploadFile';
import FormPhoneInput from './PhoneInput';
import TextLabel from './TextLabel';
import DatetimePicker from './DatetimePicker';
import FormMapAutocomplete from './MapAutocomplete';
import FormTimePicker from './TimePicker';
// import TagsInput from './TagsInput';
// import Matrix from './Matrix';
// import FormEsignature from './E-Signature';
// import Slider from './Slider';
import CheckboxGroup from './CheckboxGroup';
import {Tooltip} from 'react-native-paper';
import {View} from 'react-native';
import {getFormValidations} from '../../lib/utils';

const getAddressGroup = (item, columnsPerRow, form) => {
  const {watch, setValue} = form;
  const handleCountryChange = () => {
    setValue('address.state', undefined);
    setValue('address.locality', undefined);
    setValue('address.stateCode', undefined);
  };

  const cityArray = !isEmpty(watch('address.stateCode'))
    ? City.getCitiesOfState(
        watch('address.countryCode'),
        watch('address.stateCode'),
      )
    : [];
  const statesArray = !isEmpty(watch('address.countryCode'))
    ? State.getStatesOfCountry(watch('address.countryCode'))
    : [];
  const handleStateChange = () => {
    setValue('address.locality', undefined);
  };
  return [
    {
      ...item,
      required: false,
      label: 'Google Place Address',
      inputType: 'addressAutoComplete',
      colSpan: columnsPerRow,
    },
    {
      component: () => (
        <div
          style={{
            display: 'flex',
            border: '1px dashed rgba(145, 158, 171, 0.32)',
          }}
        />
      ),
      colSpan: columnsPerRow,
    },
    {
      inputType: 'text',
      name: 'address.addressLine1',
      textLabel: 'Address line 1',
      required: item.required,
      maxLength: {value: 250},
      pattern: regTextArea,
      isShrink: watch('address.description'),
    },
    {
      inputType: 'text',
      name: 'address.addressLine2',
      textLabel: 'Address line 2',
      maxLength: {value: 250},
      pattern: regTextArea,
      isShrink: watch('address.description'),
    },
    {
      inputType: 'select',
      name: 'address.countryCode',
      label: 'Country',
      valueAccessor: 'isoCode',
      labelAccessor: 'name',
      options: Country.getAllCountries(),
      colSpan: columnsPerRow / 2,
      required: item.required,
      onChange: handleCountryChange,
    },
    {
      inputType: 'select',
      name: 'address.stateCode',
      textLabel: 'State',
      valueAccessor: 'isoCode',
      labelAccessor: 'name',
      options: statesArray,
      disabled: isEmpty(watch('address.countryCode')),
      colSpan: columnsPerRow / 2,
      required: item.required,
      onChange: handleStateChange,
    },
    {
      inputType: 'select',
      name: 'address.locality',
      valueAccessor: 'name',
      labelAccessor: 'name',
      options: cityArray,
      required: item.required && cityArray.length >= 1,
      textLabel: 'City',
      disabled: isEmpty(watch('address.stateCode')),
      colSpan: columnsPerRow / 2,
    },
    {
      inputType: 'text',
      name: 'address.postalCode',
      textLabel: 'Postal Code',
      colSpan: columnsPerRow / 2,
      maxLength: {value: 12},
      required: item.required,
      pattern: regPostalCode,
      isShrink: watch('address.description'),
    },
  ];
};

const TooltipComp = ({description}) => (
  <Tooltip title={description} arrow placement="bottom-start" followCursor>
    <img
      alt="info"
      src="/assets/icons/info.svg"
      width="18"
      style={{
        marginLeft: '4px',
        paddingTop: '0px',
      }}
      color="#919EAB"
    />
  </Tooltip>
);

const ItemWrapper = Component =>
  function WithFormItem(props) {
    const {form, dependencies, columnsPerRow, item, fieldWrapper, index} =
      props;

    const [extraAPIParams, setExtraAPIParams] = useState();
    const {watch} = form;
    const FormItemComponent = fieldWrapper
      ? fieldWrapper(Component, index, item)
      : Component;

    const handleDependencyChange = useCallback(
      (value, isValueChanged = false) => {
        const dependenciesCalc = dependencies?.calc(value, form, {
          isValueChanged,
        });
        console.log(" 🚀 ~ file: FormComponent.js:178 ~ WithFormItem ~ dependenciesCalc:", dependenciesCalc)
        if (dependenciesCalc.reFetch) {
          setExtraAPIParams(dependenciesCalc);
        } else {
          setExtraAPIParams();
        }
      },
      [dependencies, form],
    );

    useEffect(() => {
      const subscription = watch((value, {name}) => {
        // if (type === 'change') {
        if (dependencies?.keys?.indexOf(name) > -1) {
          handleDependencyChange(value, true);
        }
        // }
      });
      return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
      if (dependencies?.keys) {
        handleDependencyChange(form.getValues());
      }
    }, []);

    if (props?.hide) {
      return null;
    }

    if (dependencies?.keys) {
      watch(dependencies?.keys);
      const dependenciesCalc = dependencies?.calc(form.getValues(), form);
      if (dependenciesCalc?.hide) {
        return null;
      }
    }

    let overrideProps = {};

    if (item?.inputType === 'number') {
      overrideProps = {type: 'number'};
    }

    const isOtherInput =
      item?.inputType === 'radio' ||
      item?.inputType === 'editor' ||
      item?.inputType === 'matrix' ||
      item?.inputType === 'signature' ||
      item?.inputType === 'checkBox' ||
      item?.inputType === 'uploadFile';

    return (
      <View key={item}>
        <FormItemComponent
          {...props}
          {...extraAPIParams}
          extraAPIParams={extraAPIParams}
          {...overrideProps}
        />
        {item?.description && !isOtherInput && (
          <TooltipComp description={item?.description} />
        )}
      </View>
    );
  };

const ComponentMap = {
  // autoComplete: ItemWrapper(AutoComplete),
  checkBox: ItemWrapper(CheckboxLabel),
  textArea: ItemWrapper(TextAreaInput),
  radio: ItemWrapper(RadioGroup),
  date: ItemWrapper(DatePicker),
  text: ItemWrapper(TextInput),
  // editor: ItemWrapper(Editor),
  wiredAuto: ItemWrapper(WiredAutoComplete),
  wiredSelect: ItemWrapper(WiredSelect),
  select: ItemWrapper(Select),
  uploadFile: ItemWrapper(UploadFile),
  phoneInput: ItemWrapper(FormPhoneInput),
  textLabel: ItemWrapper(TextLabel),
  nestedForm: ItemWrapper(NestedForm),
  dateTime: ItemWrapper(DatetimePicker),
  addressAutoComplete: ItemWrapper(FormMapAutocomplete),
  timePicker: ItemWrapper(FormTimePicker),
  // tags: ItemWrapper(TagsInput),
  // matrix: ItemWrapper(Matrix),
  // signature: ItemWrapper(FormEsignature),
  // slider: ItemWrapper(Slider),
  multiSelect: ItemWrapper(Select),
  multiChoice: ItemWrapper(CheckboxGroup),
  number: ItemWrapper(TextInput),
};

const regexMap = {
  onlyAlphabet,
  alphanumeric: regexAlphanumeric,
  commonText: noHtmlTagPattern,
  email: regEmail,
};

const validatePattern = item => {
  const {inputType, pattern, multiline, validation} = item || {};
  if ((inputType === 'text' || inputType === 'textArea') && validation) {
    return regexMap[validation];
  }
  if (pattern) {
    return pattern;
  }
  if ((inputType === 'text' && multiline) || inputType === 'textArea') {
    return {
      value: regTextArea.value,
      message: `${item?.label || ''} ${regTextArea?.message}`,
    };
  }
  if (inputType !== 'text') {
    return undefined;
  }

  switch (item?.type) {
    case 'number':
      return {
        value: onlyNumber.value,
        message: `${item?.label || item?.textLabel} ${onlyNumber?.message}`,
      };
    case 'email':
      return regEmail;
    case 'password':
      return regPassword;
    default:
      return {
        value: regexName.value,
        message: `${item?.textLabel} ${regexName?.message}`,
      };
  }
};

const Container = ({children, applyContainer, spacing}) => {
  if (applyContainer) {
    return (
      <View container spacing={spacing} style={{gap: spacing}}>
        {children}
      </View>
    );
  }

  return (
    <View item sx={{paddingLeft: 0}}>
      <h4 style={{marginTop: 0}}>Address Info</h4>
      <View
        container
        spacing={spacing}
        sx={{
          margin: '0',
          border: '1px solid rgba(145, 158, 171, 0.32);',
          paddingRight: '24px',
          paddingBottom: '24px',
          borderRadius: '4px',
        }}>
        {children}
      </View>
    </View>
  );
};

const FormComponent = ({
  formGroups,
  columnsPerRow,
  ViewGap = 20,
  defaultValue = {},
  form,
  fieldWrapper,
  applyContainer = true,
}) => {
  const {
    register,
    getValues,
    setValue,
    control,
    formState: {errors},
  } = form;
  return (
    <Container applyContainer={applyContainer} spacing={ViewGap}>
      {formGroups?.map((item, index) => {
        console.log("🚀 ~ file: FormComponent.js:364 ~ {formGroups?.map ~ item:", item)
        if (item?.inputType === 'checkBox' || item?.inputType === 'switch') {
          item.defaultChecked = defaultValue?.[item?.name];
        } else {
          item.defaultValue = defaultValue?.[item?.name];
        }
        if (item?.inputType === 'multiSelect') {
          item.multiple = true;
        }
        if (item?.component) {
          const Component = item.component;
          return (
            <View key={item} {...item.ViewProps}>
              <Component
                key={item}
                control={control}
                register={register}
                setValue={setValue}
                item={item}
                error={get(errors, `${item.name}.message`)}
                getValues={getValues}
                form={form}
                {...item}
              />
            </View>
          );
        }
        if (
          ComponentMap[item?.inputType] ||
          item?.inputType === 'mapAutoComplete'
        ) {
          const FormItemComponent = ComponentMap[item?.inputType];
          return item?.inputType === 'mapAutoComplete' ? (
            <AddressComponent
              formGroups={getAddressGroup(item, columnsPerRow, form)}
              columnsPerRow={columnsPerRow}
              ViewGap={ViewGap}
              defaultValue={defaultValue}
              form={form}
              fieldWrapper={fieldWrapper}
              name={item.name}
            />
          ) : (
            <FormItemComponent
              key={item.name}
              style={{
                backgroundColor: 'transparent',
                ...item?.inputStyle,
              }}
              containerStyle={{...item?.containerStyle}}
              error={get(errors, `${item?.name}.message`, '')}
              register={
                item?.formGroups || item.inputType === 'matrix'
                  ? register
                  : {
                      ...register(item?.name, {
                        required: item?.required && {
                          message: `${
                            item.label || item.textLabel || 'This field'
                          } is required`,
                          ...item?.required,
                        },
                        pattern: validatePattern(item),
                        maxLength: item?.maxLength && {
                          message: `${
                            item.label || item.textLabel
                          } should not be greater than ${item.maxLength.value}`,
                          ...item?.maxLength,
                        },
                        minLength: item?.minLength && {
                          message: `${
                            item.label || item.textLabel
                          } should be greater than ${item.minLength.value}`,
                          ...item?.minLength,
                        },
                        // validate: getFormValidations(item)
                      }),
                    }
              }
              setValue={setValue}
              control={control}
              getValues={getValues}
              form={form}
              {...item}
              columnsPerRow={columnsPerRow}
              item={item}
              fieldWrapper={fieldWrapper}
              index={index}
              label={item.label || item.textLabel}
            />
          );
        }
        return null;
      })}
    </Container>
  );
};

const AddressComponent = ({
  formGroups,
  columnsPerRow,
  ViewGap,
  defaultValue,
  form,
  fieldWrapper,
  name,
}) => {
  const {watch, setValue} = form;

  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      const {address = {}} = defaultValue;
      setValue('address.countryCode', address.countryCode);
      setValue('address.state', address.state);
      setValue('address.locality', address.locality);
      setValue('address.addressLine1', address.addressLine1);
      setValue('address.addressLine2', address.addressLine2);
      setValue('address.postalCode', address.postalCode);
      setValue('address.stateCode', address.stateCode);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, {name: itemName}) => {
      if (itemName === name) {
        const address = value?.address;
        setValue('address.countryCode', address?.countryCode);
        setValue('address.state', address?.state);
        setValue('address.locality', address?.locality);
        setValue('address.addressLine1', address?.addressLine1);
        setValue('address.addressLine2', address?.addressLine2);
        setValue('address.postalCode', address?.postalCode);
        setValue('address.stateCode', address?.stateCode);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormComponent
      formGroups={formGroups}
      columnsPerRow={columnsPerRow}
      ViewGap={ViewGap}
      defaultValue={defaultValue}
      form={form}
      fieldWrapper={fieldWrapper}
      applyContainer={false}
    />
  );
};

export default FormComponent;
