/* eslint-disable sonarjs/no-duplicate-string */
import { ObjectionDocument } from '../interfaces/objectionInterfaces';
import mockDueDateDocument from './mockDueDateDocument';
import mockRectificationForm from './mockRectificationForm';
import mockTransferDocument from './mockTransferDocument';

const mockObjectionDocumentList: ObjectionDocument[] = [
  {
    id: '12345678',
    created_at: '2023-01-29T09:58:11.875349+03:00',
    updated_at: '2023-01-29T12:24:04.077293+03:00',
    status: {
      value: 'resolvedViaMail',
      timestamp: '2023-01-29T12:24:04.060481+03:00'
    },
    status_histories: [
      {
        value: 'resolvedViaMail',
        timestamp: '2023-01-29T12:24:04.060481+03:00'
      },
      {
        value: 'handling',
        timestamp: '2023-01-29T12:24:04.060481+03:00'
      },
      {
        value: 'received',
        timestamp: '2023-01-29T11:24:04.060481+03:00'
      },
      {
        value: 'sent',
        timestamp: '2023-03-29T19:24:04.060481+03:00'
      }
    ],
    type: '',
    service: 'Pysäköinnin Sähköinen Asiointi',
    user_id: '234567',
    transaction_id: '123456789',
    business_id: '13579124',
    tos_function_id: '123',
    tos_record_id: '123',
    content: {
      ...mockRectificationForm,
      foulNumber: '12345678',
      attachments: [
        {
          fileName: 'long-file-name-for-testing-abcd-efgh-ijkl.png',
          size: 5600,
          mimeType: 'image/png',
          data: ''
        },
        {
          fileName: 'test-image2.jpg',
          size: 65040,
          mimeType: 'image/jpg',
          data: ''
        },
        {
          fileName: 'test-file1.pdf',
          size: 70500,
          mimeType: 'application/pdf',
          data: ''
        }
      ]
    },
    draft: false,
    locked_after: '',
    deletable: true,
    attachments: []
  },
  {
    id: '22324567',
    created_at: '2023-01-11T21:20:00.875349+03:00',
    updated_at: '2023-02-11T21:20:00.077293+03:00',
    status: {
      value: 'received',
      timestamp: '2023-03-29T11:24:04.060481+03:00'
    },
    status_histories: [
      {
        value: 'received',
        timestamp: '2023-03-29T11:24:04.060481+03:00'
      },
      {
        value: 'sent',
        timestamp: '2023-03-29T19:24:04.060481+03:00'
      }
    ],
    type: '',
    service: 'Pysäköinnin Sähköinen Asiointi',
    user_id: '234567',
    transaction_id: '123456789',
    business_id: '13579124',
    tos_function_id: '123',
    tos_record_id: '123',
    content: { ...mockRectificationForm, foulNumber: '23456789' },
    draft: false,
    locked_after: '',
    deletable: true,
    attachments: []
  },
  {
    id: '2345678',
    created_at: '2023-01-01T09:58:11.875349+03:00',
    updated_at: '2023-02-01T12:24:04.077293+03:00',
    status: {
      value: 'sent',
      timestamp: '2023-02-01T19:24:04.060481+03:00'
    },
    status_histories: [
      {
        value: 'sent',
        timestamp: '2023-02-01T19:24:04.060481+03:00'
      }
    ],
    type: '',
    service: 'Pysäköinnin Sähköinen Asiointi',
    user_id: '234567',
    transaction_id: '123456789',
    business_id: '13579124',
    tos_function_id: '123',
    tos_record_id: '123',
    content: mockDueDateDocument,
    draft: false,
    locked_after: '',
    deletable: true,
    attachments: []
  },
  {
    id: '11111111',
    created_at: '2023-01-20T09:58:11.875349+03:00',
    updated_at: '2023-01-20T12:24:04.077293+03:00',
    status: {
      value: 'sent',
      timestamp: '2023-01-20T19:24:04.060481+03:00'
    },
    status_histories: [
      {
        value: 'sent',
        timestamp: '2023-01-20T19:24:04.060481+03:00'
      }
    ],
    type: '',
    service: 'Pysäköinnin Sähköinen Asiointi',
    user_id: '234567',
    transaction_id: '123456789',
    business_id: '13579124',
    tos_function_id: '123',
    tos_record_id: '123',
    content: mockTransferDocument,
    draft: false,
    locked_after: '',
    deletable: true,
    attachments: []
  },
  {
    id: '222222',
    created_at: '2022-03-29T09:58:11.875349+03:00',
    updated_at: '2022-03-29T12:24:04.077293+03:00',
    status: {
      value: 'resolvedViaEService',
      timestamp: '2022-03-29T12:24:04.060481+03:00'
    },
    status_histories: [
      {
        value: 'resolvedViaEService',
        timestamp: '2022-03-29T12:24:04.060481+03:00'
      },
      {
        value: 'handling',
        timestamp: '2022-03-29T12:24:04.060481+03:00'
      },
      {
        value: 'received',
        timestamp: '2022-03-29T11:24:04.060481+03:00'
      },
      {
        value: 'sent',
        timestamp: '2022-03-29T19:24:04.060481+03:00'
      }
    ],
    metadata: {
      foulNumber: '123456789',
      registerNumber: 'ABC-123'
    },
    type: '',
    service: 'Pysäköinnin Sähköinen Asiointi',
    user_id: '234567',
    transaction_id: '123456789',
    business_id: '13579124',
    tos_function_id: '123',
    tos_record_id: '123',
    content: {
      ...mockTransferDocument
    },
    draft: false,
    locked_after: '',
    deletable: true,
    attachments: []
  },
  {
    id: '2222222',
    created_at: '2022-03-29T09:58:11.875349+03:00',
    updated_at: '2022-03-29T12:24:04.077293+03:00',
    status: {
      value: 'handling',
      timestamp: '2022-03-29T12:24:04.060481+03:00'
    },
    status_histories: [
      {
        value: 'handling',
        timestamp: '2022-03-29T12:24:04.060481+03:00'
      },
      {
        value: 'received',
        timestamp: '2022-03-29T11:24:04.060481+03:00'
      },
      {
        value: 'sent',
        timestamp: '2022-03-29T19:24:04.060481+03:00'
      }
    ],
    type: '',
    service: 'Pysäköinnin Sähköinen Asiointi',
    user_id: '234567',
    transaction_id: '123456789',
    business_id: '13579124',
    tos_function_id: '123',
    tos_record_id: '123',
    content: mockRectificationForm,
    draft: false,
    locked_after: '',
    deletable: true,
    attachments: []
  },
  {
    id: '333333',
    created_at: '2021-11-20T09:58:11.875349+03:00',
    updated_at: '2021-11-20T12:24:04.077293+03:00',
    status: {
      value: 'received',
      timestamp: '2021-03-29T11:24:04.060481+03:00'
    },
    status_histories: [
      {
        value: 'received',
        timestamp: '2021-03-29T11:24:04.060481+03:00'
      },
      {
        value: 'sent',
        timestamp: '2021-03-29T19:24:04.060481+03:00'
      }
    ],
    type: '',
    service: 'Pysäköinnin Sähköinen Asiointi',
    user_id: '234567',
    transaction_id: '123456789',
    business_id: '13579124',
    tos_function_id: '123',
    tos_record_id: '123',
    content: mockTransferDocument,
    draft: false,
    locked_after: '',
    deletable: true,
    attachments: []
  }
];

export const mockObjectionDocumentResponse: {
  count: number;
  results: ObjectionDocument[];
} = {
  count: 7,
  results: mockObjectionDocumentList
};

export default mockObjectionDocumentList;
