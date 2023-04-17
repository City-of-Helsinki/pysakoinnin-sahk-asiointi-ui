import { Objection } from '../interfaces/objectionInterfaces';

const mockDueDateObject: Objection = {
  foulNumber: '7777777',
  registerNumber: '',
  ssn: '',
  firstName: '',
  lastName: '',
  email: '',
  mobilePhone: '',
  iban: '',
  authorRole: 0,
  address: {
    streetAddress: '',
    postCode: '',
    postOffice: ''
  },
  description: '',
  attachments: [],
  sendDecisionViaEService: false,
  type: 2
};

export default mockDueDateObject;
