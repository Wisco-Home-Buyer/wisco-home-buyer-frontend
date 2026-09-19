import { baseApi } from './baseApi';

export type BuyerServiceArea =
  | 'NORTHEAST_WI'
  | 'GREATER_MADISON'
  | 'GREATER_MILWAUKEE';

export type BuyerReferralSource =
  | 'WEB'
  | 'REFERRAL'
  | 'SOCIAL_MEDIA'
  | 'REI_SUCCESS'
  | 'ORGANIC_SEARCH'
  | 'CAFFEINE_AND_CASH_FLOW'
  | 'WISCO_REIA'
  | 'WISCONSIN_INVESTOR_PODCAST';

export interface SubmitBuyerLeadRequest {
  name: string;
  phone: string;
  email: string;
  areas: BuyerServiceArea[];
  consent: boolean;
  questions?: string;
  referralSource?: BuyerReferralSource;
  referredBy?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  landingPageUrl?: string;
}

export interface SubmitBuyerLeadResponse {
  id: string;
  buyerNumber: string;
}

/** Standard `{ success, statusCode, message, data, meta }` envelope — see docs/04-API-AND-BACKEND.md. */
interface ApiEnvelope<T> {
  data: T;
}

export const buyerLeadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Public — no Authorization header required. Powers the "Wholesale"
     * tab's buyers-list signup form.
     */
    submitBuyerLead: builder.mutation<
      SubmitBuyerLeadResponse,
      SubmitBuyerLeadRequest
    >({
      query: (data) => ({
        url: '/api/buyer-leads',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: ApiEnvelope<SubmitBuyerLeadResponse>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitBuyerLeadMutation } = buyerLeadApi;
