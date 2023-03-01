/* eslint-disable sonarjs/no-duplicate-string */
import { RectificationListItem } from '../components/rectificationListRow/rectificationListRowSlice';
const mockRectificationList: RectificationListItem[] = [
  {
    id: '12345678',
    type: 'parking-fine',
    status: 'solved-mailed',
    edited: '2022-12-01T06:00:00Z',
    events: [
      {
        status: 'solved-mailed',
        timestamp: '2022-12-01T06:00:00Z'
      },
      {
        status: 'processing',
        timestamp: '2022-11-11T07:40:00Z'
      },
      {
        status: 'received',
        timestamp: '2022-11-10T07:40:00Z'
      },
      {
        status: 'sent',
        timestamp: '2022-11-10T07:39:00Z'
      }
    ],
    attachments: [
      {
        name: 'long-file-name-for-testing-abcd-efgh-ijkl.png',
        size: 5600,
        type: 'png'
      },
      {
        name: 'test-image2.jpg',
        size: 65040,
        type: 'jpg'
      },
      {
        name: 'test-file1.pdf',
        size: 70500,
        type: 'pdf'
      }
    ]
  },
  {
    id: '23456789',
    type: 'parking-fine',
    status: 'received',
    edited: '2023-02-11T21:20:00Z',
    events: [
      {
        status: 'received',
        timestamp: '2023-02-11T21:20:00Z'
      },
      {
        status: 'sent',
        timestamp: '2023-01-10T12:00:00Z'
      }
    ],
    attachments: [
      {
        name: 'test-image1.png',
        size: 5600,
        type: 'png'
      },
      {
        name: 'test-image2.jpg',
        size: 65040,
        type: 'jpg'
      }
    ]
  },
  {
    id: '34567890',
    type: 'due-date',
    status: 'processing',
    edited: '2023-02-11T14:00:20Z',
    events: [
      {
        status: 'sent',
        timestamp: '2023-01-20T11:11:11Z'
      }
    ],
    attachments: []
  },
  {
    id: '45678901',
    type: 'moved-car',
    status: 'sent',
    edited: '2023-02-01T21:59:59Z',
    events: [],
    attachments: []
  },
  {
    id: '56789012',
    type: 'moved-car',
    status: 'solved-online',
    edited: '2023-02-01T08:39:11Z',
    events: [
      {
        status: 'processing',
        timestamp: '2023-01-30T15:40:10Z'
      },
      {
        status: 'received',
        timestamp: '2023-01-30T15:40:00Z'
      },
      {
        status: 'sent',
        timestamp: '2023-01-30T15:39:58Z'
      },
      {
        status: 'solved-online',
        timestamp: '2023-02-01T08:39:11Z'
      }
    ],
    attachments: [
      {
        name: 'test-image1.png',
        size: 5600,
        type: 'png'
      },
      {
        name: 'test-image2.jpg',
        size: 65040,
        type: 'jpg'
      },
      {
        name: 'test-file1.pdf',
        size: 70500,
        type: 'pdf'
      }
    ]
  },
  {
    id: '67890123',
    type: 'parking-fine',
    status: 'processing',
    edited: '2023-02-11T20:22:22Z',
    events: [],
    attachments: []
  },
  {
    id: '78901234',
    type: 'due-date',
    status: 'received',
    edited: '2021-11-20:18:11:21Z',
    events: [
      {
        status: 'received',
        timestamp: '2021-11-20T15:40:00Z'
      },
      {
        status: 'sent',
        timestamp: '2021-11-10T15:39:58Z'
      }
    ],
    attachments: []
  }
];

export default mockRectificationList;
