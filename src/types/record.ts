import { Endpoint } from './serverSideRequest';

export interface DeleteRecordResponse {
  isSuccess: boolean;
}

export interface RecordToDelete {
  endpoint: Endpoint;
  id: string;
}
