import { Endpoint } from './action';

export interface DeleteRecordResponse {
  isSuccess: boolean;
}

export interface RecordToDelete {
  endpoint: Endpoint;
  id: string;
}
