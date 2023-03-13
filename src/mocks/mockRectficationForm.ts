const mockRectificationForm = {
  invoiceNumber: '',
  refNumber: '',
  regNumber: '',
  relation: 'driver',
  poaFile: { name: 'test.pdf', size: 12345, type: 'application/pdf' },
  attachments: [{ name: 'test2.jpg', size: 50100, type: 'image/jpeg' }],
  toSeparateEmail: false,
  newEmailAddress: '',
  newEmailConfirm: '',
  address: 'Elimäenkatu 5',
  zipCode: '00100',
  city: 'Helsinki',
  phone: '+358401234567',
  IBAN: 'FI9780001700903330',
  rectificationContent:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum condimentum mi, vitae efficitur mi vulputate at. Aliquam porttitor tincidunt ex non fermentum. Fusce consequat imperdiet augue ut pulvinar. Praesent sollicitudin nulla non lacus tristique, sed faucibus urna viverra. Nullam pretium velit lorem. Maecenas porttitor molestie.',
  deliveryDecision: 'toParkingService'
};

export default mockRectificationForm;
