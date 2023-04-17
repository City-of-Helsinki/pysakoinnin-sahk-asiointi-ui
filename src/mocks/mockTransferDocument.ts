import { AuthorRole, Objection } from '../interfaces/objectionInterfaces';

const mockTransferDocument: Objection = {
  transferNumber: '123456',
  foulNumber: '',
  registerNumber: 'ABC-123',
  authorRole: AuthorRole.Driver,
  attachments: [
    { fileName: 'test2.jpg', size: 255, mimeType: 'image/jpeg', data: '' }
  ],
  email: 'test.user@test.fi',
  firstName: 'Test',
  lastName: 'User',
  ssn: '',
  address: {
    streetAddress: 'Elimäenkatu 5',
    postCode: '00100',
    postOffice: 'Helsinki'
  },
  mobilePhone: '+358401234567',
  iban: 'FI9780001700903330',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum condimentum mi, vitae efficitur mi vulputate at. Aliquam porttitor tincidunt ex non fermentum. Fusce consequat imperdiet augue ut pulvinar. Praesent sollicitudin nulla non lacus tristique, sed faucibus urna viverra. Nullam pretium velit lorem. Maecenas porttitor molestie.',
  sendDecisionViaEService: true,
  type: 1
};

export default mockTransferDocument;
