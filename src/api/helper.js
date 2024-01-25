/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

import { cloneDeep } from 'lodash';
import { dateFormats, medicineStatus } from 'src/lib/constants';
import { calculateIdealWeight, convertWithTimezone } from 'src/lib/utils';

function formDataParser(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((value, index) => {
        if (value) {
          if (value.uid) {
            formData.append(key, value, value.name);
          } else {
            formData.append(`${key}[${index}]`, value);
          }
        }
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
}
const processItem = (item) => {
  if (item?.patient?.weight && item?.patient?.weightUnit) {
    item.patient.weightAndWeightUnit = `${item?.patient?.weight} ${item?.patient?.weightUnit}`;
  }
  if (item?.patient?.gender && item?.patient?.height) {
    item.patient.idealWeight = calculateIdealWeight(item.patient.height, item.patient.gender);
  }
  if (item.items.length >= 1) {
    item.items = item.items.map((value) => {
      if (!value?.medicineStatus) {
        value.medicineStatus = medicineStatus.NEW;
      }
      return value;
    });
  }
  return item;
};

const processResult = (result) => {
  if (result?.patient?.weight && result?.patient?.weightUnit) {
    result.patient.weightAndWeightUnit = `${result?.patient?.weight} ${result?.patient?.weightUnit}`;
  }
  if (result?.patient?.gender && result?.patient?.height !== 'NaN' && result?.patient?.height) {
    result.patient.idealWeight = calculateIdealWeight(result.patient.height, result.patient.gender);
  }
  if (result.items.length >= 1) {
    result.items = result.items.map((value) => {
      if (!value?.medicineStatus) {
        value.medicineStatus = medicineStatus.NEW;
      }
      return value;
    });
  }
  return result;
};

export const responseModifierEPrescription = (data) => {
  let result = data.results || data;
  if (Array.isArray(result)) {
    result = result.map(processItem);
  } else {
    result = processResult(result);
  }
  if (data.results) {
    data.results = result;
  } else {
    data = result;
  }
  return data;
};

export const responseModifierAppointments = (data) => {
  let result = data.results || data;
  if (Array.isArray(result)) {
    result = result.map((item) => {
      item.appointmentStart = convertWithTimezone(item.appointmentDate, {
        format: dateFormats.YYYYMMDD,
      });
      item.appointmentTime = convertWithTimezone(item.appointmentDate, {
        format: 'HH:mm',
      });
      return item;
    });
  } else {
    result.appointmentStart = convertWithTimezone(result.appointmentDate, {
      format: dateFormats.YYYYMMDD,
    });
    result.appointmentTime = convertWithTimezone(result.appointmentDate, {
      format: 'HH:mm',
    });
  }
  if (data.results) {
    data.results = result;
  } else {
    data = result;
  }
  return data;
};

export const courseStepsProgressModifier = data => {
  const clonedData = cloneDeep(data);
  const results = clonedData.results?.[0]?.reduce((acc, item) => {
    // console.log("🚀 ~ results ~ item:", item)
    if (!acc[item?.step]) {
      acc[item?.step] = item;
    }
    return acc;
  }, {});
  return results;
};

export default formDataParser;
