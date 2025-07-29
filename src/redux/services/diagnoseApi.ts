import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NEXT_BACKEND_URL from '@/environment/environment';

const diagnoseApi = createApi({
    reducerPath: 'diagnoseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: NEXT_BACKEND_URL
    }),
    endpoints: (builder) => ({
        diagnose: builder.mutation({
            query: (data) => ({
                url: '/diagnose',
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useDiagnoseMutation } = diagnoseApi;
export default diagnoseApi;