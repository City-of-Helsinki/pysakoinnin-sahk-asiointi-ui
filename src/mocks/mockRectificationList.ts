/* eslint-disable sonarjs/no-duplicate-string */
import { RectificationListItem } from '../components/rectificationListRow/rectificationListRowSlice';
const mockRectificationList: RectificationListItem[] = [
  {
    id: 12345678,
    type: 'parking-fine',
    status: 'solved-mailed',
    edited: '2022-12-01T06:00:00Z'
  },
  {
    id: 23456789,
    type: 'parking-fine',
    status: 'received',
    edited: '2023-02-11T21:20:00Z'
  },
  {
    id: 34567890,
    type: 'due-date',
    status: 'processing',
    edited: '2023-02-11T14:00:20Z'
  },
  {
    id: 45678901,
    type: 'moved-car',
    status: 'sent',
    edited: '2023-02-01T21:59:59Z'
  },
  {
    id: 56789012,
    type: 'moved-car',
    status: 'solved-online',
    edited: '2023-02-01T08:39:11Z'
  },
  {
    id: 67890123,
    type: 'parking-fine',
    status: 'processing',
    edited: '2023-02-11T20:22:22Z'
  },
  {
    id: 78901234,
    type: 'due-date',
    status: 'solved-online',
    edited: '2022-11-20:18:11:21Z'
  }
];

export default mockRectificationList;
