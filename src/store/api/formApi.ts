/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from './baseApi';

export const formApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitLead: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/leads',
        method: 'POST',
        body: data,
      }),
    }),
    uploadImages: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/api/uploads/property-images',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitLeadMutation, useUploadImagesMutation } = formApi;
