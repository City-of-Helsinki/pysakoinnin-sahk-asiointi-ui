export interface Foul {
  description: string;
  additionalInfo: string;
}

export interface FoulAttachment {
  fileName: string;
  mimeType: string;
  data: string;
  attachmentType: number;
}

export interface FoulRequest {
  foul_number: number;
  register_number: string;
}

export interface FoulData {
  foulNumber: number;
  foulDate: string;
  monitoringStart: string;
  registerNumber: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleBrand: string;
  vehicleColor: string;
  address: string;
  addressAdditionalInfo: string;
  x_Coordinate: string;
  y_Coordinate: string;
  description: string;
  fouls: Foul[];
  invoiceSumText: string;
  openAmountText: string;
  dueDate: string;
  referenceNumber: string;
  iban: string | null;
  barCode: string;
  foulMakerAddress: string | null;
  attachments: FoulAttachment[];
  dueDateExtendable: boolean;
  dueDateExtendableReason: number;
  responseCode: number;
}
