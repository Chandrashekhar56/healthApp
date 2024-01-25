import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

// Import other necessary functions as needed

const UploadFile = ({
  textLabel,
  register,
  control,
  gridProps,
  setValue,
  showPreview = true,
  accept,
  getValues,
  form,
  fileInfo,
}) => {
  const values = getValues(register?.name) || {};
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (response, onChange) => {
    try {
      if (response?.uri) {
        setLoading(true);

        // Perform your upload logic here
        // You may use functions from 'react-native-fs' or other libraries
        // Update the file state and call onChange with the file data

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // Handle the error
    }
  };

  useEffect(() => {
    const data = getValues(register?.name);
    if (data?.id) {
      setFile(data);
    }
  }, [values?.file]);

  return (
    <Controller
      control={control}
      {...register}
      render={({ field, fieldState: { error } }) => {
        const { ref, onChange } = field;

        const openImagePicker = () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              quality: 0.5,
            },
            (response) => {
              handleUpload(response, onChange);
            }
          );
        };

        return (
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity onPress={openImagePicker}>
              <Button mode="outlined" loading={loading}>
                {textLabel}
              </Button>
            </TouchableOpacity>

            {file && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>{file?.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setFile();
                    setValue(register?.name, null);
                  }}
                >
                  <Text style={{ color: 'blue' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}

            {showPreview && file && file?.contentType === 'image' ? (
              <Image
                source={{ uri: file?.uri }}
                style={{ width: 100, height: 100, resizeMode: 'cover' }}
              />
            ) : null}

            {error && <Text style={{ color: 'red' }}>{error?.message}</Text>}
          </View>
        );
      }}
    />
  );
};

UploadFile.defaultProps = {
  type: 'text',
  error: '',
  required: false,
  formVariant: 'outlined-basic',
  variant: 'outlined',
  register: {},
};

UploadFile.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  formVariant: PropTypes.string,
  variant: PropTypes.string,
  register: PropTypes.instanceOf(Object),
};

export default UploadFile;
