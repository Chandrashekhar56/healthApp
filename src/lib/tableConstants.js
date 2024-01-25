import { API_URL } from 'src/api/constants';
import Switch from 'src/wiredComponent/Switch';
import { dateFormats } from './constants';

const ASSISTANT_COLUMNS = [
  {
    label: 'Name',
    type: 'text',
    dataKey: 'firstName',
    sort: true,
    maxWidth: '10rem',
    render: ({ data }) => `${data?.firstName} ${data?.lastName}`
  },
  {
    label: 'Email',
    type: 'text',
    dataKey: 'email',
    maxWidth: '15rem',
  },
  {
    label: 'Status',
    dataKey: 'isActive',
    type: 'boolean',
    activeData: 'Active',
    inActiveData: 'InActive',
    width: '10px',
    api: API_URL.assistant,
    render: ({ data }) => <Switch rowData={data} api={API_URL.assistant} />,
  },
  {
    label: '',
  },
];
const PRACTITIONER_COLUMNS = [
  {
    label: 'Name',
    type: 'text',
    dataKey: 'firstName',
    sort: true,
    maxWidth: '10rem',
    render: ({ data }) => `${data?.firstName} ${data?.lastName}`
  },
  {
    label: 'Email',
    type: 'text',
    dataKey: 'email',
    maxWidth: '15rem',
  },
  {
    label: 'Status',
    dataKey: 'isActive',
    type: 'boolean',
    activeData: 'Active',
    inActiveData: 'InActive',
    width: '10px',
    render: ({ data }) => <Switch rowData={data} api={API_URL.practitioner} />,
  },
  {
    label: '',
  },
];
const CLINIC_ADMIN_COLUMNS = [
  {
    label: 'Name',
    type: 'text',
    dataKey: 'name',
    sort: true,
    maxWidth: '10rem',
  },
  {
    label: 'Email',
    type: 'text',
    dataKey: 'email',
    maxWidth: '15rem',
  },
  {
    label: 'Status',
    dataKey: 'isActive',
    type: 'boolean',
    activeData: 'Active',
    inActiveData: 'InActive',
    api: API_URL.clinicAdmin,
    width: '10px',
    render: ({ data }) => <Switch rowData={data} api={API_URL.clinicAdmin} />,
  },
  {
    label: '',
  },
];
const CLINIC_COLUMNS = [
  {
    label: 'Name',
    type: 'text',
    dataKey: 'name',
    sort: true,
    maxWidth: '10rem',
  },
  {
    label: 'Email',
    type: 'text',
    dataKey: 'email',
    maxWidth: '10rem',
  },
  {
    label: 'Address',
    dataKey: 'address.description',
    type: 'text',
    maxWidth: '14rem',
  },
  {
    label: 'Team',
    dataKey: 'team',
    type: 'text',
    maxWidth: '3rem',
  },
  {
    label: 'Status',
    dataKey: 'isActive',
    type: 'boolean',
    activeData: 'Active',
    inActiveData: 'InActive',
    width: '2rem',
  },
  {
    label: '',
  },
];
const PATIENT_COLUMNS = [
  {
    label: 'Patient_#',
    type: 'text',
    dataKey: 'uhid',
    sort: true,
    maxWidth: '10rem',
  },
  {
    label: 'Name',
    type: 'text',
    dataKey: 'name',
    sort: true,
    maxWidth: '10rem',
  },
  {
    label: 'Email',
    type: 'text',
    dataKey: 'email',
    maxWidth: '10rem',
  },
  {
    label: 'Phone',
    dataKey: 'contact',
    type: 'text',
  },
  {
    label: 'Created',
    dataKey: 'createdAt',
    type: 'date',
    format: dateFormats.MMMDDYYYYHHMMSS,
  },
  {
    label: 'Status',
    dataKey: 'isActive',
    type: 'boolean',
    activeData: 'Active',
    inActiveData: 'InActive',
    width: '2rem',
  },
  {
    label: '',
  },
];
const INVOICE_COLUMNS = [
  {
    label: 'Invoice #',
    type: 'text',
    dataKey: 'invoiceNumber',
    maxWidth: '5rem',
    sort: true,
  },
  {
    label: 'Description',
    type: 'text',
    dataKey: 'note',
    maxWidth: '14rem',
  },
  {
    label: 'Due Date',
    dataKey: 'dueDate',
    type: 'date',
    format: dateFormats.MMDDYYYY,
  },
  {
    label: 'Status',
    dataKey: 'status',
    type: 'chips',
    labelAccessor: 'status',
  },
  {
    label: 'Amount',
    dataKey: 'invoiceAmount',
    type: 'text',
  },
];

export {
  CLINIC_ADMIN_COLUMNS,
  ASSISTANT_COLUMNS,
  PRACTITIONER_COLUMNS,
  CLINIC_COLUMNS,
  PATIENT_COLUMNS,
  INVOICE_COLUMNS,
};
