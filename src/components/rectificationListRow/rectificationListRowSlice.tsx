import { FileItem } from '../formContent/formContentSlice';

export type RectificationListItem = {
  id: string;
  type: string;
  status: string;
  edited: string;
  events: StatusEvent[];
  attachments: FileItem[];
};

type StatusEvent = {
  status: string;
  timestamp: string;
};
