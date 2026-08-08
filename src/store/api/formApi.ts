/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from './baseApi';

export type EnrichmentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

/**
 * Compact polling snapshot returned by `GET /api/leads/:id/enrichment`.
 * Mirrors the backend's `serializeEnrichment` shape so the wizard's
 * success page can flip a "we're analyzing your property" spinner into
 * the revealed estimated-value card once ATTOM responds.
 */
export interface EnrichmentSnapshot {
  status: EnrichmentStatus;
  estimatedValue: number | null;
  confidenceScore: number | null;
  ownerType: string | null;
  occupancyStatus: string | null;
  lastSyncedAt: string | null;
  errorMessage: string | null;
}

/** Subset of the POST /leads response that the wizard success page needs. */
export interface SubmitLeadResponse {
  id: string;
  enrichment: EnrichmentSnapshot | null;
}

export const formApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitLead: builder.mutation<SubmitLeadResponse, any>({
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
    /**
     * Public — no Authorization header required. The freshly-submitted
     * customer has no token yet, but the response only exposes the
     * property's ATTOM enrichment summary, not seller PII.
     */
    getEnrichment: builder.query<EnrichmentSnapshot, string>({
      query: (leadId) => ({
        url: `/api/leads/${leadId}/enrichment`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmitLeadMutation,
  useUploadImagesMutation,
  useGetEnrichmentQuery,
  useLazyGetEnrichmentQuery,
} = formApi;
