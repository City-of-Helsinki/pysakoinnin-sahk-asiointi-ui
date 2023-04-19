import { AuthorRole, ObjectionForm } from '../interfaces/objectionInterfaces';

const mockRectificationForm: ObjectionForm = {
  transferNumber: '',
  foulNumber: '123456',
  registerNumber: '',
  authorRole: AuthorRole.Driver,
  poaFile: {
    fileName: 'test.pdf',
    size: 12345,
    mimeType: 'application/pdf',
    data: ''
  },
  attachments: [
    { fileName: 'test2.jpg', size: 50100, mimeType: 'image/jpeg', data: '' }
  ],
  toSeparateEmail: false,
  email: 'test.user@test.fi',
  firstName: 'Test',
  lastName: 'User',
  ssn: '123456-789A',
  newEmail: '',
  newEmailConfirm: '',
  address: {
    streetAddress: 'Elimäenkatu 5',
    postCode: '00100',
    postOffice: 'Helsinki'
  },
  mobilePhone: '+358401234567',
  iban: 'FI9780001700903330',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum condimentum mi, vitae efficitur mi vulputate at. Aliquam porttitor tincidunt ex non fermentum. Fusce consequat imperdiet augue ut pulvinar. Praesent sollicitudin nulla non lacus tristique, sed faucibus urna viverra. Nullam pretium velit lorem. Maecenas porttitor molestie.',
  deliveryDecision: 'toParkingService',
  sendDecisionViaEService: true,
  type: 0
};

export default mockRectificationForm;
