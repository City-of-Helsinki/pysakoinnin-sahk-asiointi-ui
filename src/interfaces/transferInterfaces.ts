import { Foul, FoulAttachment } from './foulInterfaces';

export interface TransferData {
  transferNumber: number;
  transferDate: string;
  registerNumber: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleBrand: string;
  vehicleColor: string;
  startAddress: string;
  startAddressAdditionalInfo: string;
  endAddress: string;
  endAddressAdditionalInfo: string;
  x_Coordinate: string;
  y_Coordinate: string;
  description: string;
  fouls: Foul[];
  invoiceSumText: string;
  openAmountText: string;
  dueDate: string;
  referenceNumber: string | null;
  iban: string | null;
  barCode: string;
  vehicleOwnerAddress: string | null;
  attachments: FoulAttachment[];
  vehicleChassisNumber: string;
  transferStartDate: string;
  transferEndDate: string;
  transferType: string;
  transferStatus: string;
  transferReason: string;
  foulTypes: string[];
  responseCode: number;
}
