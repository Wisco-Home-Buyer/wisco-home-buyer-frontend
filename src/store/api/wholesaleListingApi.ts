import { baseApi } from './baseApi';

export interface SubmitListingInterestRequest {
  listingId: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export const wholesaleListingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Public — no Authorization header required. */
    submitListingInterest: builder.mutation<
      void,
      SubmitListingInterestRequest
    >({
      query: ({ listingId, ...body }) => ({
        url: `/api/wholesale-listings/public/${encodeURIComponent(listingId)}/interest`,
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitListingInterestMutation } = wholesaleListingApi;
