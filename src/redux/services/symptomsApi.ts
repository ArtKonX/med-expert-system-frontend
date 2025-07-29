import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NEXT_BACKEND_URL from '@/environment/environment';

const symptomsApi = createApi({
    reducerPath: 'symptomsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: NEXT_BACKEND_URL
    }),
    endpoints: (builder) => ({
        getSymptoms: builder.query({
            query: ({ q, dubbleList }: { q: string, dubbleList: string[] }) => ({
                url: `/symptoms?q=${q}${dubbleList.length ? (`&dubbleList=${dubbleList}`) : ''}`,
                method: 'GET'
            })
        }),
        getAllSymptoms: builder.query({
            query: () => ({
                url: '/all-symptoms',
                method: 'GET'
            })
        })
    })
});

export const { useGetSymptomsQuery, useGetAllSymptomsQuery } = symptomsApi;
export default symptomsApi;