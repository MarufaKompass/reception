import * as yup from 'yup';

const meetingCodeValidation = yup.string().required('Meeting code is required');
const eventCodeValidation = yup.string().required('Event code is required');
const nameValidation = yup.string().required('Name is required');
const phoneValidation = yup.string().required('Phone is required');
const companyValidation = yup.string().required('Company is required');
const parcelTypeValidation = yup.string().required('Parcel type is required');
const employeeValidation = yup.string().required('Employee is required');

export const meetingCodeSchema = yup.object().shape({
  meetingCode: meetingCodeValidation
});

export const eventCodeSchema = yup.object().shape({
  eventCode: eventCodeValidation
});

export const courierSchema = yup.object().shape({
  name: nameValidation,
  phone: phoneValidation,
  company: companyValidation,
  parcelType: parcelTypeValidation,
  employee: employeeValidation
});
