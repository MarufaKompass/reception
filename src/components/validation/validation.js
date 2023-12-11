import * as yup from 'yup';

const meetingCodeValidation = yup.string().required('Meeting code is required');
const eventCodeValidation = yup.string().required('Event code is required');
const nameValidation = yup.string().required('Name is required');
const phoneValidation = yup.string().required('Phone number is required');
const guestPhoneValidation = yup.string().required('Guest phone number is required');
const companyValidation = yup.string().required('Company is required');
const parcelTypeValidation = yup.string().required('Parcel type is required');
const employeeValidation = yup.string().required('Employee is required');
const guestNameValidation = yup.string().required('Guest name is required');
const guestEmailValidation = yup.string().required('Guest email is required');
const guestGenderValidation = yup.string().required('Guest gender is required');
const guestCompanyValidation = yup.string().required('Guest company name is required');
const purposeValidation = yup.string().required('Purpose is required');
const timeValidation = yup.string().required('Meeting type is required');
const extraVisitorValidation = yup.string().required('Extra visitor is required');
const reference = yup.string().required('reference number is required');
const quantities = yup.number().min(1, 'Quantity must be at least 1');


export const meetingCodeSchema = yup.object().shape({
  code: meetingCodeValidation
});

export const eventCodeSchema = yup.object().shape({
  code: eventCodeValidation
});
export const quantity = yup.object().shape({
  qty:quantities
});

export const courierSchema = yup.object().shape({
  ref: reference,
  name: nameValidation,
  phone: phoneValidation,
  company: companyValidation,
  parcel_type: parcelTypeValidation,
  person_id: employeeValidation
});

export const instantMeetingSchema = yup.object().shape({
  guest_name: guestNameValidation,
  guest_phone: guestPhoneValidation,
  guest_email: guestEmailValidation,
  guest_gender: guestGenderValidation,
  guest_company: guestCompanyValidation,
  emp_person_id: employeeValidation,
  meeting_purpose_id: purposeValidation,
  time: timeValidation,
  ex_visitor_no: extraVisitorValidation
});
