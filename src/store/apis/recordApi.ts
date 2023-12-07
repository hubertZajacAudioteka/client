import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL_CLIENT } from '@/constants/api';
import { DeleteRecordResponse } from '@/types/record';
import { RecordToDelete } from '@/types/record';

export const recordApi = createApi({
  reducerPath: 'recordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_CLIENT}`,
  }),
  tagTypes: ['Record'],
  endpoints(builder) {
    return {
      deleteRecord: builder.mutation<DeleteRecordResponse, RecordToDelete>({
        query: (recordToDelete) => ({
          url: `/${recordToDelete.endpoint}/${recordToDelete.id}`,
          method: 'DELETE',
          credentials: 'include',
        }),
        invalidatesTags: () => ['Record'],
      }),
    };
  },
});

export const { useDeleteRecordMutation } = recordApi;
